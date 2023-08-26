import React, { FC } from "react"
import "./MyInput.css"

export interface MyInputProps {
  big: boolean
  placeholder: string
  label: string
}

const MyInput: FC<MyInputProps> = ({ big, placeholder, label, ...props }) => {
  const classes = ["my-input"]

  if (big) {
    classes.push("big-input")
  }

  return (
    <label>
      {label}
      <input
        placeholder={placeholder}
        className={classes.join(" ")}
        {...props}
      />
    </label>
  )
}

export default MyInput
