import express from 'express'

 /*  设置后台管理页面静态文件目录  */
const setStaticOnBack = async(req, res, next) => {
	let app = req.app
	app.set('views', app.get('back_views'))
	app.use(express.static(app.get('back_views')))
	next()
}

 /*  设置前端页面静态文件目录  */
const setStaticOnFront = async(req, res, next) => {
	let app = req.app
	app.set('views', app.get('frone_views'))
	app.use(express.static(app.get('back_static_views')))
	next()
}
export {
	setStaticOnFront,
	setStaticOnBack
}