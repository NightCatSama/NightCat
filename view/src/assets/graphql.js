export default class Graphql {
  constructor (axios) {
    this.axios = axios
    this.query = this.create('query')
    this.mutation = this.create('mutation')
  }
  create (type) {
    return (main, variable) => {
      let name = main.match(/\w+\b/)

      if (variable) {
        for (let key in variable) {
          let reg = new RegExp(`\\$${key}`)
          main = main.replace(reg, `${key}: ${JSON.stringify(variable[key])}`)
        }
      }

      return this.axios.post('/graphql',
        `${type} {
          ${main}
        }`
      )
      .then((res) => res.data[name])
    }
  }
}
