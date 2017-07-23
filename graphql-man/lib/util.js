'use strict'

export const isGraphQLSchema = (schema) => schema.constructor.name === 'GraphQLSchema'
