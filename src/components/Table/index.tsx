import React, { TableHTMLAttributes, useCallback, useState } from "react"

import cn from "classnames"

import { TableBody, TableHeader } from "./_components"
import {
  Column,
  KeySort,
  KeysSort,
  NumberSortingColumns,
  RowType,
  SaveOrder,
  SortType,
} from "./types"
import {
  addIndexInColumns,
  addIndexInRows,
  byKey,
  byKeys,
  getKeysNamesColumns,
  order,
  restoreOrder,
  setKey,
  updateParametersKeys,
} from "./utils"

import "./styles.css"

export interface TableProps<T extends RowType>
  extends TableHTMLAttributes<HTMLTableElement> {
  className?: string
  columns?: Column<T>[]
  iconUp?: React.ReactNode
  iconDown?: React.ReactNode
  nameColumnIndex?: string
  rows: RowType<T>[]
  sortBy?: NumberSortingColumns
}

export const Table: React.FC<TableProps<any>> = ({
  className = "",
  columns,
  iconUp,
  iconDown,
  nameColumnIndex,
  rows,
  sortBy = NumberSortingColumns.ZERO,
  ...rest
}: TableProps<any>) => {
  const [currentKey, setCurrentKey] = useState<KeySort<RowType>>()
  const [currentKeys, setCurrentKeys] = useState<KeysSort<RowType>>({})
  const [data, setData] = useState<RowType[]>(rows)
  const [orderAscending, setOrderAscending] = useState<SaveOrder[]>([])
  const [orderDescending, setOrderDescending] = useState<SaveOrder[]>([])

  const sortByOneColumn = (key: KeySort<RowType>): void => {
    setCurrentKey(key)

    switch (key.order) {
      case SortType.ASCENDING:
        setData([...data].sort(byKey(key)))
        break

      case SortType.DESCENDING:
        setData([...data].reverse())
        break

      default:
        setData(rows)
    }
  }

  const sortByTwoColumns = (
    key: Column<RowType>,
    updateKeysSort: KeysSort<RowType>
  ): void => {
    setCurrentKeys(updateKeysSort)
    if (Object.keys(updateKeysSort).length === 0) {
      setData(rows)
    }

    const mainKey: KeySort<RowType> | undefined = updateKeysSort?.mainKey
    const secondKey: KeySort<RowType> | undefined = updateKeysSort?.secondKey

    if (key.name === mainKey?.name) {
      {
        setData([...data].sort(byKeys(updateKeysSort)))
      }
    }

    if (key.name === secondKey?.name) {
      if (
        secondKey?.order !== SortType.NONE &&
        mainKey?.order !== SortType.NONE
      ) {
        setData([...data].sort(byKeys(updateKeysSort)))
        if (!orderAscending.length && mainKey?.order === SortType.ASCENDING) {
          setOrderAscending(order([...data]))
        }
        if (!orderDescending.length && mainKey?.order === SortType.DESCENDING) {
          setOrderDescending(order([...data]))
        }
      }

      if (secondKey?.order === SortType.NONE) {
        if (mainKey?.order === SortType.ASCENDING) {
          setData(restoreOrder(orderAscending, [...data]))
          setOrderAscending([])
        } else {
          setData(restoreOrder(orderDescending, [...data]))
          setOrderDescending([])
        }
      }
    }
  }

  const setKeySort = (key: Column<RowType>): void => {
    if (sortBy === NumberSortingColumns.ONE) {
      return sortByOneColumn(setKey(key, currentKey))
    }
    if (sortBy === NumberSortingColumns.TWO) {
      const updateKeys = updateParametersKeys(key, currentKeys)
      return sortByTwoColumns(key, updateKeys)
    }
  }

  const dataColumns = useCallback(
    (
      columns: Column<RowType>[],
      nameColumnIndex?: string
    ): Column<RowType>[] => {
      if (nameColumnIndex !== undefined) {
        return addIndexInColumns(columns, nameColumnIndex)
      } else {
        return columns
      }
    },
    [columns, nameColumnIndex]
  )

  const dataRows = useCallback(
    (rows: RowType[], nameColumnIndex?: string): RowType[] => {
      if (nameColumnIndex !== undefined) {
        return addIndexInRows(rows)
      } else {
        return rows
      }
    },
    [rows, nameColumnIndex]
  )

  const arrKeysNameColumns = useCallback(
    (columns: Column<RowType>[], nameColumnIndex?: string): string[] => {
      return getKeysNamesColumns(columns, nameColumnIndex)
    },
    [columns, nameColumnIndex]
  )

  return (
    <table className={cn("s-ukit-table", className)} {...rest}>
      {columns?.length && (
        <TableHeader
          columns={dataColumns(columns, nameColumnIndex)}
          currentKey={currentKey}
          currentKeys={currentKeys}
          iconUp={iconUp}
          iconDown={iconDown}
          setKeySort={setKeySort}
          sortBy={sortBy}
        />
      )}

      {data && (
        <TableBody
          arrKeysNameColumns={
            columns && arrKeysNameColumns(columns, nameColumnIndex)
          }
          nameMainColumnSort={currentKeys?.mainKey?.name}
          rows={dataRows(data, nameColumnIndex)}
          sortBy={sortBy}
        />
      )}
    </table>
  )
}
