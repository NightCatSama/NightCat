/* GraphQl 身份 */
const getRootValue = async(req) => {
  let access_token = req.header.access_token
  let is_login = false

  if (!access_token) {
    return {
      is_login,
      data: null
    }
  }

  let data = null

  await User.getUserByAccessToken(accessToken)
    .then((user) => {
      if (user) {
        is_login = true
        data = user
      }
    })

  return {
    is_login,
    data
  }
}

export {
  getRootValue
}