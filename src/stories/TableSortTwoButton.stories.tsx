import React from "react"
import { Meta, StoryObj } from "@storybook/react"

import {
  ITableSortProps,
  TableSortTwoButton,
} from "../components/TableSortTwoButton"

const meta = {
  title: "Table/TableSortTwoButton",
  component: TableSortTwoButton,
} satisfies Meta<typeof TableSortTwoButton>

export default meta

type Story = StoryObj<typeof TableSortTwoButton>

export interface Item {
  key: string
  value: string
}

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

// const rowObj: ITableItemData = [
// {
//   id: "4teg3kd",
//   ls: "close",
//   address: "г Тюмень, ул Энергостроителей, д.6, к.1, кв.247",
//   firstName: "Юлия",
//   lastName: "Иванова",
//   patronymicName: "Николаевна",
//   birthDate: "2000-05-01",
//   main: "200.12",
//   penalties: "20.12",
//   mount: "3",
//   startPenalties: "2021-05-01",
//   endPenalties: "2023-05-01",
// },
// {
//   id: "4tegfhr",
//   ls: "open",
//   address: "г Тюмень, ул Энергостроителей, д.6, к.1, кв.247",
//   firstName: "Иван",
//   lastName: "Иванов",
//   patronymicName: "Николаевич",
//   birthDate: "",
//   main: "100.12",
//   penalties: "10.12",
//   mount: "3",
//   startPenalties: "2021-05-01",
//   endPenalties: "2023-05-01",
// },
//   { id: "row1", value: "column 1", value_2: "column 2", value_3: "column 3" },
//   { id: "row2", value: "column 1", value_2: "column 2", value_3: "column 3" },
//   { id: "row3", value: "column 1", value_2: "column 2", value_3: "column 3" },
//   { id: "row4", value: "column 1", value_2: "column 2", value_3: "column 3" },
// ]

export const Base: Story = {
  render: (args: ITableSortProps | null) => (
    <TableSortTwoButton
      captionTable="Table caption"
      titleColumns={header}
      sourceData={rows}
      arrKeySortAsNumber={arrKeySortAsNumber}
      {...args}
    ></TableSortTwoButton>
  ),
}

export const NoTitle: Story = {
  render: (args: ITableSortProps | null) => (
    <TableSortTwoButton
      captionTable="Table caption"
      sourceData={rows}
      arrKeySortAsNumber={arrKeySortAsNumber}
      {...args}
    ></TableSortTwoButton>
  ),
}

export const NoData: Story = {
  render: (args: ITableSortProps) => (
    <TableSortTwoButton
      captionTable="Table caption"
      titleColumns={header}
      {...args}
    ></TableSortTwoButton>
  ),
}
