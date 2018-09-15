// import serverConfig from '../../config';
let config;

if (process.env.NODE_ENV === 'development') {
  config = {
    debug: true,

    /*  http 配置 */
    withCredentials: true,
    host: 'http://localhost:3000',

    /* github登录 */
    github: {
      clientId: 'f34a0e50609f8dc19f8b'
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
      clientId: 'f34a0e50609f8dc19f8b'
    },

  }
}

export default config
