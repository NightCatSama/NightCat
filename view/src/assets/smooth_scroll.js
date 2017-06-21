'use strict'

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

const QuadEaseIn = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b

//  滚动到具体位置
const scrollTo = (end, time = 500, offset = 0) => {
  end += offset
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop === end) {
    return false
  }

  let b = scrollTop
  let c = end - b
  let d = time
  let start = null

  return new Promise((resolve, reject) => {
    if (time === 0) {
      document.body.scrollTop = end
      document.documentElement.scrollTop = end
      return resolve(end)
    }

    function step (timeStamp) {
      if (start === null) start = timeStamp
      let progress = timeStamp - start
      if (progress < time) {
        let st = QuadEaseIn(progress, b, c, d)
        document.body.scrollTop = st
        document.documentElement.scrollTop = st
        window.requestAnimationFrame(step)
      } else {
        document.body.scrollTop = end
        document.documentElement.scrollTop = end
        resolve(end)
      }
    }
    window.requestAnimationFrame(step)
  })
}

//  滚动到顶部
const scrollToTop = (time) => {
  return scrollTo(0, time)
}

//  滚动到某元素
const scrollToElem = (elem, time, offset) => {
  let top = elem.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)
  scrollTo(top, time, offset)
}

export {
  scrollToTop,
  scrollToElem,
  scrollTo
}
