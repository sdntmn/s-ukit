export type ButtonType = "button" | "submit" | "reset"

export enum AriaSort {
  NONE = "none",
  ASCENDING = "ascending",
  DESCENDING = "descending",
  OTHER = "other",
}

export interface IDataBody {
  key: string
  [key: string]: string
}

export interface ISaveOrder {
  index: number
  key: string
}
