/* eslint-disable max-len */
import React from "react"
import cn from "classnames"

import "./styles.css"

interface Props {
  isClickable?: boolean
  isActiveIcon?: boolean
  icon?: React.ReactNode
}

export const IconTableColumns: React.FC<Props> = ({
  isClickable,
  isActiveIcon,
  icon,
}) => (
  <>
    {Boolean(icon) ? (
      <div
        className={cn(
          "s-ukit-icon__sort-up",
          isClickable && "s-ukit-icon__sort_clickable",
          isActiveIcon && "s-ukit-icon__sort_color"
        )}
      >
        {icon}
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
          viewBox="0 0 512 512"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm64 64V416H224V160H64zm384 0H288V416H448V160z" />
        </svg>
      </i>
    )}
  </>
)
