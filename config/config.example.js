module.exports = {
  debug: true,
  protocol: 'http',
  host: 'localhost:3000',

  /*  端口信息  */
  port: 3000,
  dev_port: 2333,

  /*  mongodb 配置  */
  // mongodb://username:password@hosts/db_name
  mongodb: {
    url: 'mongodb://admin:secret@mongo/admin',
    debug: true,
  },

  /*  网站信息  */
  name: 'NightCat',
  description: 'A site',
  // 文章默认封面图
  defaultCover: 'https://my-house.pek3b.qingstor.com/500_300.jpg',

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
    clientId: '**',
    clientSecret: '**********'
  },

  /* 青云对象存储，用于图片上传 */
  qingstor: {
    access_id: 'TAPGMARURFICDAGMCOTV',
    access_key: '****',
    location: 'pek3b',
    bucket_name: 'hexo-blog',
  },
};
