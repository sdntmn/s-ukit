import { useState } from "react"
import { AriaSort } from "../types"

interface IUseTypeSort {
  typeSort: AriaSort
  toggleSort: () => void
}

export const useChangeTypeSort = (): IUseTypeSort => {
  const [typeSortColumn, setTypeSortColumn] = useState(AriaSort.NONE)

  const toggleSort = () => {
    switch (typeSortColumn) {
      case AriaSort.NONE:
        setTypeSortColumn(AriaSort.ASCENDING)
        break
      case AriaSort.ASCENDING:
        setTypeSortColumn(AriaSort.DESCENDING)
        break
      case AriaSort.DESCENDING:
        setTypeSortColumn(AriaSort.NONE)
        break
      default:
        setTypeSortColumn(AriaSort.NONE)
    }
  }

  return {
    typeSort: typeSortColumn || AriaSort.NONE,
    toggleSort,
  }
}
