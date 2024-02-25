import React from "react"

import cn from "classnames"

import { NumberSortingColumns, RowType } from "../../types"
import { TableCell } from "../TableCell"

import "./styles.css"

interface TableRowProps {
  arrKeysNameColumns?: (keyof RowType)[]
  listColumnsForRender?: (keyof RowType)[]
  nameMainColumnSort?: string
  rowData: RowType
  sortByNumberColumns?: NumberSortingColumns
}

export const TableRow: React.FC<TableRowProps> = ({
  arrKeysNameColumns,
  listColumnsForRender,
  nameMainColumnSort,
  rowData,
  sortByNumberColumns,
  ...rest
}: TableRowProps) => (
  <tr className={cn("s-ukit-table__row")} {...rest}>
    {rowData &&
      arrKeysNameColumns &&
      arrKeysNameColumns.map((colName: keyof RowType) => {
        if (listColumnsForRender?.includes(colName)) {
          return (
            <TableCell
              key={colName}
              value={rowData[colName]}
              isMainColumSort={nameMainColumnSort === colName}
              sortByNumberColumns={sortByNumberColumns}
            />
          )
        }
        return null
      })}
  </tr>
)
