import React from "react"
import { Meta, StoryObj } from "@storybook/react"

import { Table, TableProps } from "../components/Table"
import { Column, RowType } from "../components/Table/types"

const meta = {
  title: "components/Table",
  component: Table,
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof Table>

interface TypeData extends RowType {
  id: string
  name: string
  age: string
  duty: string
  city: string
}

const dataRows: TypeData[] = [
  { id: "1", name: "Сергей", city: "Тюмень", age: "25", duty: "50" },
  { id: "2", name: "Рома", city: "Ишим", age: "19", duty: "500.02" },
  { id: "3", name: "Алексей", city: "Тобольск", age: "9", duty: "1.10" },
  { id: "4", name: "Борис", city: "Тюмень", age: "19", duty: "250" },
  { id: "5", name: "Сергей", city: "Тобольск", age: "35", duty: "51" },
  { id: "6", name: "Яша", city: "Тюмень", age: "100", duty: "250" },
  { id: "7", name: "Сергей", city: "Тобольск", age: "45", duty: "49" },
  { id: "8", name: "Сергей", city: "Ишим", age: "19", duty: "500.02" },
]

const dataColumnsNoSort: Column<TypeData>[] = [
  {
    name: "id",
    title: "ID",
    isSortable: false,
  },
  {
    name: "name",
    title: "Name",
    isSortable: false,
  },
  {
    name: "city",
    title: "Город",
    isSortable: false,
  },
  {
    name: "age",
    title: "Age",
    isSortable: false,
  },
  {
    name: "duty",
    title: "Duty",
    isSortable: false,
  },
]

const dataColumns: Column<TypeData>[] = [
  {
    name: "id",
    title: "ID",
    sorter: (a: TypeData, b: TypeData) => Number(a.id) - Number(b.id),
    isSortable: false,
  },
  {
    name: "name",
    title: "Name",
    sorter: (a: TypeData, b: TypeData) => a.name.length - b.name.length,
    isSortable: true,
  },
  {
    name: "city",
    title: "Город",
    isSortable: true,
  },
  {
    name: "age",
    title: "Age",
    sorter: (a: TypeData, b: TypeData) => Number(a.age) - Number(b.age),
    isSortable: true,
  },
  {
    name: "duty",
    title: "Duty",
    sorter: (a: TypeData, b: TypeData) => Number(a.duty) - Number(b.duty),
    isSortable: true,
  },
]

export const Base: Story = {
  render: (args) => <Table {...args} columns={dataColumns} rows={dataRows} />,
}

export const TableSortOneColumns = {
  args: { columns: dataColumns, rows: dataRows, sortByNumberColumns: "one" },
}

export const TableSortTwoColumns = {
  args: {
    columns: dataColumns,
    rows: dataRows,
    sortByNumberColumns: "two",
  },
}

export const TableSortAddIndexColumn = {
  args: {
    columns: dataColumns,
    rows: dataRows,
    sortByNumberColumns: "two",
    nameColumnIndex: "NDX",
  },
}

export const TableSortChangeIcon = {
  args: {
    columns: dataColumns,
    rows: dataRows,
    sortByNumberColumns: "one",
    iconUp: (
      <i>
        <svg
          height="16"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
        </svg>
      </i>
    ),
    iconDown: (
      <i>
        <svg
          height="16"
          width="18"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      </i>
    ),
  },
}

export const TableSortEditColumns = {
  args: {
    columns: dataColumns,
    rows: dataRows,
    sortByNumberColumns: "two",
    nameColumnIndex: "N",
    isEditColumns: true,
  },
}
