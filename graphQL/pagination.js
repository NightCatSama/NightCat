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

  /*  得到 PageInfo 的Type  */
  getPageInfoType () {
    return new GraphQLObjectType({
      name: `${this._name}PageInfo`,
      fields: () => ({
        startCursor: {
          type: GraphQLString,
          description: '返回列表首项的标识'
        },
        endCursor: {
          type: GraphQLString,
          description: '返回列表尾项的标识'
        },
        hasNextPage: {
          type: GraphQLBoolean,
          description: '是否有下一页'
        },
        hasPrevPage: {
          type: GraphQLBoolean,
          description: '是否有上一页'
        }
      })
    })
  }


  /*  得到 Edges 的Type  */
  getEdgesType () {
    return new GraphQLList(new GraphQLObjectType({
      name: `${this._name}Edges`,
      fields: () => ({
        node: {
          type: this._type,
          description: '列表单项的数据'
        },
        cursor: {
          type: GraphQLString,
          description: '标识'
        }
      })
    }))
  }


  /*  All Type  */
  getType () {
    return new GraphQLObjectType({
      name: `${this._name}`,
      description: '包装后的类型',
      fields: () => ({
        totalCount: {
          type: GraphQLInt,
          descriptions: '总页数'
        },
        pageInfo: {
          type: this.getPageInfoType(),
          descriptions: '保存分页相关数据的对象'
        },
        edges: {
          type: this.getEdgesType(),
          descriptions: '保存数据的数组'
        }
      })
    })
  }


  /*  可传参数  */
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
      },
      offset: {
        type: GraphQLInt,
        description: '规定从该索引开始获取'
      }
    }
  }


  /*  处理返回数据  */
  async resolve (node, { first, last, before, after, offset = 0 }) {
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
      ) + offset
      startOffset += offset
    }

    if (typeof last === 'number') {
      if (last < 0) throw Error('last 不能小于零')

      startOffset = Math.max(
        startOffset,
        endOffset - last
      ) - offset
      endOffset -= offset
    }

    let range = [
      Math.max(startOffset, 0),
      Math.min(endOffset, len)
    ]

    const slice = node.slice(...range)

    let edges = Array.from(slice, (obj, i) => {
      return {
        node: obj,
        cursor: this.getCursor(range[0] + i)
      }
    })

    const startEdge = edges[0]
    const endEdge = edges[edges.length - 1]
    const lowerBound = after ? (afterOffset + 1) : 0
    const upperBound = before ? beforeOffset : len

    return {
      edges,
      totalCount: upperBound - lowerBound,
      pageInfo: {
        startCursor: startEdge ? startEdge.cursor : null,
        endCursor: endEdge ? endEdge.cursor : null,
        hasPrevPage: range[0] > lowerBound,
        hasNextPage: range[1] < upperBound
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