import React from "react"

import { NumberSortingColumns, RowType } from "../../types"
import { TableRow } from "../TableRow"

import "./styles.css"

interface TableBodyProps {
  rows: RowType[]
  arrKeysNameColumns?: (keyof RowType)[]
  listColumnsForRender?: (keyof RowType)[]
  nameMainColumnSort?: string
  sortByNumberColumns?: NumberSortingColumns
}

export const TableBody: React.FC<TableBodyProps> = ({
  arrKeysNameColumns,
  listColumnsForRender,
  nameMainColumnSort,
  rows,
  sortByNumberColumns,
  ...rest
}: TableBodyProps) => (
  <tbody className="s-ukit-table__body" {...rest}>
    {rows &&
      rows.map((row: RowType) => (
        <TableRow
          arrKeysNameColumns={arrKeysNameColumns}
          listColumnsForRender={listColumnsForRender}
          nameMainColumnSort={nameMainColumnSort}
          key={row.id}
          rowData={row}
          sortByNumberColumns={sortByNumberColumns}
        />
      ))}
  </tbody>
)
