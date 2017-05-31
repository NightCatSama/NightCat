const install = (Vue, axios) => {
  let graphql = {}

  graphql.mutation = (name, params, res) => {
    let str = Array.from(Object.keys(params), (key) => `${key}: "${params[key]}"`).join(',')
    return axios.post('/graphql',
      `mutation {
        ${name} (${str}) {
          ${res || ''}
        }
      }`
    )
    .then((res) => res.data[name])
  }

  graphql.query = (name, res) => {
    return axios.post('/graphql',
      `query {
        ${name} {
          ${res || ''}
        }
      }`
    )
    .then((res) => res.data[name])
  }

  Vue.prototype.$graphql = graphql
}

export default install
