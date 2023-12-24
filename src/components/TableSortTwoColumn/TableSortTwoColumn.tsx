import React, {
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  useState,
} from "react"
import cn from "classnames"

import { AriaSort } from "../types"

import "./styles.css"
import { byKey, byKey3, byKey4, byKey5, byKeys } from "../utils"
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
  currentColumnSort?: string[]
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
              isBack={currentColumnSort?.[0] === cellData[0]}
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
  currentColumnSort?: string[]
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
  titleColumns?: IDataTitle[]

  currentColumnSort?: string[]

  setKeySort?: (
    key: string,
    orderSort: AriaSort,
    isSortable: boolean,
    sorter?: (a: IDataBody, b: IDataBody) => number
  ) => void
}

export const TableHeader: React.FC<IHeaderTableProps> = ({
  titleColumns,
  iconSortUp,
  iconSortDown,
  isIconClickable,
  isHeaderCellClickable,
  isCellHover = true,

  currentColumnSort,
  setKeySort,
}: IHeaderTableProps) => (
  <thead className="itpc-table-sort__head">
    <tr>
      {titleColumns &&
        Object.entries(titleColumns).map((item) => {
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
              id={item[1]?.key}
              data-column-key={item[1]?.dataIndex}
              onClick={() =>
                setKeySort?.(
                  item[1]?.dataIndex,
                  item[1]?.order,
                  item[1]?.isSortable,
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
                {/* <IconUnlock isClickable={isIconClickable} />
                  <IconLock isClickable={isIconClickable} /> */}
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
    order?: string
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

interface IKeyColumn {
  key: string
  order: AriaSort | undefined
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

export interface IArrayId {
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
  // const newArrObj = sourceData?.map((item) => {
  //   const result = Object.assign(item)
  //   return result
  // })

  const newArrTitle = titleColumns?.map((item) => {
    const result = Object.assign(item)
    return result
  })

  const [orderSortMainColumn, setOrderSortMainColumn] = useState<AriaSort>(
    AriaSort.NONE
  )
  const [keysTitles, setKeysTitles] = useState<string[]>([])
  const [saveKeys, setSaveKeys] = useState<ISaveKeys>({})
  const [orderSortColumn, setOrderSort] = useState<AriaSort>(AriaSort.NONE)
  const [dataBody, setDataBody] = useState<IDataBody[] | undefined>(
    sourceData ? sourceData : []
  )
  const [orderOriginal, setOrderOriginal] = useState<IArrayId[] | undefined>([])
  const [orderMainSorting, setOrderMainSorting] = useState<
    IArrayId[] | undefined
  >([])
  const [dataTitle, setDataTitle] = useState<IDataTitle[] | undefined>(
    newArrTitle
  )

  const [dataTitle2, setDataTitle2] = useState<IDataTitle[] | undefined>(
    newArrTitle
  )

  const setKeySort = (
    dataIndex: string = "",
    orderSort: AriaSort,
    isSortable: boolean,
    sorter?: (a: IDataBody, b: IDataBody) => number
  ) => {
    const keys = {
      dataIndex,
      orderSort: !orderSort ? AriaSort.NONE : orderSort,
      isSortable,
      sorter:
        !sorter && isSortable
          ? (a: IDataBody, b: IDataBody): number => {
              return Number(a.name < b.name) - Number(a.name > b.name)
            }
          : sorter,
    }
    // addPropertyArrTitle(dataIndex)

    updateCurrentKeys(keys)
  }

  const saveOrder = (currentKeys: ISaveKeys | undefined) => {
    if (currentKeys) {
      let mapped: IArrayId[]
      if (dataBody) {
        if (currentKeys.mainKey) {
          if (!orderOriginal || orderOriginal?.length !== dataBody.length) {
            mapped = dataBody.map((el, i) => {
              return { index: i, key: el.key }
            })
            setOrderOriginal(mapped)
          }
        }
        if (currentKeys.secondKey) {
          if (
            !orderMainSorting ||
            orderMainSorting?.length !== dataBody.length
          ) {
            mapped = dataBody.map((el, i) => {
              return { index: i, key: el.key }
            })
            setOrderMainSorting(mapped)
          }
          return
        }
      }
    }
  }

  const addPropertyTitle = (keyPro: ISaveKeys) => {
    let copy: IDataTitle[] = Object?.assign([], dataTitle)
    const cloneData = dataBody?.slice()
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

  const updateCurrentKeys = (keys: IParametersSort) => {
    let updateCurrentKeysOrder: ISaveKeys
    console.info(keys)
    if (
      !Boolean(saveKeys.mainKey) ||
      (saveKeys.mainKey?.dataIndex === keys.dataIndex && !saveKeys.secondKey)
    ) {
      updateCurrentKeysOrder = {
        mainKey: {
          ...keys,
          orderSort: toggleSort(keys.orderSort || AriaSort.NONE),
        },
      }
      return processingKeys(updateCurrentKeysOrder)
    }

    if (saveKeys.mainKey?.dataIndex === keys.dataIndex && saveKeys.secondKey) {
      updateCurrentKeysOrder = {
        mainKey: {
          ...keys,
          orderSort: toggleSort(keys.orderSort || AriaSort.NONE),
        },
        secondKey: { ...saveKeys.secondKey },
      }
      return processingKeys(updateCurrentKeysOrder)
    }
    if (
      Boolean(saveKeys.mainKey) &&
      saveKeys.mainKey?.dataIndex !== keys.dataIndex
    ) {
      updateCurrentKeysOrder = {
        secondKey: {
          ...keys,
          orderSort: toggleSort(keys.orderSort || AriaSort.NONE),
        },
      }
      return processingKeys(updateCurrentKeysOrder)
    }
  }

  const resetOrder = (currentKeys: ISaveKeys) => {
    if (currentKeys.mainKey) {
      resetKeys()
      const data = resetSortingOrder(currentKeys)
      setDataBody(data)
    }
    if (currentKeys.secondKey) {
      const data = resetSortingOrder(currentKeys)
      setDataBody(data)
    }
  }

  const resetKeys = () => {
    setSaveKeys({})
  }

  const resetSortingOrder = (currentKeys: ISaveKeys) => {
    if (
      (currentKeys.mainKey && orderOriginal && Boolean(dataBody)) ||
      orderOriginal?.length !== dataBody?.length
    ) {
      let result: IDataBody[] = orderOriginal?.map(function (el: IArrayId) {
        return dataBody?.find((elBody: IDataBody) => elBody?.key === el?.key)
      })

      return result
    }
    if (currentKeys.secondKey && orderMainSorting && Boolean(dataBody)) {
      let result: IDataBody[] = orderMainSorting?.map(function (el: IArrayId) {
        return dataBody?.find((elBody: IDataBody) => elBody?.key === el?.key)
      })

      return result
    }
  }

  const processingKeys = (currentKeys: ISaveKeys) => {
    let keysSort
    console.info(dataTitle)

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
        addPropertyArrTitle2(keysSort, currentKeys)
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
        addPropertyArrTitle2(keysSort, currentKeys)
        return resetOrder(currentKeys)
      }

      if (currentKeys.mainKey.orderSort === AriaSort.NONE) {
        keysSort = {
          mainKey: {
            ...currentKeys.mainKey,
          },
          secondKey: {
            ...saveKeys.secondKey,
            orderSort: AriaSort.NONE,
          },
        }
        setSaveKeys(keysSort)
        addPropertyArrTitle2(keysSort, currentKeys)
        return resetOrder(currentKeys)
      }
    }

    if (currentKeys.secondKey) {
      if (currentKeys.secondKey.orderSort !== AriaSort.NONE) {
        keysSort = {
          mainKey: saveKeys.mainKey,
          secondKey: { ...currentKeys.secondKey },
        }
        setSaveKeys(keysSort)
        addPropertyArrTitle2(keysSort, currentKeys)
        return doSorting(keysSort, currentKeys)
      }

      if (currentKeys.secondKey.orderSort === AriaSort.NONE) {
        keysSort = {
          mainKey: saveKeys.mainKey,
          secondKey: { ...currentKeys.secondKey },
        }
        setSaveKeys(keysSort)
        addPropertyArrTitle2(keysSort, currentKeys)
        return resetOrder(currentKeys)
      }
    }
  }

  const doSorting = (keysSort: ISaveKeys, currentKeys: ISaveKeys) => {
    saveOrder(currentKeys)

    if (dataBody && keysSort) {
      let cloneData: IDataBody[] = dataBody?.slice()
      if (
        keysSort.mainKey &&
        keysSort.mainKey.orderSort === AriaSort.ASCENDING
      ) {
        const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
        setDataBody(() => [...sortData])
      }
      if (
        dataBody &&
        keysSort.mainKey &&
        keysSort.mainKey.orderSort === AriaSort.DESCENDING
      ) {
        setDataBody(() => [...dataBody.reverse()])
      }

      if (dataBody && keysSort.secondKey) {
        const sortData: IDataBody[] = cloneData.sort(byKeys(keysSort))
        setDataBody(() => [...sortData])
      }
    }
  }

  // метод изменения свойств (order) объекта Title
  const addPropertyArrTitle2 = (
    keysSort: ISaveKeys,
    currentKeys: ISaveKeys
  ) => {
    let copy: IDataTitle[] = Object?.assign([], dataTitle)
    console.info(keysSort)
    console.info(keysSort.secondKey)
    console.info(keysSort.secondKey?.dataIndex)
    console.info(currentKeys)
    const newDataTitle = copy?.map((item) => {
      if (currentKeys.mainKey) {
        console.info(323)
        console.info(item)
        console.info(item.dataIndex)
        console.info(keysSort.secondKey?.dataIndex)
        console.info(item.dataIndex === keysSort.secondKey?.dataIndex)
        if (item.dataIndex === currentKeys.mainKey?.dataIndex) {
          return {
            ...item,
            order: currentKeys.mainKey?.orderSort,
          }
        }
        if (item.dataIndex === keysSort.secondKey?.dataIndex) {
          console.info(324)
          return {
            ...item,
            order: keysSort.secondKey?.orderSort,
          }
        }

        if (item.dataIndex !== keysSort.secondKey?.dataIndex) {
          console.info(325)
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
  console.info(dataTitle2)

  // смена свойств массива объектов заголовков, добавляет и меняет order: AriaSort
  const changeProperty = (item: IDataTitle, key: string) => {
    if (key === item.dataIndex) {
      return { ...item, order: toggleSort(item.order || AriaSort.NONE) }
    } else {
      return item
    }
  }

  // метод изменения свойств (order) объекта Title
  // const addPropertyArrTitle = (key: string) => {
  //   let copy: IDataTitle[] = Object?.assign([], dataTitle)

  //   const newDataTitle = copy?.map((item) => {
  //     const isKeyInList: boolean = keysTitles.includes(key)

  //     if (isKeyInList) {
  //       if (Boolean(keysTitles[1])) {
  //         if (key === keysTitles[0]) {
  //           if (orderSortMainColumn === AriaSort.DESCENDING) {
  //             resetKeys()
  //             return {
  //               ...item,
  //               order: AriaSort.NONE,
  //             }
  //           } else {
  //             if (key === item.dataIndex) {
  //               setOrderSortMainColumn(toggleSort(item.order || AriaSort.NONE))
  //               return {
  //                 ...item,
  //                 order: toggleSort(item.order || AriaSort.NONE),
  //               }
  //             } else {
  //               return item
  //             }
  //           }
  //         }
  //         // работает
  //         if (key === keysTitles[1]) {
  //           return changeProperty(item, key)
  //         }
  //       } else {
  //         return changeProperty(item, key)
  //       }
  //     }

  //     if (!isKeyInList) {
  //       if (Boolean(keysTitles[1])) {
  //         if (key === item.dataIndex) {
  //           return {
  //             ...item,
  //             order: toggleSort(item.order || AriaSort.NONE),
  //           }
  //         }
  //         if (keysTitles[1] === item.dataIndex) {
  //           return {
  //             ...item,
  //             order: AriaSort.NONE,
  //           }
  //         }
  //         return item
  //       } else {
  //         return changeProperty(item, key)
  //       }
  //     }
  //   })

  //   setDataTitle(newDataTitle as IDataTitle[])
  // }

  return (
    <table id={id} className={cn("itpc-table-sort", className)} {...rest}>
      {captionTable && <TableCaption captionTable={captionTable} />}
      {dataTitle && (
        <TableHeader
          titleColumns={dataTitle}
          setKeySort={setKeySort}
          currentColumnSort={keysTitles}
          isHeaderCellClickable={isHeaderCellClickable}
          isIconClickable={isIconClickable}
          iconSortUp={iconSortUp}
          iconSortDown={iconSortDown}
        />
      )}
      {dataBody && (
        <TableBody sourceData={dataBody} currentColumnSort={keysTitles} />
      )}
    </table>
  )
}
