import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  useState,
} from "react"
import cn from "classnames"

import { AriaSort } from "../types"

import "./styles.css"
import { byKeys } from "../utils"
import { IconSortArrDown, IconSortArrUp } from "../_elements/Icons"

interface ICellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  id?: string
  value?: string
  isBack?: boolean
  onPressCell?: (event?: React.MouseEvent<HTMLTableCellElement>) => void
}

export const Cell: React.FC<ICellProps> = ({
  id = "",
  onPressCell,
  isBack,
  value,
  ...rest
}: ICellProps) => (
  <td
    id={id}
    className={cn(
      "itpc-table__cell",

      isBack && "itpc-table-sort__cell_back",
      onPressCell && "itpc-table__cell_clickable"
    )}
    onClick={onPressCell && onPressCell}
    {...rest}
  >
    {value}
  </td>
)

export interface IRowProps extends HTMLAttributes<HTMLTableRowElement> {
  id?: string
  rowData?: { key: string; [key: string]: string }
  currentColumnSort?: string
  onPressRow?: (event?: React.MouseEvent<HTMLTableRowElement>) => void
}

export const Row: React.FC<IRowProps> = ({
  onPressRow,
  rowData,
  currentColumnSort,
  ...rest
}: IRowProps) => (
  <tr
    className={cn("itpc-table__row", onPressRow && "itpc-table__row_clickable")}
    onClick={onPressRow && onPressRow}
    {...rest}
  >
    {rowData &&
      Object.entries(rowData).map((cellData) => {
        if (cellData[0] !== "key") {
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

export interface ITableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {
  id?: string
  sourceData?: { key: string; [key: string]: string }[]
  currentColumnSort?: string
}

export const TableBody: React.FC<ITableBodyProps> = ({
  id,
  sourceData,
  currentColumnSort,

  ...rest
}: ITableBodyProps) => (
  <tbody className="itpc-table__body" {...rest}>
    {sourceData &&
      sourceData.map((items, index) => (
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

export interface IHeaderTableProps
  extends HTMLAttributes<HTMLTableCellElement> {
  iconSortUp?: React.ReactNode
  iconSortDown?: React.ReactNode
  isIconClickable?: boolean
  isHeaderCellClickable?: boolean
  isCellHover?: boolean
  dataTitle?: IDataTitle[]

  currentColumnSort?: string[]

  setKeySort: (
    dataIndex: string,
    isSortable: boolean,
    orderSort?: AriaSort,
    sorter?: (a: IDataBody, b: IDataBody) => number
  ) => void
}

export const TableHeader: React.FC<IHeaderTableProps> = ({
  dataTitle,
  isIconClickable,
  currentColumnSort,
  setKeySort,
}: IHeaderTableProps) => (
  <thead className="itpc-table-sort__head">
    <tr>
      {dataTitle &&
        Object.entries(dataTitle).map((item) => {
          // console.info(Boolean(item[1]?.isSortable) && !item[1]?.isSortable)
          return (
            <th
              className={cn(
                "itpc-table-sort__head",
                Boolean(item[1]?.isSortable) && "itpc-icon__sort_clickable",
                !Boolean(item[1]?.isSortable) && "itpc-table-sort_pointer-none",
                currentColumnSort?.[0] === item[1]?.dataIndex &&
                  "itpc-table-sort__head_background"
              )}
              key={item[0]}
              id={item[1]?.dataIndex}
              data-column-key={item[1]?.dataIndex}
              onClick={() =>
                setKeySort?.(
                  item[1].dataIndex,
                  item[1].isSortable,
                  item[1]?.order,
                  item[1]?.sorter
                )
              }
            >
              <div className="itpc-table-sort__wrap-cell">
                {item[1]?.title}
                <div className="itpc-table__wrap-icon">
                  {Boolean(item[1]?.isSortable) &&
                    item[1]?.order === AriaSort.ASCENDING && (
                      <IconSortArrUp
                        isClickable={isIconClickable}
                        isActiveIcon={item[1]?.order === AriaSort.ASCENDING}
                      />
                    )}
                  {Boolean(item[1]?.isSortable) &&
                    item[1]?.order === AriaSort.NONE && (
                      <IconSortArrUp isClickable={isIconClickable} />
                    )}
                  {Boolean(item[1]?.isSortable) &&
                    item[1]?.order === AriaSort.DESCENDING && (
                      <IconSortArrDown
                        isClickable={isIconClickable}
                        isActiveIcon={item[1]?.order === AriaSort.DESCENDING}
                      />
                    )}
                  {Boolean(item[1]?.isSortable) && !item[1]?.order && (
                    <IconSortArrUp isClickable={isIconClickable} />
                  )}
                </div>
              </div>
            </th>
          )
        })}
    </tr>
  </thead>
)

export interface ITableCaption
  extends TableHTMLAttributes<HTMLTableCaptionElement> {
  captionTable?: string
}

export const TableCaption: React.FC<ITableCaption> = ({
  captionTable,
  className = "",
}: ITableSortTwoColumnProps) => (
  <>
    {captionTable && (
      <caption className={cn("itpc-table-sort__caption", className)}>
        {captionTable}
      </caption>
    )}
  </>
)

export interface IParameters {
  a: string
  b: string
}

export interface ITableSortTwoColumnProps
  extends TableHTMLAttributes<HTMLTableElement> {
  id?: string
  className?: string
  captionTable?: string
  titleColumns?: {
    key: string
    dataIndex: string
    title: string
    isSortable: boolean
    order?: AriaSort
    sorter?: (a: IDataBody, b: IDataBody) => number
  }[]
  sourceData?: { key: string; [key: string]: string }[]
  colorSortableColumn?: boolean
  arrKeySortAsNumber?: string[]
  isHeaderCellClickable?: boolean
  isIconClickable?: boolean
  iconSortUp?: React.ReactNode
  iconSortDown?: React.ReactNode
  sortedTable?: (typeSort: string, nameColumn: string) => void
}

export interface IDataTitle {
  key: string
  dataIndex: string
  title: string
  isSortable: boolean
  order?: AriaSort
  sorter?: (a: IDataBody, b: IDataBody) => number
}

export interface IDataBody {
  key: string
  [key: string]: string
}

export interface IParametersSort {
  dataIndex: string
  orderSort: AriaSort
  isSortable: boolean
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

export const TableSortTwoColumn: React.FC<ITableSortTwoColumnProps> = ({
  id,
  captionTable,
  titleColumns,
  sourceData,
  colorSortableColumn,
  arrKeySortAsNumber,
  className = "",
  isHeaderCellClickable,
  isIconClickable = false,
  iconSortUp,
  iconSortDown,
  sortedTable,
  ...rest
}: ITableSortTwoColumnProps) => {
  const [keysTitles, setKeysTitles] = useState<string[]>([])
  const [saveKeys, setSaveKeys] = useState<ISaveKeys>({})
  const [dataBody, setDataBody] = useState<IDataBody[]>(
    sourceData ? sourceData : []
  )
  const [orderOriginal, setOrderOriginal] = useState<ISaveOrder[]>([])
  const [orderMainSorting, setOrderMainSorting] = useState<ISaveOrder[]>([])
  const [dataTitle, setDataTitle] = useState<IDataTitle[] | undefined>(
    titleColumns
  )

  // получение ключей из шапки таблицы
  const setKeySort = (
    dataIndex: string = "",
    isSortable: boolean,
    orderSort?: AriaSort,
    sorter?: (a: IDataBody, b: IDataBody) => number
  ) => {
    const keys = {
      dataIndex,
      isSortable,
      orderSort: !orderSort ? AriaSort.NONE : orderSort,
      sorter:
        !sorter && isSortable
          ? (a: IDataBody, b: IDataBody): number => {
              return Number(a.name > b.name) - Number(a.name < b.name)
            }
          : sorter,
    }

    setParametersKeys(keys)
  }

  // сохранение начального порядка данных
  // если ключ основной - сохраняет первоначальный порядок dataBody в виде { index: i, key: el.key }
  // если ключ второстепенный - сохраняет первоначальный порядок согласно первоначальной сортировки по main ключу
  const saveOrder = (currentKeys: ISaveKeys | undefined): void => {
    if (currentKeys) {
      let order: ISaveOrder[]
      if (dataBody) {
        if (currentKeys.mainKey) {
          if (!orderOriginal || orderOriginal?.length !== dataBody.length) {
            order = dataBody.map((el: IDataBody, i: number) => {
              return { index: i, key: el.key }
            })
            setOrderOriginal(order)
          }
        }
        if (currentKeys.secondKey) {
          if (
            !orderMainSorting ||
            orderMainSorting?.length !== dataBody.length
          ) {
            order = dataBody.map((el: IDataBody, i: number) => {
              return { index: i, key: el.key }
            })
            setOrderMainSorting(order)
          }
          return
        }
      }
    }
  }

  // переключатель свойств сортировки order:AriaSort
  const toggleSort = (orderSort: AriaSort): AriaSort => {
    switch (orderSort) {
      case AriaSort.NONE:
        return AriaSort.ASCENDING
      case AriaSort.ASCENDING:
        return AriaSort.DESCENDING
      case AriaSort.DESCENDING:
        return AriaSort.NONE
      default:
        return AriaSort.NONE
    }
  }

  // установка свойств текущих полученных ключей
  // - переключение порядка сортировки
  // - установка какого они типа - основной (main) или второстепенный (second)
  const setParametersKeys = (keys: IParametersSort) => {
    let updatedCurrentKeys: ISaveKeys
    if (
      !Boolean(saveKeys.mainKey) ||
      saveKeys.mainKey?.dataIndex === keys.dataIndex
    ) {
      updatedCurrentKeys = {
        mainKey: {
          ...keys,
          orderSort: toggleSort(keys.orderSort || AriaSort.NONE),
        },
      }
      return processingKeys(updatedCurrentKeys)
    }
    if (
      Boolean(saveKeys.mainKey) &&
      saveKeys.mainKey?.dataIndex !== keys.dataIndex
    ) {
      updatedCurrentKeys = {
        secondKey: {
          ...keys,
          orderSort: toggleSort(keys.orderSort || AriaSort.NONE),
        },
      }
      return processingKeys(updatedCurrentKeys)
    }
  }

  const resetKeys = () => {
    setSaveKeys({})
  }

  // восстановление начального порядка данных
  // если ключ основной - восстанавливает первоначальный порядок dataBody
  // если ключ второстепенный - восстанавливает первоначальный порядок согласно первоначальной сортировки по main ключу
  const resetSortingOrder = (currentKeys: ISaveKeys) => {
    if (dataBody) {
      if (currentKeys.mainKey || orderOriginal?.length !== dataBody?.length) {
        let result = orderOriginal?.map(function (el: ISaveOrder) {
          return dataBody.find((elBody: IDataBody) => elBody.key === el.key)
        })

        if (result) {
          setDataBody(result as IDataBody[])
        }
      }
      if (currentKeys.secondKey && orderMainSorting) {
        let result = orderMainSorting?.map(function (el: ISaveOrder) {
          return dataBody.find((elBody: IDataBody) => elBody.key === el.key)
        })

        if (result) {
          setDataBody(result as IDataBody[])
        }
      }
    }
  }

  // обработка действий в зависимости какого типа получены ключ mainKey или second и какой тип сортировки в этих ключах
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
        updateDataTitle(keysSort, currentKeys)
        return doSorting(keysSort, currentKeys)
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
        updateDataTitle(keysSort, currentKeys)
        return doSorting(keysSort, currentKeys)
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
        updateDataTitle(keysSort, currentKeys)
        resetKeys()
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
        updateDataTitle(keysSort, currentKeys)
        resetKeys()
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
        updateDataTitle(keysSort, currentKeys)
        return doSorting(keysSort, currentKeys)
      }

      if (currentKeys.secondKey.orderSort === AriaSort.NONE) {
        keysSort = {
          mainKey: saveKeys.mainKey,
          secondKey: { ...currentKeys.secondKey },
        }
        setSaveKeys(keysSort)
        updateDataTitle(keysSort, currentKeys)
        return resetSortingOrder(currentKeys)
      }
    }
  }

  // функция сортировки
  // запускает процессы сортировки согласно текущим ключам и сохраненных
  const doSorting = (keysSort: ISaveKeys, currentKeys: ISaveKeys) => {
    saveOrder(currentKeys)

    if (dataBody && keysSort) {
      let cloneData: IDataBody[] = dataBody?.slice()
      if (
        currentKeys.mainKey &&
        currentKeys.mainKey.orderSort === AriaSort.ASCENDING
      ) {
        const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
        setDataBody(() => [...sortData])
      }
      if (
        currentKeys.mainKey &&
        currentKeys.mainKey.orderSort === AriaSort.DESCENDING &&
        keysSort.secondKey?.orderSort === AriaSort.NONE
      ) {
        setDataBody(() => [...dataBody.reverse()])
      }
      if (
        currentKeys.mainKey &&
        currentKeys.mainKey.orderSort === AriaSort.DESCENDING &&
        keysSort.secondKey?.orderSort !== AriaSort.NONE
      ) {
        const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
        setDataBody(() => [...sortData])
      }

      if (currentKeys.secondKey) {
        const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
        setDataBody(() => [...sortData])
      }
    }
  }

  // обновление свойств (order) объекта Title
  const updateDataTitle = (keysSort: ISaveKeys, currentKeys: ISaveKeys) => {
    let copy: IDataTitle[] = Object?.assign([], dataTitle)
    const newDataTitle = copy?.map((item: IDataTitle) => {
      if (currentKeys.mainKey) {
        if (item.dataIndex === currentKeys.mainKey?.dataIndex) {
          return {
            ...item,
            order: currentKeys.mainKey?.orderSort,
          }
        }
        if (item.dataIndex === keysSort.secondKey?.dataIndex) {
          return {
            ...item,
            order: keysSort.secondKey?.orderSort,
          }
        }

        if (item.dataIndex !== keysSort.secondKey?.dataIndex) {
          return {
            ...item,
            order: AriaSort.NONE,
          }
        }
      }
      if (currentKeys.secondKey) {
        if (item.dataIndex === currentKeys.secondKey?.dataIndex) {
          return {
            ...item,
            order: currentKeys.secondKey?.orderSort,
          }
        }

        if (item.dataIndex === keysSort.mainKey?.dataIndex) {
          return {
            ...item,
            order: keysSort.mainKey?.orderSort,
          }
        }
        if (item.dataIndex !== keysSort.secondKey?.dataIndex) {
          return {
            ...item,
            order: AriaSort.NONE,
          }
        }
      }
    })
    setDataTitle(newDataTitle as IDataTitle[])
  }

  return (
    <table id={id} className={cn("itpc-table-sort", className)} {...rest}>
      {captionTable && <TableCaption captionTable={captionTable} />}
      {dataTitle && (
        <TableHeader
          dataTitle={dataTitle}
          setKeySort={setKeySort}
          currentColumnSort={keysTitles}
          isHeaderCellClickable={isHeaderCellClickable}
          isIconClickable={isIconClickable}
          iconSortUp={iconSortUp}
          iconSortDown={iconSortDown}
        />
      )}
      {dataBody && (
        <TableBody
          sourceData={dataBody}
          currentColumnSort={saveKeys.mainKey?.dataIndex}
        />
      )}
    </table>
  )
}
