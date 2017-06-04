<template>
  <!--删除模态框-->
  <Modal v-model="show" class-name="cat-prompy" @hide="remove">
    <div>{{ msg }}</div>
    <Btn @click="checked">确定</Btn>
  </Modal>
</template>

<script>
  import Modal from './Modal'
  import { on, off } from '@/assets/tools'

  export default {
    name: 'Prompt',
    components: {
      Modal
    },
    data () {
      return {
        show: false,
        msg: '',
        cb: null
      }
    },
    methods: {
      remove () {
        document.body.removeChild(this.$el)
      },
      checked () {
        this.show = false
        this.cb && this.cb()
      },
      handleEnter (e) {
        if (e.keyCode === 13) {
          this.checked()
        }
      }
    },
    mounted () {
      on(document, 'keyup', this.handleEnter)
      document.body.appendChild(this.$el)
    },
    destroyed () {
      off(document, 'keyup', this.handleEnter)
      this.remove()
    }
  }
</script>

<style lang="scss">
 .cat-prompy {
   padding: 20px;
   border-radius: 8px;
   text-align: center;

   button {
     margin-top: 20px;
     width: 80%;
   }
 }
</style>
