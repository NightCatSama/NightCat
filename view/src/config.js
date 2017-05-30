import serverConfig from '../../config'
var config

if (process.env.NODE_ENV === 'development') {
  config = {
    debug: false,

    /*  http 配置 */
    withCredentials: true,
    host: 'http://localhost:3000',
    log_request: true,
    log_response: true,

    /* github登录 */
    github: {
      clientId: serverConfig.github.clientId
    },

    /*  socket.io  */
    socket_host: 'http://localhost:3000'
  }
}
else {
  config = {
    debug: true,

    /*  http 配置 */
    host: '',
    withCredentials: false,

    /* github登录 */
    github: {
      clientId: 'f34a0e50609f8dc19f8b'
    },

    /*  socket.io  */
    socket_host: 'https://nightcat.win'
  }
}

export default config
