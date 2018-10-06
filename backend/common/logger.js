import config from '../../config'
import log4js from 'log4js'

log4js.configure({
  appenders: {
    console: { type: 'console'},
    cheeseLogs: {
      type: 'file',
      filename: 'logs/cheese.log',
      category: 'cheese'
    }
  },
  categories: {
    default: { appenders: ['console', 'cheeseLogs'], level: 'info' }
  }
});

const logger = log4js.getLogger('cheese');

export default logger
