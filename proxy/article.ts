import { article, comment } from '../models'

/*  获取全部文章  */
export const getArticle = async(condition) => {
  condition = condition || {}
  return await article.find(condition).populate('author tags').sort({ 'created_at': -1 })
}

/*  根据id查找文章  */
export const getArticleById = async(id) => {
  return await article.findById(id).populate('author tags')
}

/*  生成新文章  */
export const newAndSave = async(data) => {
  let a: any = new article()
  a.title = data.title
  a.author = data.author
  a.tags = data.tags
  a.content = data.content
  a.cover = data.cover
  a.release = false
  await a.save()

  return await getArticleById(a._id)
}

export default {
  getArticle,
  getArticleById,
  newAndSave
}
