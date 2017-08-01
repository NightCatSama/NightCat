;(function (w, d, undefined) {
  function parseGraphqlObject (obj, type) {
    console.log(obj)
    var topAnnotation = `
${type}${obj.arg.map((arg) => `${arg.name}: ${arg.type}`)} {

}
    `
    return topAnnotation.trim()
  }
  window['parseGraphqlObject'] = parseGraphqlObject
})(window, document)