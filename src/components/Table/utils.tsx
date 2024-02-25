import React from "react"

import { IconSortDown, IconSortUp } from "../_elements"

import {
  Column,
  KeySort,
  KeysSort,
  RowType,
  SaveOrder,
  SorterFn,
  SortType,
} from "./types"
import { indexProperty } from "./const"

export const toggleSort = (orderSort: SortType): SortType => {
  switch (orderSort) {
    case SortType.NONE:
      return SortType.ASCENDING

    case SortType.ASCENDING:
      return SortType.DESCENDING

    case SortType.DESCENDING:
      return SortType.NONE

    default:
      return SortType.NONE
  }
}

const getKeysNames = (column: Column<RowType>[]): (keyof RowType)[] =>
  column?.map((item: Column<RowType>) => item.name)

export const getKeysNamesColumns = (
  columns: Column<RowType>[],
  nameColumnIndex?: string
): (keyof RowType)[] => {
  if (nameColumnIndex !== undefined) {
    return [indexProperty, ...getKeysNames(columns)]
  } else {
    return getKeysNames(columns)
  }
}

export const sorterFn =
  (
    currentKey: Column<Omit<RowType, typeof indexProperty>>
  ): SorterFn<RowType> =>
  (a: RowType, b: RowType): number =>
    Number(a[currentKey?.name] > b[currentKey?.name]) -
    Number(a[currentKey?.name] < b[currentKey?.name])

export const setKey = (
  key: Column<RowType>,
  columnKey?: KeySort<RowType>
): KeySort<RowType> => {
  if (Boolean(key) && key.name === columnKey?.name) {
    return updateParametersKey(columnKey)
  } else {
    return updateParametersKey(key)
  }
}

const updateParametersKey = (
  key: KeySort<RowType> | Column<RowType>
): KeySort<RowType> => {
  if ("order" in key) {
    return {
      ...key,
      order: key.order && toggleSort(key?.order),
    }
  } else {
    return {
      ...key,
      order: SortType.ASCENDING,
      sorter: !key.sorter ? sorterFn(key as Column<RowType>) : key.sorter,
    }
  }
}

export const byKey =
  (key: KeySort<RowType>) =>
  (a: RowType, b: RowType): number => {
    if (key && key.sorter) {
      return key.sorter(a, b)
    }

    return 0
  }

export const renderIcon = (
  column: Column<RowType>,
  columnKey?: KeySort<RowType>,
  iconUp?: React.ReactNode,
  iconDown?: React.ReactNode
): React.ReactNode => {
  if (column?.isSortable) {
    if (column.name === columnKey?.name) {
      switch (columnKey?.order) {
        case SortType.ASCENDING:
          return <IconSortUp iconUp={iconUp} isActiveIcon />

        case SortType.DESCENDING:
          return <IconSortDown iconDown={iconDown} isActiveIcon />

        default:
          return <IconSortUp iconUp={iconUp} />
      }
    } else {
      return <IconSortUp iconUp={iconUp} />
    }
  }

  return null
}

export const updateParametersKeys = (
  key: Column<RowType>,
  currentKeys?: KeysSort<RowType>
): KeysSort<RowType> => {
  let keys: KeysSort<RowType>

  if (
    currentKeys?.mainKey?.name === key.name &&
    currentKeys?.mainKey?.order === SortType.DESCENDING
  ) {
    return {}
  }

  if (
    !Boolean(currentKeys?.mainKey) ||
    key.name === currentKeys?.mainKey?.name
  ) {
    if (!currentKeys?.secondKey) {
      keys = {
        mainKey: {
          ...key,
          order: currentKeys?.mainKey?.order
            ? toggleSort(currentKeys?.mainKey?.order)
            : SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
      }
    } else {
      keys = {
        mainKey: {
          ...key,
          order: currentKeys?.mainKey?.order
            ? toggleSort(currentKeys?.mainKey?.order)
            : SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
        secondKey: currentKeys.secondKey,
      }
    }
    return keys
  } else {
    if (key.name === currentKeys?.secondKey?.name) {
      keys = {
        mainKey: currentKeys?.mainKey,
        secondKey: {
          ...key,
          order: currentKeys?.secondKey?.order
            ? toggleSort(currentKeys?.secondKey?.order)
            : SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
      }
      return keys
    } else {
      keys = {
        mainKey: currentKeys?.mainKey,
        secondKey: {
          ...key,
          order: SortType.ASCENDING,
          sorter: !key?.sorter ? sorterFn(key) : key?.sorter,
        },
      }
      return keys
    }
  }
}

export const renderIconTwoColumns = (
  column: Column<RowType>,
  currentKeys?: KeysSort<RowType>,
  iconUp?: React.ReactNode,
  iconDown?: React.ReactNode
): React.ReactNode => {
  if (column?.isSortable) {
    const mainKey = currentKeys?.mainKey
    const secondKey = currentKeys?.secondKey

    if (column.name === mainKey?.name) {
      return renderIcon(column, mainKey, iconUp, iconDown)
    }
    if (column.name === secondKey?.name) {
      return renderIcon(column, secondKey, iconUp, iconDown)
    }

    if (column.name !== secondKey?.name || mainKey?.name) {
      return <IconSortUp iconUp={iconUp} />
    }
  }
}

export const byKeys =
  (currentKeys: KeysSort<RowType>) =>
  (a: RowType, b: RowType): number => {
    const main = currentKeys?.mainKey
    const second = currentKeys?.secondKey
    if (main?.sorter?.(a, b) === 0) {
      if (second?.sorter && second.order === SortType.ASCENDING) {
        return second.sorter(a, b)
      }

      if (second?.sorter && second.order === SortType.DESCENDING) {
        return second.sorter(a, b) * -1
      }
    } else {
      if (main?.sorter) {
        if (main.order === SortType.DESCENDING) {
          return main.sorter(a, b) * -1
        }
        return main.sorter(a, b)
      }
    }
    return 0
  }

export const order = (rows: RowType[]): SaveOrder[] =>
  rows?.map((el: RowType, i: number) => ({
    index: i,
    _id: el.id,
  }))

export const restoreOrder = (
  saveOrder: SaveOrder[],
  rows: RowType[]
): RowType[] => {
  const restoreRows: RowType[] = saveOrder.map((el: SaveOrder) => {
    const index: number = rows?.findIndex((row: RowType) => row?.id === el?._id)
    return rows[index]
  })
  return restoreRows
}

export const addIndexInRows = (data: RowType[]): RowType[] => {
  const newData = [...data].map((row: RowType, index: number) => ({
    _index: (index + 1).toString(),
    ...row,
  }))
  return newData
}

export const addIndexInColumns = (
  columns: ConcatArray<Column<RowType>>,
  nameColumnIndex?: string
) => {
  const dataForAdd: Column<RowType>[] = [
    {
      name: indexProperty,
      title: nameColumnIndex ? nameColumnIndex : "",
      isSortable: false,
    },
  ]

  return dataForAdd.concat(columns)
}
