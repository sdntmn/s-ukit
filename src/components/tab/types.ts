import React from "react"

export type InputState =
  | "default"
  | "cancel"
  | "loading"
  | "success"
  | "warning"
export type InputType = "password" | "text"
export type ButtonType = "button" | "submit" | "reset"
export type ButtonVariant = "white" | "red"
export type InputCheckboxType = "checkbox" | "radio"
export type InputCheckboxVariant = "android" | "ios"
export type InputCheckboxLabelPosition = "left" | "right" | "all"
export type Orientation = "top" | "right" | "bottom" | "left"
export type PopupSize = "small" | "normal"
export type PopupVariant = "default" | "error" | "warning" | "success"
export type PopupPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center-center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
export type ValidationState = "valid" | "invalid"

export interface TabsItem {
  title: string
  content: React.ReactElement<React.ReactNode>
}

export interface PaginationResult {
  currentPage?: number
  start: number
  end: number
}

export interface Item {
  id: string
  value: string
  disabled?: boolean
}

export interface FormattedValues {
  value: string
  formattedValue: string
}

export interface IInfo {
  id: string
  name: string
}

export enum AriaSort {
  NONE = "none",
  ASCENDING = "ascending",
  DESCENDING = "descending",
  OTHER = "other",
}

// Например, здесь мы хотели бы получить свойство объекта по его имени
// eslint-disable-next-line func-style, @typescript-eslint/adjacent-overload-signatures
// function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
//   return obj[key]
// }

// type KeyTitle = keyof IDataBody

export type ObjectKey<T> = keyof T

// type KeyTitle2 = ObjectKey<T>

export type SortOrder = "descend" | "ascend" | null
export type SorterFn<T> = (a: T, b: T) => number

// eslint-disable-next-line func-style
export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
