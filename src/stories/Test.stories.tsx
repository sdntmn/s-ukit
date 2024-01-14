import React from "react"
import { ComponentStory, ComponentMeta } from "@storybook/react"

import {
  TableSort,
  ITableSortProps,
  IDataTitle,
  // IDataBody,
} from "../components/TableSort"

export default {
  title: "Components/TableSort",
  component: TableSort,
} as ComponentMeta<React.FC<ITableSortProps<IDataType>>>

interface IDataType {
  key: string
  name: string
  age: string
  duty: string
  duty2: string
}

const columns: IDataTitle<IDataType> = [
  {
    key: "key",
    name: "name",
    title: "Name",
    sorter: (a: IDataType, b: IDataType) => a.name.length - b.name.length,
    isSortable: true,
  },
  {
    key: "2",
    name: "age",
    title: "Age",
    sorter: (a: IDataType, b: IDataType) => Number(a.age) - Number(b.age),
    isSortable: true,
  },
  {
    key: "3",
    name: "duty",
    title: "Duty",
    sorter: (a: IDataType, b: IDataType) => Number(a.duty) - Number(b.duty),
    isSortable: true,
  },
]

// export interface DataType {
//   key: React.Key
//   name: string
//   age: string
//   duty: string
//   duty2: string
// }

const rows: IDataType[] = [
  { key: "1", name: "Сергей", age: "25", duty: "50", duty2: "50" },
  { key: "4", name: "Рома", age: "19", duty: "500.02", duty2: "50" },
  { key: "5", name: "Алексей", age: "9", duty: "1.10", duty2: "50" },
  { key: "6", name: "Борис", age: "19", duty: "250", duty2: "50" },
  { key: "2", name: "Сергей", age: "35", duty: "51", duty2: "50" },
  { key: "7", name: "Яша", age: "100", duty: "250", duty2: "50" },
  { key: "3", name: "Сергей", age: "45", duty: "49", duty2: "50" },
]

const Template: ComponentStory<React.FC<ITableSortProps<IDataType>>> = (
  args
) => (
  <TableSort caption="Table caption" columns={columns} rows={rows} {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  caption: "Table caption",
}
