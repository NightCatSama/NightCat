import express from 'express'

/*  设置后台管理页面静态文件目录  */
const setStaticFileOnAdmin = async(req, res, next) => {
	let app = req.app
	app.use(express.static(app.get('admin_views')))
	res.sendFile('/', { root: app.get('admin_views') })
}

/*  设置前端页面静态文件目录  */
const setStaticOnFront = async(req, res, next) => {
	let app = req.app
	app.set('views', app.get('fe_views'))
	app.use(express.static(app.get('fe_views')))
	next()
}

export {
	setStaticOnFront,
	setStaticFileOnAdmin
}