import { FC } from "react"
import cn from "classnames"

import { IconLikeActive, IconLikeNotActive } from "../_elements/Icons"
import { ButtonType } from "./types"

import "./ButtonIcon.css"

export interface ButtonIconProps {
  isActive?: boolean
  className?: string
  type: ButtonType
  children?: React.ReactNode
  colorIcon?: string
  heightIcon?: string
}

export const ButtonIcon: FC<ButtonIconProps> = ({
  type = "button",
  isActive = true,
  className = "",
  children,
  colorIcon = "#f24e1e",
  heightIcon = "24",
}: ButtonIconProps) => {
  const onClick = (): void => {}
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn("skit-button-icon", className)}
    >
      {isActive
        ? (children = <IconLikeActive color={colorIcon} height={heightIcon} />)
        : (children = (
            <IconLikeNotActive color={colorIcon} height={heightIcon} />
          ))}
    </button>
  )
}
