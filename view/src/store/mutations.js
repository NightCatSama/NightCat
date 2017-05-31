export const state = {
  signin_time: null,
  is_login: false,
  user_info: null
}

export const mutations = {
  setSignStatus (state, payload) {
    state.user_info = payload.user_info
    state.is_login = true
    state.signin_time = new Date()
  }
}
