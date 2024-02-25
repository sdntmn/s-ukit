import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { ButtonIcon } from "../components/ButtonIcon"

const meta = {
  title: "Components/ButtonIcon",
  component: ButtonIcon,
} satisfies Meta<typeof ButtonIcon>

export default meta

type Story = StoryObj<typeof ButtonIcon>

export const Base: Story = {
  render: (args) => <ButtonIcon {...args} />,
}
