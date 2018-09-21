import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql'

import ArticleType from './ArticleType'
import Article from '../../proxy/article'
import { Tag, Comment } from '../../proxy'
import { getDefaultCover } from '../../common/article'

let ArticleMutation = {
  addArticle: {
    type: ArticleType,
    description: '添加文章',
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章标题'
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章内容'
      },
      cover: {
        type: GraphQLString,
        description: '文章封面'
      },
      tags: {
        type: new GraphQLList(GraphQLID),
        description: '标签'
      },
      is_draft: {
        type: GraphQLBoolean,
        description: '是否在草稿箱'
      }
    },
    resolve: async(root, { title, content, cover, tags, is_draft }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      let newArticle = await Article.newAndSave({
        author: root.user._id,
        title,
        content,
        cover,
        tags,
        is_draft
      })

      await Tag.patchesTag(newArticle._id, tags)

      return newArticle
    }
  },


  deleteArticle: {
    type: ArticleType,
    description: '删除文章',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章id'
      }
    },
    resolve: async(root, { id }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      let article = await Article.getArticleById(id)

      if (!article) throw Error('未找到文章')

      Array.from(article.tags, async(name) => {
        let tag = await Tag.getTagByName(name)
        let index = tag.article.indexOf(id)

        if (index > -1) {
          tag.article.splice(index, 1)
          return await tag.save()
        }
      })

      await Comment.deleteComments(id)

      return await article.remove()
    }
  },


  releaseArticle: {
    type: ArticleType,
    description: '发布或下架文章',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章id'
      }
    },
    resolve: async(root, { id }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.superAdmin) throw Error('发布/下架 需要超级管理员权限')

      let article = await Article.getArticleById(id)

      if (!article) throw Error('未找到文章')

      article.release = !article.release

      return await article.save()
    }
  },


  updateArticle: {
    type: ArticleType,
    description: '更新文章',
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章id'
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章标题'
      },
      content: {
        type: new GraphQLNonNull(GraphQLString),
        description: '文章内容'
      },
      cover: {
        type: GraphQLString,
        description: '文章封面'
      },
      tags: {
        type: new GraphQLList(GraphQLID),
        description: '标签'
      },
      is_draft: {
        type: GraphQLBoolean,
        description: '是否在草稿箱'
      }
    },
    resolve: async(root, { id, title, content, cover, tags, is_draft }) => {
      if (!root.user) throw Error('请先登录')
      if (!root.user.admin) throw Error('你没有权限')

      let article = await Article.getArticleById(id)

      if (!article) throw Error('未找到文章')
      if (!is_draft) {
        cover = cover || getDefaultCover()
      }

      article.depopulate('tags')
      await Tag.patchesTag(id, tags, article.tags, is_draft)

      Object.assign(article, {
        title,
        content,
        cover,
        tags,
        is_draft
      })

      return await article.save()
    }
  }
}

export default ArticleMutation
