import React from "react"

import { NumberSortingColumns, RowType } from "../../types"
import { TableRow } from "../TableRow"

import "./styles.css"

interface TableBodyProps {
  rows: RowType[]
  arrKeysNameColumns?: string[]
  nameMainColumnSort?: string
  sortBy?: NumberSortingColumns
}

export const TableBody: React.FC<TableBodyProps> = ({
  arrKeysNameColumns,
  nameMainColumnSort,
  rows,
  sortBy,
  ...rest
}: TableBodyProps) => (
  <tbody className="s-ukit-table__body" {...rest}>
    {rows &&
      rows.map((row: RowType) => (
        <TableRow
          arrKeysNameColumns={arrKeysNameColumns}
          nameMainColumnSort={nameMainColumnSort}
          key={row.id}
          rowData={row}
          sortBy={sortBy}
        />
      ))}
  </tbody>
)
