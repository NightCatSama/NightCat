import { link } from '../models'

 /*  获取全部链接  */
export const getLinks = async() => {
  return await link.find({})
}

 /*  通过id获取链接  */
export const getLinkById = async(id) => {
  return await link.findById(id)
}

 /*  生成新链接  */
export const newAndSave = async(data) => {
  let l = new link()
  l.name = data.name
  l.avatar = data.avatar
  l.bio = data.bio
  l.link = data.link
  return await l.save()
}

export default {
  getLinks,
  getLinkById,
  newAndSave
}