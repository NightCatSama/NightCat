export default class Graphql {
  constructor (axios) {
    this.axios = axios
    this.query = this.create('query')
    this.mutation = this.create('mutation')
  }
  create (type) {
    return (main) => {
      let name = main.match(/\w+\b/)
      return this.axios.post('/graphql',
        `${type} {
          ${main}
        }`
      )
      .then((res) => res.data[name])
    }
  }
}
