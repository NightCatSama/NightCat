import { tag } from '../models'

 /*  获取全部标签  */
export const getTags = async() => {
  return await tag.find({}).populate('article').sort({ 'count': -1 })
}

 /*  根据名字查找标签  */
export const getTagByName = async(name) => {
  return await tag.findOne({ name }).populate('article')
}

 /*  根据id查找标签  */
export const getTagById = async(id) => {
  return await tag.findById(id).populate('article')
}

 /*  修改Tag  */
export const patchesTag = async(id, newTags, oldTags = []) => {
  const deleteArr = oldTags.filter((tag_id) => newTags.indexOf(`${tag_id}`) === -1)
  const addArr = newTags.filter((tag_id) => oldTags.indexOf(`${tag_id}`) === -1)

  Array.from(deleteArr, async(_id) => {
    let t = await getTagById(_id)
    if (!t) return false

    t.depopulate('article')
    let index = t.article.indexOf(id)

    index > -1 && t.article.splice(index, 1)
    await t.save()
  })

  Array.from(addArr, async(_id) => {
    let t = await getTagById(_id)
    if (!t) return false

    t.depopulate('article')
    let index = t.article.indexOf(id)

    index === -1 && t.article.push(id)
    await t.save()
  })
}

 /*  生成新标签  */
export const newAndSave = async(data) => {
  let t = new tag()
  t.name = data.name
  t.article = []
  return await t.save()
}

export default {
  getTags,
  getTagByName,
  getTagById,
  patchesTag,
  newAndSave
}
