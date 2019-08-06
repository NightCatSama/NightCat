import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql/type'

import TagType from './TagType'
import { Tag, Article } from '../../proxy'

let TagMutation = {
  addTag: {
    type: new GraphQLList(TagType),
    description: '添加一个标签',
    args: {
      name: {
        type: GraphQLString,
        description: '标签名字'
      }
    },
    resolve: async(root, { name }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')
      if (!name) throw Error('标签名字不能为空')
      if (await Tag.getTagByName(name)) throw Error('标签已存在')

      await Tag.newAndSave({ name })

      return await Tag.getTags()
    }
  },


  updateTag: {
    type: new GraphQLList(TagType),
    description: '添加一个标签',
    args: {
      id: {
        type: GraphQLID,
        description: 'id'
      },
      name: {
        type: GraphQLString,
        description: '标签名字'
      }
    },
    resolve: async(root, { id, name }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')
      if (!name) throw Error('标签名字不能为空')

      let tag = await Tag.getTagById(id)

      if (!tag) throw Error('标签不存在')

      tag.name = name

      await tag.save()

      return await Tag.getTags()
    }
  },


  removeTag: {
    type: new GraphQLList(TagType),
    description: '删除一个标签',
    args: {
      name: {
        type: GraphQLString,
        description: '标签名字'
      }
    },
    resolve: async(root, { name }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')
      if (!name) throw Error('标签名字不能为空')

      let tag = await Tag.getTagByName(name)

      if (!tag) throw Error('标签不存在')

      Array.from(tag.article, async(id) => {
        let article =  await Article.getArticleById(id)

        let index = article.tags.indexOf(name)
        article.tags.splice(index, 1)

        return await article.save()
      })

      await tag.remove()

      return await Tag.getTags()
    }
  },
}


export default TagMutation
