export const state = {
  signin_time: null,
  is_login: false,
  user: null
}

export const mutations = {
  setSignStatus (state, { account, avatar }) {
    state.user = {
      account,
      avatar
    }
    state.is_login = true
    state.signin_time = new Date()
  },
  updateAvatar (state, avatar) {
    state.user = {
      account: state.user.account,
      avatar
    }
  },
  logout (state) {
    state.user = null
    state.is_login = false
  }
}
