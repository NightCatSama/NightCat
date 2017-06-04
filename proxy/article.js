import { article } from '../models'

 /*  获取全部文章  */
export const getArticle = async() => {
	return await article.find({}).sort({ 'created_at': -1 })
}

 /*  根据id查找标签  */
export const getArticleById = async(id) => {
	return await article.findOne({ _id: id })
}

 /*  生成新文章  */
export const newAndSave = async(data) => {
	let a = new article()
	a.title = data.title
	a.author = data.author
	a.tags = data.tags
	a.content = data.content
	a.cover = data.cover
	return await a.save()
}

export default {
	getArticle,
	getArticleById,
	newAndSave
}
