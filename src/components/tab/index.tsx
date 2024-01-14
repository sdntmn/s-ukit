import React, {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
  useState,
} from "react"
import cn from "classnames"

import { AriaSort, SorterFn, getProperty } from "../types"

import {
  byKeys,
  doRestoreOrder,
  doSaveOrder,
  getColumnKey,
  renderIcon,
  sortData,
  toggleSort,
  updateDataTitle,
} from "./utils"
import { cellKey } from "../constants"

import "./styles.css"
import { type } from "./../types"

interface ICellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value?: string
  isBack?: boolean
}

export const Cell: React.FC<ICellProps> = ({
  isBack,
  value,
  ...rest
}: ICellProps) => (
  <td
    className={cn(
      "itpc-table-sort__cell",
      isBack && "itpc-table-sort__cell_back"
    )}
    {...rest}
  >
    {value}
  </td>
)

export interface IRowProps extends HTMLAttributes<HTMLTableRowElement> {
  rowData?: IDataBody
  currentColumnSort?: string
}

export const Row: React.FC<IRowProps> = ({
  rowData,
  currentColumnSort,
  ...rest
}: IRowProps) => (
  <tr className="itpc-table-sort__row" {...rest}>
    {rowData &&
      Object.entries(rowData).map((cellData) => {
        if (cellData[0] !== cellKey) {
          return (
            <Cell
              key={cellData[0]}
              value={cellData[1]}
              isBack={currentColumnSort === cellData[0]}
            />
          )
        }
        return
      })}
  </tr>
)

interface ITableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  rows?: IDataBody[]
  currentColumnSort?: string
}

export const TableBody: React.FC<ITableBodyProps> = ({
  rows,
  currentColumnSort,

  ...rest
}: ITableBodyProps) => (
  <tbody className="itpc-table-sort__body" {...rest}>
    {rows &&
      rows.map((items, index) => (
        <Row
          currentColumnSort={currentColumnSort}
          key={items.key}
          id={items.key}
          rowData={items}
          data-index={index + 1}
        />
      ))}
  </tbody>
)

interface IHeaderTableProps extends HTMLAttributes<HTMLTableCellElement> {
  dataTitle?: IDataTitle[]
  currentColumnSort?: string
  setKeySort: (
    name: string,
    isSortable: boolean,
    orderSort?: AriaSort,
    sorter?: (a: IDataBody, b: IDataBody) => number
  ) => void
}

export const TableHeader: React.FC<IHeaderTableProps> = ({
  dataTitle,
  currentColumnSort,
  setKeySort,
}: IHeaderTableProps) => (
  <thead className="itpc-table-sort__head">
    <tr>
      {dataTitle &&
        Object.entries(dataTitle).map(([key, values]) => (
          <th
            className={cn(
              "itpc-table-sort__head",
              Boolean(values?.isSortable)
                ? "itpc-table-sort_clickable"
                : "itpc-table-sort_pointer-none",
              currentColumnSort === values?.name
                ? "itpc-table-sort__head_background-active"
                : "itpc-table-sort__head_background"
            )}
            key={key[0]}
            id={values?.name}
            data-column-key={values?.name}
            onClick={() =>
              setKeySort?.(
                values.name,
                values.isSortable,
                values?.order,
                values?.sorter
              )
            }
          >
            <div className="itpc-table-sort__wrap-cell">
              {values?.title}
              <div className="itpc-table-sort__wrap-icon">
                {renderIcon(values)}
              </div>
            </div>
          </th>
        ))}
    </tr>
  </thead>
)

export interface ITableCaption
  extends TableHTMLAttributes<HTMLTableCaptionElement> {
  caption?: string
}

export const TableCaption: React.FC<ITableCaption> = ({ caption }) => (
  <caption className="itpc-table-sort__caption">{caption}</caption>
)

export interface IParameters {
  a: string
  b: string
}

export interface ITableSortProps<T>
  extends TableHTMLAttributes<HTMLTableElement> {
  id?: string
  className?: string
  caption?: string
  columns?: IDataTitle<T>[]
  rows?: T
  isIconClickable?: boolean
}

type ObjectKey<T> = keyof T
type KeyTitle = ObjectKey<object>

// eslint-disable-next-line func-style
export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

type Partial<T> = {
  [K in keyof T]?: string
}

export interface IDataTitle<Type>
  extends TableHTMLAttributes<HTMLTableElement> {
  key: string
  name: ObjectKey<Type>
  title: string
  isSortable: boolean
  order?: AriaSort
  sorter?: SorterFn<Type>
}

