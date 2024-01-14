import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  useState,
} from "react"
import cn from "classnames"

import { AriaSort, IDataBody, ISaveOrder } from "../types"
import { byKey, doRestoreOrder, doSaveOrder } from "../utils"
import { IconSortDown, IconSortUp } from "../_elements/Icons"
import "./styles.css"

interface ICellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  id?: string
  value?: string
  onPressCell?: (event?: React.MouseEvent<HTMLTableCellElement>) => void
}

export const Cell: React.FC<ICellProps> = ({
  id = "",
  onPressCell,
  value,
  ...rest
}: ICellProps) => (
  <td
    id={id}
    className={cn(
      "s-ukit-table-sort-two-button__cell",
      onPressCell && "s-ukit-table-sort-two-button__cell_clickable"
    )}
    onClick={onPressCell && onPressCell}
    {...rest}
  >
    {value}
  </td>
)

export interface IRowProps extends HTMLAttributes<HTMLTableRowElement> {
  id?: string
  rowData?: { key: string; [key: string]: string }
  onPressRow?: (event?: React.MouseEvent<HTMLTableRowElement>) => void
}

export const Row: React.FC<IRowProps> = ({
  onPressRow,
  rowData,
  ...rest
}: IRowProps) => (
  <tr
    className={cn(
      "s-ukit-table-sort-two-button__row",
      onPressRow && "s-ukit-table-sort-two-button__row_clickable"
    )}
    onClick={onPressRow && onPressRow}
    {...rest}
  >
    {rowData &&
      Object.entries(rowData).map((cellData) => {
        if (cellData[0] !== "key") {
          return <Cell key={cellData[0]} value={cellData[1]} />
        }
        return
      })}
  </tr>
)

export interface ITableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  id?: string
  sourceData?: { key: string; [key: string]: string }[]
}

export const TableBody: React.FC<ITableBodyProps> = ({
  id,
  sourceData,
  ...rest
}: ITableBodyProps) => (
  <tbody className="s-ukit-table-sort-two-button__body" {...rest}>
    {sourceData &&
      sourceData.map((items, index) => (
        <Row
          key={items.key}
          id={items.key}
          rowData={items}
          data-index={index + 1}
        />
      ))}
  </tbody>
)

export interface IHeaderTableProps
  extends HTMLAttributes<HTMLTableCellElement> {
  iconUp?: React.ReactNode
  iconDown?: React.ReactNode | string
  isIconClickable?: boolean
  titleColumns?: { key: string; dataIndex: string; title: string }[]
  setKeySort?: (key: string, type: string) => void
}

export const TableHeader: React.FC<IHeaderTableProps> = ({
  titleColumns,
  iconUp,
  iconDown,
  isIconClickable = true,
  setKeySort,
}: IHeaderTableProps) => (
  <thead className="s-ukit-table-sort-two-button__head">
    <tr>
      {titleColumns &&
        Object.entries(titleColumns).map(
          (item: [string, { key: string; [key: string]: string }]) => {
            console.info(item)
            return (
              <th
                className="s-ukit-table-sort-two-button__head"
                key={item[0]}
                id={item[1].key}
                data-column-key={item[1].dataIndex}
              >
                <div className="s-ukit-table-sort-two-button__wrap-cell">
                  {item[1].title}
                  <div className="s-ukit-table-sort-two-button__wrap-icon">
                    <div
                      onClick={() =>
                        setKeySort?.(item[1]?.dataIndex, AriaSort.ASCENDING)
                      }
                    >
                      {iconUp ? (
                        iconUp
                      ) : (
                        <IconSortUp isClickable={isIconClickable} />
                      )}
                    </div>

                    <div
                      onClick={() =>
                        setKeySort?.(item[1]?.dataIndex, AriaSort.DESCENDING)
                      }
                    >
                      {iconDown ? (
                        iconDown
                      ) : (
                        <IconSortDown isClickable={isIconClickable} />
                      )}
                    </div>
                  </div>
                </div>
              </th>
            )
          }
        )}
    </tr>
  </thead>
)

export interface ITableCaption
  extends TableHTMLAttributes<HTMLTableCaptionElement> {
  captionTable?: string
}

export const TableCaption: React.FC<ITableCaption> = ({
  captionTable,
  className = "",
}: ITableSortProps) => (
  <>
    {captionTable && (
      <caption
        className={cn("s-ukit-table-sort-two-button__caption", className)}
      >
        {captionTable}
      </caption>
    )}
  </>
)

export interface ITableSortProps extends TableHTMLAttributes<HTMLTableElement> {
  id?: string
  captionTable?: string
  className?: string
  titleColumns?: { key: string; dataIndex: string; title: string }[]
  sourceData?: { key: string; [key: string]: string }[]
  sortedTable?: (typeSort: string, nameColumn: string) => void
  colorSortColumn?: boolean
  arrKeySortAsNumber?: string[]
}

export const TableSortTwoButton: React.FC<ITableSortProps> = ({
  id,
  captionTable,
  titleColumns,
  sourceData,
  colorSortColumn,
  arrKeySortAsNumber,
  className = "",
  sortedTable,
  ...rest
}: ITableSortProps) => {
  const [typeSort, setTypeSort] = useState("")
  const [nameKey, setNameKey] = useState("")
  const [dataBody, setDataBody] = useState<IDataBody[]>(
    sourceData ? sourceData : []
  )
  const [orderOriginal, setOrderOriginal] = useState<ISaveOrder[]>([])

  const setKeySort = (key: string = "", type: string = AriaSort.NONE) => {
    setNameKey(key)
    setTypeSort(type)
    doSort(key, type)
  }

  const doSort = (key: string, type: string) => {
    const sortData: IDataBody[] = dataBody?.sort(byKey(key))
    console.info(key)
    console.info(type)
    const order: ISaveOrder[] | undefined = doSaveOrder?.(dataBody)
    if (order) {
      setOrderOriginal(() => [...order])
    }

    if (
      (Boolean(key) && key !== nameKey) ||
      (Boolean(type) && type !== typeSort)
    ) {
      switch (type) {
        case AriaSort.ASCENDING:
          return setDataBody(sortData)
        case AriaSort.DESCENDING:
          return setDataBody(sortData?.reverse())
        case AriaSort.NONE:
          const clone: ISaveOrder[] = orderOriginal.slice()
          const cloneReverse: ISaveOrder[] = clone.reverse()
          const result = doRestoreOrder(cloneReverse, dataBody)
          if (result) {
            setDataBody(result as IDataBody[])
          }
          setNameKey("")
          setTypeSort("")
          return
        default:
          return AriaSort.NONE
      }
      //   if (Boolean(type) && type === AriaSort.ASCENDING) {
      //     setDataBody(sortData)
      //     if (order) {
      //       setOrderOriginal(() => [...order])
      //     }
      //   }
      //   if (Boolean(type) && type === AriaSort.DESCENDING) {
      //     setDataBody(sortData?.reverse())
      //   }
      // } else {
      //   setDataBody(dataBody)
      //   setNameKey("")
      //   setTypeSort("")
    }
  }

  return (
    <table
      id={id}
      className={cn("s-ukit-table-sort-two-button", className)}
      {...rest}
    >
      {captionTable && <TableCaption captionTable={captionTable} />}
      {titleColumns && (
        <TableHeader titleColumns={titleColumns} setKeySort={setKeySort} />
      )}
      {sourceData && <TableBody sourceData={dataBody} />}
    </table>
  )
}
