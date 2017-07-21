'use strict'

/**
 * parse schema.
 *
 * @private
 * @param {Object} schema
 * @return {Object} Query Mutation
 */

function parseSchema (schema) {
  let Query, Mutation
  const _typeMap = schema._typeMap

  Query = parseType(schema._queryType)
  Mutation = parseType(schema._mutationType)
  return {
    Query,
    Mutation
  }
}

/**
 * parse the schema structure.
 *
 * @private
 * @param {Object} schema
 * @return {Object} Query|Mutation
 */
function parseType (schemaType, rootType = []) {
  const { schemaName, description } = schemaType
  const fields = Array.from(Object.keys(schemaType._fields), (name) => {
    let obj = schemaType._fields[name]
    let Type = obj.type.constructor.name === 'GraphQLList' ? obj.type.ofType : obj.type


    let type = Type.constructor.name
    let resolve = type === 'GraphQLObjectType' && rootType.indexOf(Type.name) === -1 ?
      parseType(Type, rootType.concat([Type.name])) :
      undefined

    return {
      name,
      descriptions: obj.descriptions || obj.description,
      args: Array.from(obj.args, (arg) => ({
          name: arg.name,
          description: arg.description,
          type: arg.type
      })),
      resolve
    }
  })

  return {
    schemaName,
    description,
    fields
  }
}

export {
  parseSchema
}