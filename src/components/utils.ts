import { IDataBody, ISaveKeys } from "./TableSortTwoColumn/TableSortTwoColumn"
import { AriaSort } from "./types"

export const byKey =
  (key: string, isNumber: boolean | undefined) =>
  (
    a: { [x: string]: { toLowerCase: () => number } },
    b: { [x: string]: { toLowerCase: () => number } }
  ) => {
    if (isNumber) {
      return Number(a[key]) - Number(b[key])
    } else {
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return -1
      }
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return 1
      }
      return 0
    }
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
      return AriaSort.DESCENDING
    case AriaSort.DESCENDING:
      return AriaSort.ASCENDING
    case AriaSort.ASCENDING:
      return AriaSort.NONE
    default:
      return AriaSort.NONE
  }
}
