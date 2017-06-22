import { comment } from '../models'
import { Reply } from '../proxy'

 /*  获取全部评论  */
export const getComments = async(query = {}) => {
  return await comment.find(query).populate({
    path: 'user reply',
    populate: {
      path: 'user target_user'
    }
  }).sort({ 'created_at': -1 })
}

 /*  通过id获取评论  */
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

 /*  删除该文章下的所有评论  */
export const deleteComments = async(id) => {
  let comments = await comment.find({
    article_id: id
  })
  Array.from(comments, async(c) => {
    await Reply.deleteReplies(c._id)
    await c.remove()
  })
}

 /*  通过评论类型获取评论数目  */
export const getCommentCountByType = async(type) => {
  return await comment.count({
    type
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

 /*  生成新文章评论  */
export const newAndSave = async(data) => {
  let c = new comment()
  c.article_id = data.article_id
  c.user = data.user
  c.content = data.content
  c.floor = await comment.count({ article_id: data.article_id }) + 1
  c = await c.save()

  return await getCommentById(c._id)
}

 /*  生成新独立评论  */
export const newIndieCommentAndSave = async(data) => {
  let c = new comment()
  c.type = data.type
  c.user = data.user
  c.content = data.content
  c.floor = await comment.count({ type: data.type }) + 1
  c = await c.save()

  return await getCommentById(c._id)
}

export default {
  getComments,
  getCommentById,
  setCommentAddReply,
  getCommentCount,
  deleteComments,
  newAndSave,
  newIndieCommentAndSave
}
