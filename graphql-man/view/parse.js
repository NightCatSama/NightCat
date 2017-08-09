'use strict'

;(function (w, d, undefined) {

  // 将对象格式化
  function parseGraphqlObject (obj, type) {
    var topAnnotation = `
${type} {
  ${getDataType(obj)}
}
    `
    return topAnnotation.trim().replace(/  /g, '    ')
  }

  function getDataType (obj, indent = 2) {
    return `
${' '.repeat(indent)}${obj.name}${getArgs(obj.args)} {
${obj.resolve.fields.map((o) => {
    if (o.resolve) {
      return ' '.repeat(indent + 2) + getDataType(o, indent + 2)
    }
    else {
      return ' '.repeat(indent + 2) + o.name
    }
  }).join('\n')}
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