import Input from './Form/Input.vue'

import Icon from './Common/Icon.vue'
import Btn from './Common/Btn.vue'

import Toast from './View/Toast'

const install = (Vue) => {
  Vue.component(Input.name, Input)

  Vue.component(Icon.name, Icon)
  Vue.component(Btn.name, Btn)

  Vue.use(Toast)
}

export default install
