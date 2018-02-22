import fragments from './graphql_fragment'

function isset (data) {
  return !(data === undefined || data === null)
}

export default class Graphql {
  constructor (axios) {
    this.axios = axios
    this.query = this.create('query')
    this.mutation = this.create('mutation')
  }
  create (type) {
    return (main, variable, fragmentArr) => {
      // 字母，数字，下划线
      let name = main.match(/\w+\b/)
      let fragment = ''

      if (Array.isArray(variable)) {
        fragmentArr = variable
        variable = null
      }
      else if (variable) {
        for (let key in variable) {
          let reg = new RegExp(`\\$${key}`)
          main = main.replace(reg, () => {
            return isset(variable[key]) ? `${key}: ${JSON.stringify(variable[key])}` : ''
          })
        }
      }

      if (fragmentArr) {
        fragment = fragmentArr.map((name) => fragments[name]).join('')
      }

      return this.axios.post('/graphql',
        `${type} {
          ${main}
        }

        ${fragment}
        `
      )
      .then((res) => res.data[name])
    }
  }
}
