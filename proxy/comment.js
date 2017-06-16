import { comment } from '../models'

 /*  获取全部标签  */
export const getComments = async(query = {}) => {
  return await comment.find(query).sort({ 'created_at': -1 })
}

 /*  生成新文章  */
export const newAndSave = async(data) => {
  let c = new comment()
  c.article_id = data.article_id
  c.account = data.account
  c.content = data.content
  return await c.save()
}

export default {
  getComments,
  newAndSave
}
