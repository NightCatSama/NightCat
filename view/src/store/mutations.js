export const state = {
  access_token: '',
  signin_time: null,
  is_login: false,
  user_info: null
}

export const mutations = {
  setSignState (state, payload) {
    state.access_token = payload.access_token
    state.user_info = payload.user_info
    state.is_login = true
    state.signin_time = new Date()
  }
}
