import Popover from './Popover.vue'

const install = (Vue) => {
  Vue.directive('popover', {
    bind (el, binding, vnode) {
      let $target = vnode.context.$refs[binding.arg]
      $target.$refs.reference = el
    }
  })
  Vue.component(Popover.name, Popover)
}

export default {
  install,
  Popover
}
