import Toast from './Toast.vue'

//  单例模式
let vm

const install = (Vue) => {
  let Component = Vue.extend(Toast)

  Vue.prototype.$toast = (content, option) => {
    let data = {
      content
    }

    if (vm) {
      vm.$destroy(true)
    }

    if (typeof option === 'string') {
      data.type = option
    } else {
      Object.assign(data, option)
    }

    let instance = new Component({
      data
    })

    vm = instance.$mount()
    vm.show = true

    return new Promise((resolve) => {
      vm.$on('destroyed', () => {
        vm = null
        resolve()
      })
    })
  }
}

export default {
  install,
  Toast
}
