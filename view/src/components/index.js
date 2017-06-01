import Input from './Form/Input.vue'

import Icon from './Common/Icon.vue'
import Btn from './Common/Btn.vue'

import Toast from './View/Toast'
import Popover from './View/Popover'

const install = (Vue) => {
  Vue.component(Input.name, Input)

  Vue.component(Icon.name, Icon)
  Vue.component(Btn.name, Btn)

  Vue.use(Toast)
  Vue.use(Popover)
}

export default install
