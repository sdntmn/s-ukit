import React from "react"
import { ISaveKeys, IDataBody, ISaveOrder, IDataTitle } from "."
import { IconSortDown, IconSortUp } from "../_elements"
import { AriaSort } from "../types"

export const byKeys =
  (currentKeys: ISaveKeys) => (a: IDataBody, b: IDataBody) => {
    if (currentKeys.mainKey?.sorter?.(a, b) === 0) {
      if (
        currentKeys?.secondKey?.sorter &&
        currentKeys.secondKey.orderSort === AriaSort.ASCENDING
      ) {
        return currentKeys.secondKey.sorter(a, b)
      }
      if (
        currentKeys?.secondKey?.sorter &&
        currentKeys.secondKey.orderSort === AriaSort.DESCENDING
      ) {
        return currentKeys.secondKey.sorter(a, b) * -1
      }
    } else {
      if (currentKeys.mainKey?.sorter) {
        if (currentKeys.mainKey.orderSort === AriaSort.DESCENDING) {
          return currentKeys.mainKey.sorter(a, b) * -1
        }
        return currentKeys.mainKey.sorter(a, b)
      }
    }
    return 0
  }

// переключатель свойств сортировки order:AriaSort
export const toggleSort = (orderSort: AriaSort): AriaSort => {
  switch (orderSort) {
    case AriaSort.NONE:
      return AriaSort.ASCENDING
    case AriaSort.ASCENDING:
      return AriaSort.DESCENDING
    case AriaSort.DESCENDING:
      return AriaSort.NONE
    default:
      return AriaSort.NONE
  }
}

export const doSaveOrder = (dataBody: IDataBody[]) => {
  if (dataBody?.length) {
    const result: ISaveOrder[] = dataBody.map((el: IDataBody, i: number) => ({
      index: i,
      key: el.key,
    }))
    return result
  }
}

export const doRestoreOrder = (
  saveOrder: ISaveOrder[],
  dataBody: IDataBody[]
) => {
  if (saveOrder?.length) {
    return saveOrder.map((el: ISaveOrder) =>
      dataBody.find((elBody: IDataBody) => elBody.key === el.key)
    )
  }
}

// функция сортировки
// запускает процессы сортировки согласно текущим ключам и сохраненных
export const sortData = (
  keysSort: ISaveKeys,
  currentKeys: ISaveKeys,
  dataBody: IDataBody[],
  cb: React.Dispatch<React.SetStateAction<IDataBody[]>>
) => {
  if (dataBody && keysSort) {
    const cloneData: IDataBody[] = [...dataBody]
    if (
      currentKeys.mainKey &&
      currentKeys.mainKey.orderSort === AriaSort.ASCENDING
    ) {
      const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
      cb(() => [...sortData])
    }
    if (
      currentKeys.mainKey &&
      currentKeys.mainKey.orderSort === AriaSort.DESCENDING &&
      keysSort.secondKey?.orderSort === AriaSort.NONE
    ) {
      cb(() => [...dataBody.reverse()])
    }
    if (
      currentKeys.mainKey &&
      currentKeys.mainKey.orderSort === AriaSort.DESCENDING &&
      keysSort.secondKey?.orderSort !== AriaSort.NONE
    ) {
      const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
      cb(() => [...sortData])
    }

    if (
      currentKeys.secondKey &&
      keysSort.secondKey?.orderSort !== AriaSort.NONE
    ) {
      const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
      cb(() => [...sortData])
    }
  }
}

export const renderIcon = (values: IDataTitle) => {
  if (Boolean(values?.isSortable)) {
    switch (values?.order) {
      case AriaSort.ASCENDING:
        return (
          <IconSortUp isActiveIcon={values?.order === AriaSort.ASCENDING} />
        )
      case AriaSort.DESCENDING:
        return (
          <IconSortDown isActiveIcon={values?.order === AriaSort.DESCENDING} />
        )
      case AriaSort.NONE:
        return <IconSortUp />
      default:
        return <IconSortUp />
    }
  }
}

// обновление свойств (order) объекта Title
export const updateDataTitle = (
  keysSort: ISaveKeys,
  currentKeys: ISaveKeys,
  dataTitle?: IDataTitle[]
) => {
  const copy: IDataTitle[] = Object?.assign([], dataTitle)
  let newDataTitle
  if (copy) {
    newDataTitle = copy.map((item: IDataTitle) => {
      if (currentKeys.mainKey) {
        if (item.name === currentKeys.mainKey.name) {
          return {
            ...item,
            order: currentKeys.mainKey.orderSort,
          }
        }
        if (item.name === keysSort.secondKey?.name) {
          return {
            ...item,
            order: keysSort.secondKey?.orderSort,
          }
        }

        if (item.name !== keysSort.secondKey?.name) {
          return {
            ...item,
            order: AriaSort.NONE,
          }
        }
      }
      if (currentKeys.secondKey) {
        if (item.name === currentKeys.secondKey.name) {
          return {
            ...item,
            order: currentKeys.secondKey.orderSort,
          }
        }

        if (item.name === keysSort.mainKey?.name) {
          return {
            ...item,
            order: keysSort.mainKey?.orderSort,
          }
        }
        if (item.name !== keysSort.secondKey?.name) {
          return {
            ...item,
            order: AriaSort.NONE,
          }
        }
      }
    })
  }
  return newDataTitle as IDataTitle[]
}

export type Key = React.Key
export const getColumnKey = (column: IDataTitle[] | undefined): Key => {
  console.info(column)
  if (Boolean(column) && column?.length) {
    if ("key" in column && column.key !== undefined && column.key !== null) {
      return column[0].key
    }
    if (column) {
      const result = column.map((item) => item.name)
      console.info(result)
      return (Array.isArray(result) ? result.join(" | ") : result) as Key
    }
    return ""
  }
  return ""
}
