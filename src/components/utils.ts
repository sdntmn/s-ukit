import {
  IDataBody,
  ISaveKeys,
  ISaveOrder,
} from "./TableSortTwoColumn/TableSortTwoColumn"
import { AriaSort } from "./types"

export const byKey = (key: string) => (a: IDataBody, b: IDataBody) => {
  if (a[key].toLowerCase() < b[key].toLowerCase()) {
    return -1
  }
  if (a[key].toLowerCase() > b[key].toLowerCase()) {
    return 1
  }
  return 0
}

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

export const doSaveOrder = (dataBody?: IDataBody[]) => {
  if (!!dataBody?.length) {
    const result: ISaveOrder[] = dataBody.map((el: IDataBody, i: number) => {
      return { index: i, key: el.key }
    })
    return result
  }
}

export const doRestoreOrder = (
  saveOrder: ISaveOrder[],
  dataBody: IDataBody[]
) => {
  if (saveOrder?.length) {
    const result = saveOrder.map((el: ISaveOrder) =>
      dataBody.find((elBody: IDataBody) => elBody.key === el.key)
    )
    return result
  }
}
