import User from './user'
import logger from '../common/logger'

/*  根据 account 设置五子棋数据  */
export const setGobangData = async(account, isWin) => {
  return await User.getUserByAccount(account)
      .then((user) => {
        if (!user) {
          return logger.error('修改五子棋数据时找不到用户')
        }
        if (!user.gameData) {
          user.gameData = {
            all_count: 1,
            win_count: isWin ? 1 : 0,
            winRate: isWin ? 100 : 0
          }
        }
        else {
          let all_count = (user.gameData.all_count || 0) + 1
          let win_count = (user.gameData.win_count || 0) + (isWin ? 1 : 0)
          user.gameData = Object.assign(user.gameData, {
            all_count,
            win_count,
            winRate: ~~((win_count / all_count) * 100)
          })
        }
        return user.save()
      })
      .then((data) => {
        if (!data) {
          return logger.error('修改五子棋数据失败')
        }
        return data
      })
      .catch(err => logger.error('修改五子棋数据时，服务器发生错误', err))
}
