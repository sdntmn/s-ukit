import type { Meta, StoryObj } from "@storybook/react"

import MyButton from "../MyButton/MyButton"
import React from "react"

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Example/Button",
  component: MyButton
} satisfies Meta<typeof MyButton>

export default meta
type Story = StoryObj<typeof MyButton>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const RedBtn: Story = {
  render: () => (
    <MyButton
      color={"red"}
      big={false}
      children="какой то текст "
    />
  )
}

export const OrangeBtn: Story = {
  render: () => (
    <MyButton
      color={"orange"}
      big={false}
      children="какой то текст "
    />
  )
}

export const BigBtn: Story = {
  render: () => (
    <MyButton
      color={"red"}
      big={true}
      children="какой то текст "
    />
  )
}

// export const Large: Story = {
//   args: {}
// }

// export const Small: Story = {
//   args: {}
// }
