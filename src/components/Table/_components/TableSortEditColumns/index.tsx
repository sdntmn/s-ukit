import React, { HTMLAttributes, memo, useState } from "react"

import cn from "classnames"

import { IconTableColumns } from "../../../_elements"
import { Column, RowType } from "../../types"
import "./styles.css"

interface TableSortEditColumnsProps
  extends HTMLAttributes<HTMLTableCellElement> {
  arrKeysNameColumns: (keyof RowType)[]
  iconEditColumns?: React.ReactNode
  columns?: Column<RowType>[]
  listColumnsForRender: (keyof RowType)[]
  onChangeColumnsForRender: (arg: (keyof RowType)[]) => void
  resetKeysAndDataSort: () => void
}

export const TableSortEditColumns: React.FC<TableSortEditColumnsProps> = ({
  arrKeysNameColumns,
  iconEditColumns,
  columns,
  listColumnsForRender,
  onChangeColumnsForRender,
  resetKeysAndDataSort,
}: TableSortEditColumnsProps) => {
  const [isShowEditColumns, setIsShowEditColumns] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    resetKeysAndDataSort()
    const { value, checked } = e.target
    if (checked) {
      onChangeColumnsForRender([
        ...listColumnsForRender,
        value as keyof RowType,
      ])
    } else {
      onChangeColumnsForRender(
        [...listColumnsForRender]?.filter((e: keyof RowType) => e !== value)
      )
    }
  }

  const onShowListColumns = (): void => {
    setIsShowEditColumns(!isShowEditColumns)
  }

  const onShowAllColumns = (): void => {
    onChangeColumnsForRender([...arrKeysNameColumns])
  }

  return (
    <div className="s-ukit-table__edit-columns">
      <button onClick={onShowListColumns} className="s-ukit-table__button">
        <IconTableColumns
          isActiveIcon={isShowEditColumns}
          icon={iconEditColumns}
        />
      </button>
      {isShowEditColumns && (
        <div className="s-ukit-table__popover">
          <span
            className={cn(
              "s-ukit-table__checkbox-wrap",
              arrKeysNameColumns.length === listColumnsForRender.length &&
                "s-ukit-table__button-disabled"
            )}
          >
            <button
              className="s-ukit-table__button-reset"
              onClick={onShowAllColumns}
              disabled={
                arrKeysNameColumns.length === listColumnsForRender.length
              }
            >
              Показать все
            </button>
          </span>
          <form>
            {columns &&
              columns.map((column: Column<RowType>) => (
                <span className="s-ukit-table__checkbox-wrap" key={column.name}>
                  <input
                    className="s-ukit-table__input"
                    type="checkbox"
                    id={column.name}
                    name={column.name}
                    value={column.name}
                    onChange={handleChange}
                    checked={listColumnsForRender?.includes(column.name)}
                  />
                  <label
                    className="s-ukit-table__checkbox-label"
                    htmlFor={column.name}
                  >
                    {column.title}
                  </label>
                </span>
              ))}
          </form>
        </div>
      )}
    </div>
  )
}
