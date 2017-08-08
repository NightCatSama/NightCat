'use strict'

;(function (w, d, undefined) {

  function parseGraphqlObject (obj, type) {
    console.log(obj)
    var topAnnotation = `
${type} {
  ${obj}
}
    `
    return topAnnotation.trim()
  }

  function getQuery (obj) {
    return `

`
  }

  w['parseGraphqlObject'] = parseGraphqlObject

})(window, document)