import React from "react"
import { Meta, StoryObj } from "@storybook/react"

import {
  ITableSortTwoColumnProps,
  TableSortTwoColumn,
} from "../components/TableSortTwoColumn"
import {
  IDataBody,
  IDataTitle,
  IParameters,
} from "../components/TableSortTwoColumn/TableSortTwoColumn"

const meta = {
  title: "Table/TableSortTwoColumn",
  component: TableSortTwoColumn,
} satisfies Meta<typeof TableSortTwoColumn>

export default meta

type Story = StoryObj<typeof TableSortTwoColumn>

export interface Item {
  key: string
  value: string
}

const header: IDataTitle[] = [
  {
    key: "id1",
    dataIndex: "name",
    title: "Name",
    sorter: (a: IDataBody, b: IDataBody) => a.name.length - b.name.length,
    isSortable: true,
  },
  {
    key: "id2",
    dataIndex: "age",
    title: "Age",
    sorter: (a: IDataBody, b: IDataBody) => Number(a.age) - Number(b.age),
    isSortable: true,
  },
  {
    key: "id3",
    dataIndex: "duty",
    title: "Duty",
    sorter: (a: IDataBody, b: IDataBody) => Number(a.duty) - Number(b.duty),
    isSortable: true,
  },
]

// export interface IDataBody {
//   key: string
//   [key: string]: string
// }

const rows: IDataBody[] = [
  { key: "1", name: "Сергей", age: "25", duty: "50" },
  { key: "4", name: "Рома", age: "19", duty: "500.02" },
  { key: "5", name: "Алексей", age: "9", duty: "1.10" },
  { key: "6", name: "Борис", age: "19", duty: "250" },
  { key: "2", name: "Сергей", age: "35", duty: "51" },
  { key: "7", name: "Яша", age: "100", duty: "250" },
  { key: "3", name: "Сергей", age: "45", duty: "49" },
]

const arrKeySortAsNumber = ["age", "duty"]

export const Base: Story = {
  render: (args: ITableSortTwoColumnProps | null) => (
    <TableSortTwoColumn
      captionTable="Table caption"
      titleColumns={header}
      sourceData={rows}
      arrKeySortAsNumber={arrKeySortAsNumber}
      {...args}
    ></TableSortTwoColumn>
  ),
}
