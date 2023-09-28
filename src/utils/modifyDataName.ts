import { coordinateData } from '@/components/main/analysis/coordinate-data'

export function modifyNameOne(arr: Array<any>, data: Array<any>) {
  arr.splice(0, arr.length)
  for (const item in data) {
    data[item].value = data[item].goodsCount
    if (data[item].value != 0) {
      const obj = { value: data[item].value, name: data[item].name }
      arr.push(obj)
    }
  }
}

export function modifyNameTwo(arr1: Array<any>, arr2: Array<any>, data: Array<any>) {
  arr1.splice(0, arr1.length)
  arr2.splice(0, arr2.length)
  for (const item in data) {
    data[item].value = data[item].goodsCount
    if (data[item].value && data[item].value != 0) {
      arr1.push(data[item].name)
      arr2.push(data[item].goodsCount)
    }

  }
}

export function modifyNameThree(arr1: Array<any>, arr2: Array<any>, data: Array<any>) {
  arr1.splice(0, arr1.length)
  arr2.splice(0, arr2.length)
  for (const item in data) {
    data[item].value = data[item].goodsCount
    if (data[item].goodsFavor && data[item].goodsFavor != 0) {
      arr1.push(data[item].name)
      arr2.push(data[item].goodsFavor)
    }
  }
}


export function convertData(data: any) {
  const res = []
  for (let i = 0; i < data.length; i++) {
    const geoCoord = coordinateData[data[i].address]
    if (geoCoord) {
      res.push({
        name: data[i].address,
        value: geoCoord.concat(data[i].count)
      })
    }
  }
  return res
}

