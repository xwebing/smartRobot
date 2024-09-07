const cityData = [
  { id: 1, pid: 0, name: '北京市' },
  { id: 2, pid: 1, name: '朝阳区' },
  { id: 3, pid: 2, name: '东城街道' },
  { id: 4, pid: 1, name: '凤阳区' },
  { id: 5, pid: 4, name: 'c1街道' },
  { id: 6, pid: 1, name: '风云区' },
  { id: 7, pid: 6, name: '西城街道' },

  { id: 8, pid: 0, name: '周口市' },
  { id: 9, pid: 8, name: '淮阳县' },
  { id: 10, pid: 9, name: '临蔡镇' },
  { id: 17, pid: 8, name: '项城县' },
  { id: 18, pid: 17, name: '临颍镇' },
  { id: 19, pid: 8, name: '商水县' },

  { id: 11, pid: 0, name: '深圳市' },
  { id: 12, pid: 11, name: '罗湖区' },
  { id: 13, pid: 12, name: '手动街道' },

  { id: 14, pid: 0, name: '上海市' },
  { id: 15, pid: 14, name: '浦东区' },
  { id: 16, pid: 15, name: '迷人街道' }
]

// 扁平数据转树形结构-方案1
const coverTreefn1 = (data = []) => {
  const arr = []
  data.forEach((item) => {
    item.child = data.filter((i) => i.pid === item.id)
    if (item.pid === 0) {
      arr.push(item)
    }
  })
  return arr
}
// 扁平数据转树性结构-方案2
// 扁平数据转树性结构-方案3
// coverTreefn1(cityData)

// 树形结构数据转扁平数据
// 树形结构数据搜索-递归
const treeDataSearch1 = (arr = [], str = '') => {
  const result = []
  arr.forEach((item) => {
    if (item.name.includes(str)) {
      result.push(item)
    } else {
      if (item?.child.length) {
        const res = treeDataSearch1(item.child, str)
        if (res?.length) {
          const obj = {
            ...item,
            child: res
          }
          result.push(obj)
        }
      }
    }
  })
  return result
}
// 树形结构数据搜索-把数据扁平化
const treeDataSearch2 = (arr = [], str = '') => {
  // 转扁平化数据
  const flatData = {}
  const flat = (arr = []) => {
    arr.forEach((item) => {
      flatData[item.id] = { id: item.id, pid: item.pid, name: item.name }
      if (item?.child.length) {
        flat(item.child)
      }
    })
  }
  flat(arr)
  console.log('转扁平化数据', flatData)
  const result = []

  // const searchFn =(arr=[])=>{
  //     const item = arr.find(item => item.name.includes(str))
  //     result.push(item)
  //     if(item?.pid!==0){

  //         const res = searchFn(item.child)
  //         if(res?.length) {
  //             result.push(res)
  //         }
  //     }
  // }

  // searchFn(flatData)

  // arr.forEach(item => {
  //     if (item.name.includes(str)) {
  //         result.push(item)
  //     } else {
  //         if(item?.child.length){
  //             const res = treeDataSearch2(item.child, str)
  //             if(res?.length) {
  //                 const obj = {
  //                    ...item,
  //                     child: res
  //                 }
  //                 result.push(obj)
  //             }
  //         }
  //     }
  // })
  return []
}
// console.log(treeDataSearch(coverTreefn1(cityData), '淮阳'));
console.log(treeDataSearch2(coverTreefn1(cityData), '淮阳'))
