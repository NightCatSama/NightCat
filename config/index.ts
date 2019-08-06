import configProd from './config.prod'
import configDev from './config.dev'

let config: Config;
if (process.env.NODE_ENV === 'production') {
  config = configProd
} else {
  config = configDev
}

export default config
