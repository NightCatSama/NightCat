import { User } from '../proxy'

/*  设置 GraphQl rootValue  */
export const getRootValue = async(req) => {
  let access_token = req.session.token
  let root: any = {}

  if (access_token) {
    root.user = await User.getUserByAccessToken(access_token)
  }

  return root
}
