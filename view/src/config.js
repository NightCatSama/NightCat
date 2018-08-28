import serverConfig from '../../config'
var config

if (process.env.NODE_ENV === 'development') {
  config = {
    debug: true,

    /*  http 配置 */
    withCredentials: true,
    host: 'http://localhost:3000',

    /* github登录 */
    github: {
      clientId: serverConfig.github.clientId
    },
  }
}
else {
  config = {
    debug: false,

    /*  http 配置 */
    host: '',
    withCredentials: false,

    /* github登录 */
    github: {
      clientId: serverConfig.github.clientId
    },

  }
}

export default config
