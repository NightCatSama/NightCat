import { reply } from '../models'

 /*  获取全部标签  */
export const getReplys = async(query = {}) => {
  return await reply.find(query).sort({ 'created_at': 1 })
}

 /*  生成新文章  */
export const newAndSave = async(data) => {
  let r = new reply()
  r.comment_id = data.comment_id
  r.target_account = data.target_account
  r.account = data.account
  r.content = data.content
  return await r.save()
}

export default {
  getReplys,
  newAndSave
}
