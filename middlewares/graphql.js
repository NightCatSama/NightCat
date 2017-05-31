import { User } from '../proxy'

/*  GraphQl 身份  */
const getRootValue = async(req) => {
  let access_token = req.session.token
  let is_login = false

  if (!access_token) {
    return null
  }

  return await User.getUserByAccessToken(access_token)
}

export {
  getRootValue
}