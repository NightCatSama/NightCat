import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} from 'graphql'

import UserType from './user/UserType'

const PREFIX = 'arrayconnection:'

export default class Pagination {
  constructor ({
    name,
    type,
    prefix
  }) {
    this._name = name
    this._type = type
    this.prefix = prefix || PREFIX
    this.type = this.getType(name, type)
    this.args = this.getArgs()
  }


  getPageInfoType () {
    return new GraphQLObjectType({
      name: `${this._name}PageInfo`,
      descriptions: '保存分页相关数据的对象',
      fields: () => ({
        startCursor: {
          type: GraphQLString
        },
        endCursor: {
          type: GraphQLString
        },
        hasNextPage: {
          type: GraphQLBoolean
        },
        hasPrevPage: {
          type: GraphQLBoolean
        }
      })
    })
  }


  getEdgesType () {
    return new GraphQLList(new GraphQLObjectType({
      name: `${this._name}Edges`,
      descriptions: 'Edges',
      fields: () => ({
        node: {
          type: this._type
        },
        cursor: {
          type: GraphQLString
        }
      })
    }))
  }


  getType () {
    return new GraphQLObjectType({
      name: `${this._name}`,
      description: '包装后的类型',
      fields: () => ({
        pageInfo: {
          type: this.getPageInfoType()
        },
        edges: {
          type: this.getEdgesType()
        }
      })
    })
  }


  getArgs () {
    return {
      first: {
        type: GraphQLInt,
        description: '从列表前面获取的个数'
      },
      last: {
        type: GraphQLInt,
        description: '从列表后面获取的个数'
      },
      before: {
        type: GraphQLString,
        description: '规定在此标志之前的列表'
      },
      after: {
        type: GraphQLString,
        description: '规定在此标志之后的列表'
      }
    }
  }


  async resolve (node, { first, last, before, after }) {
    const len = node.length
    const beforeOffset = this.getOffset(before, len)
    const afterOffset = this.getOffset(after, -1)

    let startOffset = Math.max(
      afterOffset,
      -1
    ) + 1

    let endOffset = Math.min(
      beforeOffset,
      len
    )

    if (typeof first === 'number') {
      if (first < 0) throw Error('first 不能小于零')

      endOffset = Math.min(
        startOffset + first,
        endOffset
      )
    }

    if (typeof last === 'number') {
      if (last < 0) throw Error('last 不能小于零')

      startOffset = Math.max(
        startOffset,
        endOffset - last
      )
    }

    const slice = node.slice(
      Math.max(startOffset, 0),
      Math.min(endOffset, len),
    )

    let edges = Array.from(slice, (obj, i) => {
      return {
        node: obj,
        cursor: this.getCursor(startOffset + i)
      }
    })

    const startEdge = edges[0]
    const endEdge = edges[edges.length - 1]
    const lowerBound = after ? (afterOffset + 1) : 0
    const upperBound = before ? beforeOffset : len

    return {
      edges,
      pageInfo: {
        startCursor: startEdge ? startEdge.cursor : null,
        endCursor: endEdge ? endEdge.cursor : null,
        hasPrevPage:
          typeof last === 'number' ? startOffset > lowerBound : false,
        hasNextPage:
          typeof first === 'number' ? endOffset < upperBound : false
      }
    }
  }


  getOffset (cursor, defaultOffset) {
    if (typeof cursor !== 'string') return defaultOffset

    const offset = parseInt(this.unbase64(cursor).substr(this.prefix.length))
    return isNaN(offset) ? defaultOffset : offset
  }


  getCursor (offset) {
    if (offset === -1) return null

    return this.base64(this.prefix + offset)
  }


  base64(str) {
    return new Buffer(str, 'utf8').toString('base64')
  }


  unbase64(str) {
    return new Buffer(str, 'base64').toString('utf8')
  }
}