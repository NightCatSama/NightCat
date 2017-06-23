export default class Online {
  constructor() {
    this.count = 0
    this.user = {}
  }
  connect(account) {
    if (this.user[account]) {
      this.user[account]++
    }
    else {
      this.user[account] = 1
      this.count++
    }
  }
  disconnect(account) {
    if (this.user[account] > 1) {
      this.user[account]--
    }
    else {
      delete this.user[account]
      this.count--
    }
  }
}