import React from "react"

import cn from "classnames"

import { NumberSortingColumns } from "../../types"
import "./styles.css"

interface TableCellProps {
  value: string
  isMainColumSort?: boolean
  sortBy?: NumberSortingColumns
}

export const TableCell: React.FC<TableCellProps> = ({
  value,
  isMainColumSort,
  sortBy,
  ...rest
}: TableCellProps) => (
  <td
    className={cn(
      "s-ukit-table__cell",
      isMainColumSort &&
        sortBy === NumberSortingColumns.TWO &&
        "s-ukit-table__cell_back"
    )}
    {...rest}
  >
    {value}
  </td>
)
