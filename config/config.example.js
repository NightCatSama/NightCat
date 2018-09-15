module.exports = {
  debug: true,

  /*  网站信息  */
  name: 'NightCat',
  description: 'A site',

  // 文章默认封面图
  defaultCover: 'https://my-house.pek3b.qingstor.com/500_300.jpg',

  /*  端口信息  */
  // 后台服务器端口
  port: 3000,
  // 前台开发环境中的webpack server端口
  dev_port: 2333,

  /*  mongodb 配置  */
  // mongodb://username:password@hosts/db_name
  mongodb: {
    url: 'mongodb://localhost/admin',
    debug: true,
  },

  /*  加密用字段  */
  session_secret: 'modify-it',

  /*  发送邮箱设置  */
  mail_opts: {
    host: 'smtp.126.com',
    port: 25,
    auth: {
      user: '***@126.com',
      pass: '******'
    }
  },

  /*  github 配置  */
  github: {
    clientId: 'f34a0e50609f8dc19f8b',
    clientSecret: '4de9dc2c0c03ee1e5c603e58963662f83cc2c048'
  },

  /*青云对象存储 */
  qingstor: {
    access_id: '***',
    access_key: '***',
    location: 'pek3b',
    bucket_name: 'blog',
  },
}
