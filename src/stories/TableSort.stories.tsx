import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { ITableSortProps, TableSort } from "../components/TableSort"

const meta = {
  title: "Table/TableSort",
  component: TableSort,
} satisfies Meta<typeof TableSort>

export default meta

type Story = StoryObj<typeof TableSort>

export interface IItem {
  key: string
  dataIndex: string
  title: string
}

const header: IItem[] = [
  { key: "id1", dataIndex: "name", title: "Name" },
  { key: "id2", dataIndex: "age", title: "Age" },
  {
    key: "id3",
    dataIndex: "duty",
    title: "Duty",
  },
]

export interface ITableItemData {
  key: string
  [key: string]: string
}

const rows: ITableItemData[] = [
  { key: "1", name: "Сергей", age: "35", duty: "50" },
  { key: "2", name: "Рома", age: "42", duty: "500.02" },
  { key: "3", name: "Алексей", age: "18", duty: "1.10" },
  { key: "4", name: "Борис", age: "9", duty: "250" },
  { key: "5", name: "Яша", age: "100", duty: "250.02" },
]

const arrKeySortAsNumber = ["age", "duty"]

const icon = <i className="fa-solid fa-lock" />

export const Base: Story = {
  render: (args: ITableSortProps | null) => (
    <TableSort
      captionTable="Table caption"
      titleColumns={header}
      sourceData={rows}
      arrKeySortAsNumber={arrKeySortAsNumber}
      {...args}
    />
  ),
}
