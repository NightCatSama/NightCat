'use strict'

;(function (w, d, undefined) {

  // 将对象格式化
  function parseGraphqlObject (obj, type) {
    var topAnnotation = `
${type} {
  ${getDataType(obj, 4, [obj.name])}
}
    `
    return topAnnotation.trim()
  }

  function getDataType (obj, indent, parent) {
    console.log(parent)
    return `
${' '.repeat(indent)}${obj.name}${getArgs(obj.args)} {
${
  obj.resolve.fields
  .filter((o) => parent.indexOf(o.name) === -1)
  .map((o) => ' '.repeat(indent + 4) + (o.resolve ? getDataType(o, indent + 4, parent.concat([o.name])) : o.name))
  .join('\n')
}
${' '.repeat(indent)}}
`.trim()
  }

  function getArgs (args) {
    if (!args.length) return ''

    args = args.filter((arg) => {
      return arg.type.substr(-1) === '!'
    })

    return args.length ? ' (' + args.map((arg) => `${arg.name}: ${arg.type}`).join(', ') + ')' : ''
  }

  w['parseGraphqlObject'] = parseGraphqlObject

})(window, document)