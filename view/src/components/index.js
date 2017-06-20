import Input from './Form/Input.vue'

import Icon from './Common/Icon.vue'
import Btn from './Common/Btn.vue'

import Toast from './View/Toast'
import Popover from './View/Popover'
import Prompt from './View/Prompt'
import Modal from './View/Modal'
import Loading from './View/Loading'
import Loadmore from './View/Loadmore'

import Sidebar from './UI/Sidebar'

const install = (Vue) => {
  Vue.component(Input.name, Input)

  Vue.component(Icon.name, Icon)
  Vue.component(Btn.name, Btn)
  Vue.component(Modal.name, Modal)
  Vue.component(Loadmore.name, Loadmore)

  Vue.component(Sidebar.name, Sidebar)

  Vue.use(Toast)
  Vue.use(Popover)
  Vue.use(Prompt)
  Vue.use(Loading)
}

export default install
