import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql/type'

import LinkType from './LinkType'
import { Link } from '../../proxy'

let LinkMutation = {
  addLink: {
    type: new GraphQLList(LinkType),
    description: '添加友链',
    args: {
      name: {
        type: GraphQLString,
        description: '名字'
      },
      avatar: {
        type: GraphQLString,
        description: '头像'
      },
      bio: {
        type: GraphQLString,
        description: '简述'
      },
      link: {
        type: GraphQLString,
        description: '链接'
      }
    },
    resolve: async(root, { name, bio, link, avatar }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      await Link.newAndSave({
        name,
        bio,
        link,
        avatar
      })

      return await Link.getLinks()
    }
  },


  updateLink: {
    type: new GraphQLList(LinkType),
    description: '更新友链',
    args: {
      id: {
        type: GraphQLID,
        description: 'id'
      },
      name: {
        type: GraphQLString,
        description: '名字'
      },
      avatar: {
        type: GraphQLString,
        description: '头像'
      },
      bio: {
        type: GraphQLString,
        description: '简述'
      },
      link: {
        type: GraphQLString,
        description: '链接'
      }
    },
    resolve: async(root, { id, name, bio, link, avatar }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      let data = await Link.getLinkById(id)

      if (!data) throw Error('未找到该友链')

      data.name = name
      data.bio = bio
      data.link = link
      data.avatar = avatar

      await data.save()

      return await Link.getLinks()
    }
  },


  removeLink: {
    type: new GraphQLList(LinkType),
    description: '删除友链',
    args: {
      id: {
        type: GraphQLID,
        description: 'id'
      }
    },
    resolve: async(root, { id }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      let data = await Link.getLinkById(id)

      if (!data) throw Error('未找到该友链')

      await data.remove()

      return Link.getLinks()
    }
  }
}


export default LinkMutation
