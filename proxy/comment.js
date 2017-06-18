import { comment } from '../models'

 /*  获取全部标签  */
export const getComments = async(query = {}) => {
  return await comment.find(query).populate({
    path: 'user reply',
    populate: {
      path: 'user target_user'
    }
  }).sort({ 'created_at': 1 })
} 

 /*  通过文章id获取评论  */
export const getCommentById = async(id) => {
  return await comment.findById(id).populate({
    path: 'user reply',
    populate: {
      path: 'user target_user'
    }
  })
}

 /*  通过文章id获取评论数目  */
export const getCommentCount = async(id) => {
  return await comment.count({
    article_id: id
  })
}

 /*  给评论添加回复  */
export const setCommentAddReply = async(id, reply_id) => {
  return await comment.findByIdAndUpdate(id, { $push: { reply: reply_id } }).populate({
    path: 'user reply',
    populate: {
      path: 'user target_user'
    }
  })
}

 /*  生成新文章  */
export const newAndSave = async(data) => {
  let c = new comment()
  c.article_id = data.article_id
  c.user = data.user
  c.content = data.content
  c = await c.save()

  return await getCommentById(c._id)
}

export default {
  getComments,
  getCommentById,
  setCommentAddReply,
  getCommentCount,
  newAndSave
}
