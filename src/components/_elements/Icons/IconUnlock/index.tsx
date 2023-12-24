/* eslint-disable max-len */
import React from "react"
import cn from "classnames"

import "./styles.css"

interface Props {
  isClickable?: boolean
  isActiveIcon?: boolean
}

export const IconUnlock: React.FC<Props> = ({ isClickable, isActiveIcon }) => (
  <i
    className={cn(
      "itpc-icon__sort",
      isClickable && "itpc-icon__sort_clickable",
      isActiveIcon && "itpc-icon__sort_color"
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="18"
      viewBox="0 0 576 512"
    >
      <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80v48c0 17.7 14.3 32 32 32s32-14.3 32-32V144C576 64.5 511.5 0 432 0S288 64.5 288 144v48H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64H352V144z" />
    </svg>
  </i>
)