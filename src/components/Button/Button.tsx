import { FC } from "react"
import cn from "classnames"

import "./Button.css"
import { ButtonType } from "./types"

export interface ButtonProps {
  disabled?: boolean
  className?: string
  type: ButtonType
  children?: React.ReactNode
  onPress?: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: FC<ButtonProps> = ({
  type = "button",
  disabled = false,
  onPress,
  className = "",
  children = "Кнопка",
}: ButtonProps) => {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (onPress) {
      onPress(event)
    }
  }
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn("skit-button", className)}
    >
      {children}
    </button>
  )
}
