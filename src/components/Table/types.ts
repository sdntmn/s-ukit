export enum SortType {
  ASCENDING = "ascending",
  DESCENDING = "descending",
  NONE = "none",
}

export enum NumberSortingColumns {
  ZERO = "zero",
  ONE = "one",
  TWO = "two",
}

export type RowType<T = object> = {
  [key in keyof T]: T[key]
} & {
  id: string
  _index?: string
}

export type SorterFn<T> = (a: T, b: T) => number

export interface Column<T> {
  isSortable: boolean
  name: keyof T
  sorter?: SorterFn<T>
  title: string
}

export interface KeySort<T> {
  isSortable: boolean
  name: string
  order: SortType
  sorter: SorterFn<T>
}

export interface KeysSort<T> {
  mainKey?: KeySort<T>
  secondKey?: KeySort<T>
}

export interface SaveOrder {
  index: number
  _id: string
}
