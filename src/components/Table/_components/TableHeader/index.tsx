import React, { HTMLAttributes } from "react"

import cn from "classnames"

import {
  Column,
  KeySort,
  KeysSort,
  NumberSortingColumns,
  RowType,
  SortType,
} from "../../types"
import { renderIcon, renderIconTwoColumns } from "../../utils"

import "./styles.css"

interface TableHeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  columns?: Column<RowType>[]
  currentKey?: KeySort<RowType>
  currentKeys?: KeysSort<RowType>
  iconUp?: React.ReactNode
  iconDown?: React.ReactNode
  listColumnsForRender?: (keyof RowType)[]
  sortByNumberColumns?: NumberSortingColumns
  setKeySort?: (key: Column<RowType>) => void
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  currentKey,
  currentKeys,
  iconUp,
  iconDown,
  listColumnsForRender,
  sortByNumberColumns,
  setKeySort,
}: TableHeaderProps) => (
  <thead className="s-ukit-table__head">
    <tr>
      {columns &&
        columns.map((column: Column<RowType>, index: number) => {
          if (
            sortByNumberColumns === NumberSortingColumns.TWO &&
            listColumnsForRender?.includes(column.name)
          ) {
            return (
              <th
                className={cn(
                  "s-ukit-table__head",
                  Boolean(column?.isSortable)
                    ? "s-ukit-table_clickable"
                    : "s-ukit-table_pointer-none",
                  currentKeys?.mainKey?.name === column?.name &&
                    currentKeys?.mainKey?.order !== SortType.NONE
                    ? "s-ukit-table__head_background-active"
                    : "s-ukit-table__head_background"
                )}
                key={index}
                data-column-key={column.name}
                onClick={() => setKeySort?.(column)}
              >
                <div className="s-ukit-table__wrap-cell">
                  {column.title}
                  {renderIconTwoColumns(column, currentKeys, iconUp, iconDown)}
                </div>
              </th>
            )
          }

          if (
            sortByNumberColumns === NumberSortingColumns.ONE &&
            listColumnsForRender?.includes(column.name)
          ) {
            return (
              <th
                className={cn(
                  "s-ukit-table__head",
                  Boolean(column?.isSortable)
                    ? "s-ukit-table_clickable"
                    : "s-ukit-table_pointer-none",
                  currentKey?.name === column?.name &&
                    currentKey?.order !== SortType.NONE
                    ? "s-ukit-table__head_background-active"
                    : "s-ukit-table__head_background"
                )}
                key={column.name}
                onClick={() => setKeySort?.(column)}
              >
                <div className="s-ukit-table__wrap-cell">
                  {column.title}
                  <div className="s-ukit-table__wrap-icon">
                    {renderIcon(column, currentKey, iconUp, iconDown)}
                  </div>
                </div>
              </th>
            )
          }
          if (
            sortByNumberColumns === NumberSortingColumns.ZERO &&
            listColumnsForRender?.includes(column.name)
          ) {
            return (
              <th
                className={cn("s-ukit-table__head-no-sort")}
                key={column.name}
              >
                <div className="s-ukit-table__wrap-cell">{column.title}</div>
              </th>
            )
          }
          return null
        })}
    </tr>
  </thead>
)
