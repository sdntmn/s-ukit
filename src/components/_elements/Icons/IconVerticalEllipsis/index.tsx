/* eslint-disable max-len */
import React from "react"
import cn from "classnames"

import "./styles.css"
import { IconLikeActive } from "./../IconLikeActive/IconLikeActive"

interface Props {
  isClickable?: boolean
  isActiveIcon?: boolean
  iconUp?: React.ReactNode
}

export const IconLikeActiveconVerticalEllipsis: React.FC<Props> = ({
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
          viewBox="0 0 128 512"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
        </svg>
      </i>
    )}
  </>
)
