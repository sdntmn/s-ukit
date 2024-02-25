/* eslint-disable max-len */
import React from "react"
import cn from "classnames"

import "./styles.css"

interface Props {
  isClickable?: boolean
  isActiveIcon?: boolean
  icon?: React.ReactNode
}

export const IconTableCells: React.FC<Props> = ({
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
          <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 64v64H64V96h88zm56 0h88v64H208V96zm240 0v64H360V96h88zM64 224h88v64H64V224zm232 0v64H208V224h88zm64 0h88v64H360V224zM152 352v64H64V352h88zm56 0h88v64H208V352zm240 0v64H360V352h88z" />
        </svg>
      </i>
    )}
  </>
)
