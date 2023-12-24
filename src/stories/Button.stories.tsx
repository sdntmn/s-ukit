import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "../components/Button"

const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const Base: Story = {
  render: (args) => <Button {...args} />,
}
