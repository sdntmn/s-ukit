import {
  IDataBody,
  IDataTitle,
  ISortingKeys,
} from "./TableSortTwoColumn/TableSortTwoColumn"
import { AriaSort } from "./types"

export const byKey =
  (key: string, isNumber: boolean | undefined) =>
  (
    a: { [x: string]: { toLowerCase: () => number } },
    b: { [x: string]: { toLowerCase: () => number } }
  ) => {
    if (isNumber) {
      return Number(a[key]) - Number(b[key])
    } else {
      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return -1
      }
      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return 1
      }
      return 0
    }
  }

export const byKey2 =
  (key: string) => (a: { [x: string]: number }, b: { [x: string]: number }) =>
    Number(a[key] > b[key]) - Number(a[key] < b[key])

export const byKey3 =
  (keys: string[], isNumber: boolean) =>
  (
    a: { [x: string]: { toLowerCase: () => number } },
    b: { [x: string]: { toLowerCase: () => number } }
  ) => {
    if (keys?.length == 0) return 0
    let key: string = keys[0]
    let key2: string = keys[1]
    if (!key2) {
      console.info(isNumber)
      if (isNumber) {
        return Number(a[key]) - Number(b[key])
      } else {
        if (a[key].toLowerCase() < b[key].toLowerCase()) {
          return -1
        }

        if (a[key].toLowerCase() > b[key].toLowerCase()) {
          return 1
        }
        return 0
      }
    }

    if (key2) {
      if (isNumber) {
        return Number(a[key]) - Number(b[key])
      }

      if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return -1
      }

      if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return 1
      }
      if (a[key].toLowerCase() === b[key].toLowerCase()) {
        return (
          Number(a[key2].toLowerCase() < b[key2].toLowerCase()) -
          Number(a[key2].toLowerCase() > b[key2].toLowerCase())
        )
      }
    }
  }

// if (a[key].toLowerCase() === b[key].toLowerCase()) {
//   key = keys.slice(1)[0]
//    return byKey3([key], isNumber)
//   let key2: string = keys.slice(1)[0]
//   // key = key2
//   if (keys.length == 0) return 0;

//   if (a[key2].toLowerCase() < b[key2].toLowerCase()) {
//     return -1
//   }

//   if (a[key2].toLowerCase() > b[key2].toLowerCase()) {
//     return 1
// }
// }
// }

// if (isNumber) {
//   return Number(a[key]) - Number(b[key])
// } else {
//   if (a[key].toLowerCase() < b[key].toLowerCase()) {
//     return -1
//   }
//   if (a[key].toLowerCase() > b[key].toLowerCase()) {
//     return 1
//   }
//   return 0
// }
//   }

//  const sor=(a, b)=> {
//         if (keys.length == 0) return 0;
//         key = keys[0];
//         if (a[key] < b[key]) return -1;
//         else if (a[key] > b[key]) return 1;
//         else return sortByMultipleKey(keys.slice(1))(a, b);
//     }

// [{name:"John", id:7}, {name:"John",id:4}, {name:"Adam",id:3}, {name:"Adam",id:30}, {name:"Rose",id:1}].sort(function(a, b) {
//   return (b.name<a.name) - (a.name<b.name) || (b.id<a.id) - (a.id<b.id);
// })

export const byKey4 = (keyPro: ISortingKeys, dataBody?: IDataBody[]) => {
  // console.info(keyPro)
  // console.info(dataBody)
  keyPro?.mainKey?.dataIndex
  keyPro.mainKey?.orderSort
  keyPro.mainKey?.sorter
  keyPro.secondKey?.dataIndex
  keyPro.secondKey?.orderSort
  keyPro.secondKey?.sorter
  const res = dataBody?.sort(keyPro?.mainKey?.sorter)

  // console.info(res)

  // временный массив содержит объекты с позицией и значением сортировки
  // var mapped = res?.map((el, i: number, res) => {
  //   const keyIndex =
  //   // if (el.name === keyIndex) {
  //   // }
  //   return { index: i.toString(), key: el.key, keyIndex: el.name, res }
  // })
  // // console.info(res?.sort(keyPro.secondKey?.sorter))
  // console.info(mapped)

  // var result = mapped?.map(function (el: { key: string | number }) {
  //   return dataBody?.[el?.key]
  // })
  // console.info(result)
}

// массив для сортировки
// var list = ["Дельта", "альфа", "ЧАРЛИ", "браво"]

// сортируем массив, содержащий уменьшенные значения

// // контейнер для результа
// var result = mapped.map(function (el: { index: string | number }) {
//   return list[el.index]
// })

export const byKeys =
  (currentKeys: ISortingKeys) => (a: IDataBody, b: IDataBody) => {
    // if (keyPro?.mainKey?.sorter) {
    if (currentKeys.mainKey?.sorter?.(a, b) === 0) {
      if (
        currentKeys?.secondKey?.sorter &&
        currentKeys.secondKey.orderSort === AriaSort.ASCENDING
      ) {
        return currentKeys.secondKey.sorter(a, b)
      }
      if (
        currentKeys?.secondKey?.sorter &&
        currentKeys.secondKey.orderSort === AriaSort.DESCENDING
      ) {
        return currentKeys.secondKey.sorter(a, b) * -1
      }
    } else {
      if (currentKeys.mainKey?.sorter) {
        return currentKeys.mainKey.sorter(a, b)
      }
    }
    return 0
  }
// }
// if (!isSorterMain && keyPro.mainKey?.isSortable) {
//   console.info(555)
//   console.info(a)
//   if (a.indexData.toLowerCase() < b.indexData.toLowerCase()) {
//     return -1
//   }

//   if (a.indexData.toLowerCase() > b.indexData.toLowerCase()) {
//     return 1
//   }

//   if (a.indexData.toLowerCase() === b.indexData.toLowerCase()) {
//     if (isSorterSecond && keyPro.secondKey?.isSortable) {
//       return keyPro?.secondKey?.sorter?.(a, b)
//     }
//     if (!isSorterSecond && keyPro.secondKey?.isSortable) {
//       if (a.indexData.toLowerCase() < b.indexData.toLowerCase()) {
//         return -1
//       }

//       if (a.indexData.toLowerCase() > b.indexData.toLowerCase()) {
//         return 1
//       }
//     }
//   }
// }
