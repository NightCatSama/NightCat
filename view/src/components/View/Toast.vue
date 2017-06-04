<template>
  <transition name="bounce-center" @after-leave="afterLeave">
    <div v-if="show" :class="component_class">
      {{ content }}
    </div>
  </transition>
</template>

<script>
  const prefixCls = 'cat-toast'

  export default {
    name: 'Toast',
    data () {
      return {
        show: false,
        content: '',
        time: 2000,
        type: '',
        callback: null
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          {
            [`${prefixCls}-${this.type}`]: this.type && this.type !== 'default'
          }
        ]
      }
    },
    methods: {
      close () {
        this.show = false
      },
      afterLeave () {
        this.$destroy(true)
      }
    },
    mounted () {
      document.body.appendChild(this.$el)
      this.time && setTimeout(this.close, this.time)
    },
    beforeDestroy () {
      document.body.removeChild(this.$el)
      this.callback && this.$nextTick(() => {
        this.callback()
      })
    },
    destroyed () {
      this.$emit('destroyed')
    }
  }
</script>

<style lang="scss">
  @import '../../style/index';

  $prefixCls: cat-toast;

  .#{$prefixCls} {
    position: fixed;
    top: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 15px;
    font-size: 14px;
    color: $white;
    background-color: $blue;
    box-shadow: $paper-shadow;
    z-index: 9999;

    &-error {
      color: $white;
      background-color: $red;
    }

    &-warning {
      color: $white;
      background-color: $yellow;
    }

    &-success {
      color: $white;
      background-color: $green;
    }
  }
</style>
