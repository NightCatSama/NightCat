import { tag } from '../models'

 /*  获取全部文章  */
export const getTags = async() => {
	return await tag.find({}).sort({ 'length': -1 })
}

 /*  根据名字查找标签  */
export const getTagByName = async(name) => {
	return await tag.findOne({ name })
}

 /*  修改Tag  */
export const patchesTag = async(id, newTags, oldTags = []) => {
	const deleteArr = oldTags.filter((name) => newTags.indexOf(name) === -1)
	const addArr = newTags.filter((name) => oldTags.indexOf(name) === -1)

	Array.from(deleteArr, async(name) => {
		let t = await getTagByName(name)
		if (!t) return false

		let index = t.article.indexOf(id)

		index > -1 && t.article.splice(index, 1)
		await t.save()
	})

	Array.from(addArr, async(name) => {
		let t = await getTagByName(name)
		if (!t) return false

		let index = t.article.indexOf(id)

		index === -1 && t.article.push(id)
		await t.save()
	})
}

 /*  生成新文章  */
export const newAndSave = async(data) => {
	let t = new tag()
	t.name = data.name
	t.article = []
	return await t.save()
}

export default {
	getTags,
	getTagByName,
	patchesTag,
	newAndSave
}
