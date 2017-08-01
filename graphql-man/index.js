'use strict'

import pug from 'pug'
import path from 'path'

import { isGraphQLSchema } from './lib/util'
import { parseSchema } from './lib/parse'


/**
 * Default configuration.
 * @private
 */

const DEFAULT_OPTIONS = {
  title: 'GraphQL-Man',
  rules: ['all', 'query', 'mutation']
}


/**
 * Create a graphql-man middleware.
 *
 * @public
 * @param {Object} schema
 * @param {Object} [options]
 * @return {Function} middleware
 */

const graphqlMan = (schema, options = {}) => {
  if (!schema || !isGraphQLSchema(schema)) {
    throw Error('[graphql-man]: The first argument must be a GraphQLSchema Type.')
  }

  // merge configuration
  options = Object.assign({}, DEFAULT_OPTIONS, options)

  // parse the schema structure
  let { Query, Mutation } = parseSchema(schema)

  return (req, res, next) => {
    res.header('Content-Type', 'text/html; charset=utf-8')
    var compiledFunction = pug.compileFile(path.resolve(__dirname, './view/index.pug'))
    console.log(Query)
    res.end(compiledFunction({
      title: options.title,
      name: 'nightcat',
      query: Query,
      mutation: Mutation
    }))
  }
}

export default graphqlMan
