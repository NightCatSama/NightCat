<template>
  <transition name="bounce-center" @after-leave="afterLeave">
    <div v-if="show" :class="component_class">
      <Icon v-if="show_icon" :name="iconType[type]" :size="16"></Icon>
      <div class="cat-toast-content">{{ content }}</div>
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
        time: 200000,
        type: '',
        callback: null,
        iconType: {
          'default': 'info-circle',
          'primary': 'info-circle',
          'success': 'check-circle',
          'error': 'close-circle',
          'warning': 'exclamation-circle'
        },
        show_icon: {
          type: Boolean,
          default: true
        }
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          {
            [`${prefixCls}-${this.type}`]: this.type,
            [`${prefixCls}-show_icon`]: this.show_icon
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
    border-radius: 3px;
    color: $white;
    letter-spacing: -.2em;
    box-shadow: $near_shadow;
    overflow: hidden;
    z-index: 99999;

    .cat-toast-content {
      display: inline-block;
      padding: 8px 15px;
      letter-spacing: 0;
    }

    .cat-icon {
      display: inline-block;
      color: #fff;
      height: 100%;
      margin-left: 10px;
    }

    &-default {
      background-color: #666;
    }

    &-primary {
      background-color: $blue;
    }

    &-error {
      background-color: $red;
    }

    &-warning {
      color: #333;
      background-color: $yellow;
    }

    &-success {
      background-color: $green;
    }
  }
</style>
