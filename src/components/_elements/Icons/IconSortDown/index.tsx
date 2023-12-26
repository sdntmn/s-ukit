/* eslint-disable max-len */
import React from "react"
import cn from "classnames"

import "./styles.css"

interface Props {
  isClickable: boolean
  // onClick(): void
}

export const IconSortDown: React.FC<Props> = ({ isClickable }) => (
  <i
    className={cn(
      "s-ukit-icon__sort-down",
      isClickable && "s-ukit-icon__sort_clickable"
    )}
    // onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="14"
      width="18"
      viewBox="0 160 1024 1024"
    >
      <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" />
    </svg>
  </i>
)
