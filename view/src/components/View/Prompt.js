import Prompt from './Prompt.vue'

const install = (Vue) => {
  let Component = Vue.extend(Prompt)

  Vue.prototype.$prompt = (msg, cb) => {
    let data = {
      msg,
      cb
    }

    let instance = new Component({
      data
    })

    let vm = instance.$mount()
    vm.show = true

    return vm
  }
}

export default {
  install,
  Prompt
}
