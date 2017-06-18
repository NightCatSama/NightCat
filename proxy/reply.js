import { reply } from '../models'
import Comment from './comment'

 /*  获取全部回复  */
export const getReplys = async(query = {}) => {
  return await reply.find(query).populate('target_user user').sort({ 'created_at': 1 })
}

 /*  获取单个回复  */
export const getReplyById = async(id) => {
  return await reply.findById(id).populate('target_user user')
}


 /*  生成新回复  */
export const newAndSave = async(data) => {
  let r = new reply()
  r.comment_id = data.comment_id
  r.target_user = data.target_user
  r.user = data.user
  r.content = data.content
  await r.save()

  await Comment.setCommentAddReply(r.comment_id, r._id)

  return await getReplyById(r._id)
}

export default {
  getReplys,
  getReplyById,
  newAndSave
}
