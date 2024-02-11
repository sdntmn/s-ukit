import React from "react"

import cn from "classnames"

import { NumberSortingColumns, RowType } from "../../types"
import { TableCell } from "../TableCell"

import "./styles.css"

interface TableRowProps {
  rowData: RowType
  arrKeysNameColumns?: string[]
  nameMainColumnSort?: string
  sortBy?: NumberSortingColumns
}

export const TableRow: React.FC<TableRowProps> = ({
  arrKeysNameColumns,
  nameMainColumnSort,
  rowData,
  sortBy,
  ...rest
}: TableRowProps) => (
  <tr className={cn("s-ukit-table__row")} {...rest}>
    {rowData &&
      Object.entries(rowData).map(([key, value]) => {
        if (arrKeysNameColumns) {
          if (arrKeysNameColumns.includes(key)) {
            return (
              <TableCell
                key={key}
                value={value}
                isMainColumSort={nameMainColumnSort === key}
                sortBy={sortBy}
              />
            )
          }
        } else {
          return <TableCell key={key} value={value} />
        }
      })}
  </tr>
)
