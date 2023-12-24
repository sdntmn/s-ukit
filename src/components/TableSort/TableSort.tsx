import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  useState,
} from "react"
import cn from "classnames"

import { AriaSort } from "../types"

import "./styles.css"
import { byKey } from "../utils"
import { IconSortArrDown, IconSortArrUp } from "../_elements/Icons"

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
  iconSortUp?: React.ReactNode
  iconSortDown?: React.ReactNode
  isIconClickable?: boolean
  isHeaderCellClickable?: boolean
  isCellHover?: boolean
  // colorIcon?: boolean
  titleColumns?: { key: string; dataIndex: string; title: string }[]
  orderSortColumn?: AriaSort
  currentColumnSort?: string
  setKeySort?: (key: string) => void
}

export const TableHeader: React.FC<IHeaderTableProps> = ({
  titleColumns,
  iconSortUp,
  iconSortDown,
  isIconClickable,
  isHeaderCellClickable,
  isCellHover = true,
  orderSortColumn,
  currentColumnSort,
  // colorIcon,
  setKeySort,
}: IHeaderTableProps) => (
  <thead className="itpc-table__head">
    <tr>
      {titleColumns &&
        Object.entries(titleColumns).map(
          (item: [string, { key: string; [key: string]: string }]) => {
            console.info(currentColumnSort === item[1]?.dataIndex)
            return (
              <th
                className={cn(
                  "itpc-table__head",
                  isHeaderCellClickable && "itpc-icon__sort_clickable"
                )}
                key={item[0]}
                id={item[1].key}
                aria-label={item[1].value}
                data-column-key={item[1].dataIndex}
                onClick={() => setKeySort?.(item[1]?.dataIndex)}
              >
                <div className="itpc-table-sort__wrap-cell">
                  {item[1].title}
                  <div className="itpc-table__wrap-icon">
                    {orderSortColumn === AriaSort.ASCENDING &&
                      currentColumnSort === item[1]?.dataIndex && (
                        <IconSortArrUp
                          isClickable={isIconClickable}
                          isActiveIcon={
                            currentColumnSort === item[1]?.dataIndex
                          }
                        />
                      )}
                    {orderSortColumn === AriaSort.NONE &&
                      currentColumnSort === item[1]?.dataIndex && (
                        <IconSortArrUp isClickable={isIconClickable} />
                      )}
                    {orderSortColumn === AriaSort.DESCENDING &&
                      currentColumnSort === item[1]?.dataIndex && (
                        <IconSortArrDown
                          isClickable={isIconClickable}
                          isActiveIcon={
                            currentColumnSort === item[1]?.dataIndex
                          }
                        />
                      )}
                    {currentColumnSort !== item[1]?.dataIndex && (
                      <IconSortArrUp isClickable={isIconClickable} />
                    )}
                  </div>
                  {/* <IconUnlock isClickable={isIconClickable} />
                  <IconLock isClickable={isIconClickable} /> */}
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
      <caption className={cn("itpc-table-sort__caption", className)}>
        {captionTable}
      </caption>
    )}
  </>
)

export interface ITableSortProps extends TableHTMLAttributes<HTMLTableElement> {
  id?: string
  className?: string
  captionTable?: string
  titleColumns?: { key: string; dataIndex: string; title: string }[]
  sourceData?: { key: string; [key: string]: string }[]
  colorSortableColumn?: boolean
  arrKeySortAsNumber?: string[]
  isHeaderCellClickable?: boolean
  isIconClickable?: boolean
  iconSortUp?: React.ReactNode
  iconSortDown?: React.ReactNode
  sortedTable?: (typeSort: string, nameColumn: string) => void
}

export const TableSort: React.FC<ITableSortProps> = ({
  id,
  captionTable,
  titleColumns,
  sourceData,
  colorSortableColumn,
  arrKeySortAsNumber,
  className = "",
  isHeaderCellClickable,
  isIconClickable = false,
  iconSortUp,
  iconSortDown,
  sortedTable,
  ...rest
}: ITableSortProps) => {
  const newArrObj = sourceData?.map((item) => {
    const result = Object.assign(item)
    return result
  })
  const [keyColumn, setKeyColumn] = useState("")
  const [orderSortColumn, setOrderSort] = useState(AriaSort.NONE)
  const [data, setData] = useState(newArrObj)

  const setKeySort = (key: string = "") => {
    setKeyColumn(key)

    if (Boolean(key) && key !== keyColumn) {
      doSort(key, AriaSort.NONE)
    } else {
      doSort(key)
    }
  }

  const doSort = (key: string, order = orderSortColumn) => {
    const isNumber = arrKeySortAsNumber?.includes(key)
    const sortData = data?.sort(byKey(key, isNumber))

    switch (order) {
      case AriaSort.NONE:
        setData(sortData)
        setOrderSort(AriaSort.ASCENDING)
        break
      case AriaSort.ASCENDING:
        setData(sortData?.reverse())
        setOrderSort(AriaSort.DESCENDING)
        break
      case AriaSort.DESCENDING:
        setData(newArrObj)
        setOrderSort(AriaSort.NONE)
        break
      default:
        setData(newArrObj)
        setOrderSort(AriaSort.NONE)
        setKeyColumn("")
    }
  }

  console.log(orderSortColumn)

  return (
    <table id={id} className={cn("itpc-table-sort", className)} {...rest}>
      {captionTable && <TableCaption captionTable={captionTable} />}
      {titleColumns && (
        <TableHeader
          titleColumns={titleColumns}
          setKeySort={setKeySort}
          orderSortColumn={orderSortColumn}
          currentColumnSort={keyColumn}
          isHeaderCellClickable={isHeaderCellClickable}
          isIconClickable={isIconClickable}
          iconSortUp={iconSortUp}
          iconSortDown={iconSortDown}
        />
      )}
      {data && <TableBody sourceData={data} />}
    </table>
  )
}
