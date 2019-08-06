import config from '../config'
import log4js from 'log4js'

log4js.configure({
  appenders: [{
    type: 'console'
  }, {
    type: 'file',
    filename: 'logs/cheese.log',
    category: 'cheese'
  }]
});

var logger = log4js.getLogger('cheese');
logger.setLevel(config.debug ? 'DEBUG' : 'ERROR')

export default logger