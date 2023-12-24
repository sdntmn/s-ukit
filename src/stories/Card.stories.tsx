import React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Card } from "../components/Card"

const meta = {
  title: "Components/Card",
  component: Card,
} satisfies Meta<typeof Card>

export default meta

type Story = StoryObj<typeof Card>

export const CardForList: Story = {
  render: (args) => <Card {...args} />,
}
