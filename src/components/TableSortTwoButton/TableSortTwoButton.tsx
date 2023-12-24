import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  useState,
} from "react"
import cn from "classnames"

import { AriaSort } from "../types"
import { byKey } from "../utils"
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
      "itpc-table__cell",
      onPressCell && "itpc-table__cell_clickable"
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
    className={cn("itpc-table__row", onPressRow && "itpc-table__row_clickable")}
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
  <tbody className="itpc-table__body" {...rest}>
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
  <thead className="itpc-table__head">
    <tr>
      {titleColumns &&
        Object.entries(titleColumns).map(
          (item: [string, { key: string; [key: string]: string }]) => (
            <th
              className="itpc-table__head"
              key={item[0]}
              id={item[1].key}
              aria-label={item[1].value}
              data-column-key={item[1].dataIndex}
            >
              <div className="itpc-table-sort__wrap-cell">
                {item[1].title}
                <div className="itpc-table__wrap-icon">
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
      <caption className={cn("itpc-table-sort__caption", className)}>
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
  const newArrObj = sourceData?.map((item) => {
    const result = Object.assign(item)
    return result
  })
  const [typeSort, setTypeSort] = useState("")
  const [nameKey, setNameKey] = useState("")
  const [data, setData] = useState(newArrObj)

  const setKeySort = (key: string = "", type: string = AriaSort.NONE) => {
    setNameKey(key)
    setTypeSort(type)
    doSort(key, type)
  }

  const doSort = (key: string, type: string) => {
    const isNumber = arrKeySortAsNumber?.includes(key)
    const sortData = data?.sort(byKey(key, isNumber))

    if (
      (Boolean(key) && key !== nameKey) ||
      (Boolean(type) && type !== typeSort)
    ) {
      if (Boolean(type) && type === AriaSort.ASCENDING) {
        setData(sortData)
      }
      if (Boolean(type) && type === AriaSort.DESCENDING) {
        setData(sortData?.reverse())
      }
    } else {
      setData(newArrObj)
      setNameKey("")
      setTypeSort("")
    }
  }

  return (
    <table id={id} className={cn("itpc-table-sort", className)} {...rest}>
      {captionTable && <TableCaption captionTable={captionTable} />}
      {titleColumns && (
        <TableHeader titleColumns={titleColumns} setKeySort={setKeySort} />
      )}
      {sourceData && <TableBody sourceData={data} />}
    </table>
  )
}
