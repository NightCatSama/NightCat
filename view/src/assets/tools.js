export const getStyles = (obj, unit) => {
  let result = {}
  for (let key in obj) {
    if (obj[key]) {
      result[key] = obj[key] + (unit || '')
    }
  }
  return Object.keys(result).length > 0 ? result : null
}

// 自动添加前缀
export const getClass = (prefixCls, arr) => {
  return Array.from(arr, (s) => {
    if (!s) {
      return prefixCls
    }
    else if (typeof s === 'string') {
      return `${prefixCls}-${s}`
    }
    else {
      let obj = {}
      for (let key in s) {
        obj[`${prefixCls}-${key}`] = s[key]
      }
      return obj
    }
  })
}

// 判断值是否在数组中
export const isValid = (rule, val) => {
  return rule.some((str) => str === val)
}

// 绑定事件
export const on = (elem, type, fn) => {
  elem.addEventListener(type, fn, false)
}

// 解绑事件
export const off = (elem, type, fn) => {
  elem.removeEventListener(type, fn, false)
}
