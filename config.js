export default {
	debug: process.env.NODE_ENV || true,
    host: process.env.NODE_ENV ? 'nightcat.win' : 'localhost:8080',
	
	/*  端口信息  */
    port: 80,
    dev_port: 8080,

    /*  mongodb 配置  */
    db_port: 27017,
    db_host: 'localhost',
    db: 'admin',

    /*  网站信息  */
	name: 'NightCat',
	description: 'A site',

	/*  加密用字段  */
	session_secret: 'yemiaomiao',
	
	/*  发送邮箱设置  */
	mail_opts: {
		host: 'smtp.126.com',
		port: 25,
		auth: {
			user: 'nightcatsama@126.com',
			pass: 'qq642163903'
		},
		ignoreTLS: true,
	}
}