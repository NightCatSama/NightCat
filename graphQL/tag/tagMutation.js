import {
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql'

import TagType from './TagType'
import Tag from '../../proxy/tag'
import Article from '../../proxy/article'

let TagMutation = {
  addTag: {
    type: TagType,
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

      return await Tag.newAndSave({ name })
    }
  },

  
  removeTag: {
    type: TagType,
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
        console.log(article)

        let index = article.tags.indexOf(name)
        article.tags.splice(index, 1)
        
        return await article.save()
      })

      return await tag.remove()
    }
  },
}


export default TagMutation
