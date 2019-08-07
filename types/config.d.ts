interface Config {
  debug: boolean
  protocol: string
  host: string

  /*  端口信息  */
  port: number
  dev_port: number

  /*  mongodb 配置  */
  db_port: number
  db_host: string
  db: string

  /*  网站信息  */
  name: string
  description: string

  /*  加密用字段  */
  session_secret: string

  /*  发送邮箱设置  */
  mail_opts: {
    host: string
    port: 25
    auth: {
      user: string
      pass: string
    }
  }

  /*  github 配置  */
  github: {
    clientId: string
    clientSecret: string
  }

  /*  数据库账号密码  */
  database: {
    username: string
    password: string
  }
}
