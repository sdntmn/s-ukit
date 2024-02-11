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
  sortBy?: NumberSortingColumns
  setKeySort?: (key: Column<RowType>) => void
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  currentKey,
  currentKeys,
  iconUp,
  iconDown,
  sortBy,
  setKeySort,
}: TableHeaderProps) => (
  <thead className="s-ukit-table__head">
    <tr>
      {columns &&
        columns.map((column: Column<RowType>, index: number) => {
          if (sortBy === NumberSortingColumns.TWO) {
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

          return (
            <th
              className={cn(
                "s-ukit-table__head",
                Boolean(column?.isSortable) &&
                  sortBy !== NumberSortingColumns.ZERO
                  ? "s-ukit-table_clickable"
                  : "s-ukit-table_pointer-none",
                currentKey?.name === column?.name &&
                  currentKey?.order !== SortType.NONE &&
                  sortBy !== NumberSortingColumns.ZERO
                  ? "s-ukit-table__head_background-active"
                  : "s-ukit-table__head_background"
              )}
              data-column-key={column.name}
              key={index}
              onClick={() => setKeySort?.(column)}
            >
              <div className="s-ukit-table__wrap-cell">
                {column.title}
                {sortBy === NumberSortingColumns.ONE &&
                  renderIcon(column, currentKey, iconUp, iconDown)}
              </div>
            </th>
          )
        })}
    </tr>
  </thead>
)