export interface IDataBody<T> {
  rows: T
}

// export interface IDataBody2<T> {
//   key: string
//   [key: string]: string
// }

// export interface IDataType {
//   key: string
//   name: string
//   age: string
//   duty: string
// }

export interface IParametersSort {
  name: string
  isSortable: boolean
  orderSort?: AriaSort
  sorter?: (a: IDataBody, b: IDataBody) => number
}

export interface ISaveKeys {
  mainKey?: IParametersSort
  secondKey?: IParametersSort
}

export interface ISaveOrder {
  index: number
  key: string
}

// export type ColumnTitle<RecordType> =
//   | ReactNode
//   | ((props: ITableSortProps<RecordType>) => ReactNode)
// interface ColumnType<RecordType = IDataBody> {}

// type ProductPreview = Pick<IDataTitle, "name" | "key">

interface IData {
  [n: string]: string
}

export const TableSort: React.FC<ITableSortProps<object>> = (
  props: ITableSortProps<object>
) => {
  const { id, caption, columns, rows = [], className = "", ...rest } = props
  const getKey = getColumnKey(columns)
  console.info(getKey)
  console.info(columns)
  console.info(props)
  const [saveKeys, setSaveKeys] = useState<ISaveKeys>({})
  const [dataBody, setDataBody] = useState<object[]>(
    rows as unknown as object[]
  )
  const [orderOriginal, setOrderOriginal] = useState<ISaveOrder[]>([])
  const [orderMainSorting, setOrderMainSorting] = useState<ISaveOrder[]>([])
  const [dataTitle, setDataTitle] = useState<IDataTitle<object>[] | undefined>(
    columns
  )

  // получение ключей из шапки таблицы
  const setKeySort = (
    name: string = "",
    isSortable: boolean,
    orderSort?: AriaSort,
    sorter?: (a: IDataBody, b: IDataBody) => number
  ) => {
    const keys = {
      name,
      isSortable,
      orderSort: !orderSort ? AriaSort.NONE : orderSort,
      sorter:
        !sorter && isSortable
          ? (a: IDataBody, b: IDataBody): number =>
              Number(a.name > b.name) - Number(a.name < b.name)
          : sorter,
    }

    setParametersKeys(keys)
  }

  // сохранение начального порядка данных
  // если ключ основной - сохраняет первоначальный порядок dataBody в виде { index: i, key: el.key }
  // если ключ второстепенный - сохраняет первоначальный порядок согласно первоначальной сортировки по main ключу
  const saveOrder = (currentKeys: ISaveKeys | undefined): void => {
    if (dataBody) {
      if (currentKeys?.mainKey && orderOriginal?.length !== dataBody.length) {
        const order: ISaveOrder[] | undefined = doSaveOrder?.(dataBody)
        if (order) {
          setOrderOriginal(() => [...order])
        }
      }

      if (
        orderMainSorting?.length !== dataBody.length &&
        currentKeys?.secondKey &&
        currentKeys?.secondKey.orderSort === AriaSort.ASCENDING
      ) {
        const order: ISaveOrder[] | undefined = doSaveOrder?.(dataBody)
        if (order) {
          setOrderMainSorting(() => [...order])
        }
      }
    }
  }

  // установка свойств текущих полученных ключей
  // - переключение порядка сортировки
  // - установка какого они типа - основной (main) или второстепенный (second)
  const setParametersKeys = (keys: IParametersSort) => {
    let updatedCurrentKeys: ISaveKeys
    if (!Boolean(saveKeys.mainKey) || saveKeys.mainKey?.name === keys.name) {
      updatedCurrentKeys = {
        mainKey: {
          ...keys,
          orderSort: toggleSort(keys.orderSort || AriaSort.NONE),
        },
      }
      return processingKeys(updatedCurrentKeys)
    }
    if (Boolean(saveKeys.mainKey) && saveKeys.mainKey?.name !== keys.name) {
      updatedCurrentKeys = {
        secondKey: {
          ...keys,
          orderSort: toggleSort(keys.orderSort || AriaSort.NONE),
        },
      }
      return processingKeys(updatedCurrentKeys)
    }
  }

  // восстановление начального порядка данных
  // если ключ основной - восстанавливает первоначальный порядок dataBody
  // если ключ второстепенный - восстанавливает первоначальный порядок согласно первоначальной сортировки по main ключу
  const resetSortingOrder = (currentKeys: ISaveKeys) => {
    if (dataBody) {
      if (currentKeys.mainKey || orderOriginal?.length !== dataBody?.length) {
        const result = doRestoreOrder(orderOriginal, dataBody)

        if (result) {
          setDataBody(result as IDataBody[])
          if (currentKeys.mainKey?.orderSort === AriaSort.NONE) {
            setOrderOriginal([])
            setOrderMainSorting([])
          }
        }
      }
      if (currentKeys.secondKey) {
        const clone: ISaveOrder[] = [...orderMainSorting]
        const result = doRestoreOrder(clone, dataBody)

        if (result && saveKeys.mainKey?.orderSort === AriaSort.ASCENDING) {
          setDataBody(result as IDataBody[])
        }

        if (result && saveKeys.mainKey?.orderSort === AriaSort.DESCENDING) {
          setDataBody(result.reverse() as IDataBody[])
        }
      }
    }
  }

  // обработка действий в зависимости какого типа получен ключ mainKey или second и какой тип сортировки в этих ключах
  const processingKeys = (currentKeys: ISaveKeys) => {
    let keysSort: ISaveKeys

    if (currentKeys.mainKey) {
      if (
        currentKeys.mainKey.orderSort !== AriaSort.NONE &&
        !saveKeys.secondKey
      ) {
        keysSort = {
          mainKey: {
            ...currentKeys.mainKey,
          },
        }
        setSaveKeys(keysSort)
        setDataTitle(updateDataTitle(keysSort, currentKeys, dataTitle))
        saveOrder(currentKeys)
        return sortData(keysSort, currentKeys, dataBody, setDataBody)
      }

      if (
        currentKeys.mainKey.orderSort !== AriaSort.NONE &&
        saveKeys.secondKey
      ) {
        keysSort = {
          mainKey: {
            ...currentKeys.mainKey,
          },
          secondKey: {
            ...saveKeys.secondKey,
          },
        }
        setSaveKeys(keysSort)
        setDataTitle(updateDataTitle(keysSort, currentKeys, dataTitle))
        saveOrder(currentKeys)
        return sortData(keysSort, currentKeys, dataBody, setDataBody)
      }

      if (
        currentKeys.mainKey.orderSort === AriaSort.NONE &&
        !saveKeys.secondKey
      ) {
        keysSort = {
          mainKey: {
            ...currentKeys.mainKey,
          },
        }
        setSaveKeys(keysSort)
        setDataTitle(updateDataTitle(keysSort, currentKeys, dataTitle))
        setSaveKeys({})
        return resetSortingOrder(currentKeys)
      }

      if (
        currentKeys.mainKey.orderSort === AriaSort.NONE &&
        saveKeys.secondKey
      ) {
        keysSort = {
          mainKey: {
            ...currentKeys.mainKey,
          },
          secondKey: {
            ...saveKeys?.secondKey,
            orderSort: AriaSort.NONE,
          },
        }
        setSaveKeys(keysSort)
        setDataTitle(updateDataTitle(keysSort, currentKeys, dataTitle))
        setSaveKeys({})
        return resetSortingOrder(currentKeys)
      }
    }

    if (currentKeys.secondKey) {
      if (currentKeys.secondKey.orderSort !== AriaSort.NONE) {
        keysSort = {
          mainKey: saveKeys.mainKey,
          secondKey: { ...currentKeys.secondKey },
        }
        setSaveKeys(keysSort)
        setDataTitle(updateDataTitle(keysSort, currentKeys, dataTitle))
        saveOrder(currentKeys)
        return sortData(keysSort, currentKeys, dataBody, setDataBody)
      }

      if (currentKeys.secondKey.orderSort === AriaSort.NONE) {
        keysSort = {
          mainKey: saveKeys.mainKey,
          secondKey: { ...currentKeys.secondKey },
        }
        setSaveKeys(keysSort)
        setDataTitle(updateDataTitle(keysSort, currentKeys, dataTitle))

        return resetSortingOrder(currentKeys)
      }
    }
  }

  return (
    <table id={id} className={cn("itpc-table-sort", className)} {...rest}>
      {caption && <TableCaption caption={caption} />}
      {dataTitle && (
        <TableHeader
          dataTitle={dataTitle}
          setKeySort={setKeySort}
          currentColumnSort={saveKeys.mainKey?.name}
        />
      )}
      {dataBody && (
        <TableBody rows={dataBody} currentColumnSort={saveKeys.mainKey?.name} />
      )}
    </table>
  )
}
