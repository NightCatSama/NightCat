<template>
  <i :class="component_class" :style="size_style"></i>
</template>

<script>
  const prefixCls = 'cat-icon'
  import { getClass } from '@/assets/tools'

  export default {
    name: 'Icon',
    props: {
      size: Number,
      name: {
        type: String,
        required: true
      },
      color: {
        default: '',
        type: String
      },
      rotate: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
      }
    },
    computed: {
      component_class () {
        return getClass(prefixCls, [
          '',
          {
            [`${prefixCls}-rotate`]: this.rotate
          }
        ]).concat([
          'iconfont',
          `icon-${this.name}`
        ])
      },
      size_style () {
        return {
          fontSize: this.size ? `${this.size}px` : '',
          color: this.color || ''
        }
      }
    }
  }
</script>


<style lang="scss">
  .cat-icon {
    position: relative;
    display: inline-block;
    vertical-align: baseline;

    svg {
      display: block;
    }

    &-rotate {
      animation: rotate 1s infinite linear;
    }
  }


  @keyframes rotate {
    form {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
