/* eslint-disable max-len */
import React from "react"
import cn from "classnames"

import "./styles.css"

interface Props {
  isClickable?: boolean
  isActiveIcon?: boolean
  iconUp?: React.ReactNode
}

export const iconHorizontEllipsis: React.FC<Props> = ({
  isClickable,
  isActiveIcon,
  iconUp,
}) => (
  <>
    {Boolean(iconUp) ? (
      <div
        className={cn(
          "s-ukit-icon__sort-up",
          isClickable && "s-ukit-icon__sort_clickable",
          isActiveIcon && "s-ukit-icon__sort_color"
        )}
      >
        {iconUp}
      </div>
    ) : (
      <i
        className={cn(
          "s-ukit-icon__sort-up",
          isClickable && "s-ukit-icon__sort_clickable",
          isActiveIcon && "s-ukit-icon__sort_color"
        )}
      >
        <svg
          height="16"
          viewBox="0 0 448 512"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z" />
        </svg>
      </i>
    )}
  </>
)
