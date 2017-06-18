import { User } from '../proxy'

/*  GraphQl 身份  */
const getRootValue = async(req) => {
  let access_token = req.session.token
  let root = {}

  if (access_token) {
    root.user = await User.getUserByAccessToken(access_token)
  }

  return root
}

export {
  getRootValue
}