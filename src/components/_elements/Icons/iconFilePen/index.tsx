/* eslint-disable max-len */
import React from "react"
import cn from "classnames"

import "./styles.css"

interface Props {
  isClickable?: boolean
  isActiveIcon?: boolean
  icon?: React.ReactNode
}

export const iconFilePen: React.FC<Props> = ({
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
          viewBox="0 0 576 512"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384V299.6l-94.7 94.7c-8.2 8.2-14 18.5-16.8 29.7l-15 60.1c-2.3 9.4-1.8 19 1.4 27.8H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z" />
        </svg>
      </i>
    )}
  </>
)
