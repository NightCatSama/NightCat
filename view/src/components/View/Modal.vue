<template>
  <transition name="cat-modal-fade" @after-leave="afterLeave">
    <div v-show="modal_show" v-if="isExist" :class="component_class" :style="component_style">
      <div v-if="use_mask" class="cat-modal-mask" @click="closeModal('mask')"></div>
      <transition :name="transitionName[type]">
        <div v-show="modal_show" :class="container_class">
          <Icon v-if="use_close" :class="icon_class" name="close" role="button" @click.native="closeModal()"></Icon>
          <div :class="body_class">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  import { isValid, getStyles } from '@/assets/tools'
  const prefixCls = 'cat-modal'

  export default {
    name: 'Modal',
    props: {
      show: false,
      type: {
        default: 'center',
        type: String,
        validator (val) {
          return isValid(['center', 'top', 'bottom', 'left', 'right'], val)
        }
      },
      render_type: {
        default: 'show',
        type: String,
        validator (val) {
          return isValid(['show', 'if'], val)
        }
      },
      use_close: {
        default: true,
        type: Boolean
      },
      use_mask: {
        default: true,
        type: Boolean
      },
      mask_close: {
        default: true,
        type: Boolean
      },
      prevent_scroll: {
        default: true,
        type: Boolean
      },
      use_shadow: {
        default: true,
        type: Boolean
      },
      className: String,
      z_index: [Number, String]
    },
    model: {
      prop: 'show',
      event: 'switch'
    },
    data () {
      return {
        modal_show: this.show,
        isExist: this.render_type === 'show' || this.show,
        transitionName: {
          center: 'cat-modal-bounce',
          top: 'cat-modal-slide-down',
          bottom: 'cat-modal-slide-up',
          left: 'cat-modal-slide-right',
          right: 'cat-modal-slide-left'
        }
      }
    },
    watch: {
      show (val) {
        this.isExist = true
        this.$nextTick(() => {
          this.modal_show = val
        })

        this.prevent_scroll && document.documentElement.classList[val ? 'add' : 'remove']('cat-modal-banScroll')
      }
    },
    computed: {
      component_class () {
        return [
          `${prefixCls}-wrap`,
          `${prefixCls}-wrap-${this.type}`
        ]
      },
      component_style () {
        return getStyles({
          zIndex: this.z_index
        })
      },
      container_class () {
        let classNames = [
          prefixCls,
          {
            [`${prefixCls}-hasMask`]: this.use_mask
          }
        ]
        return classNames
      },
      body_class () {
        let classNames = [
          `${prefixCls}-body`,
          {
            [`${prefixCls}-body-use_shadow`]: this.use_shadow,
            [`${this.className}`]: this.className
          }
        ]
        return classNames
      },
      icon_class () {
        return [
          `${prefixCls}-close`
        ]
      }
    },
    methods: {
      closeModal (name) {
        if (name === 'mask' && !this.mask_close) {
          return false
        }
        this.$emit('switch', false)
      },
      afterLeave () {
        this.isExist = this.render_type === 'show'
        this.$emit('hide')
      }
    },
    destroyed () {
      document.documentElement.classList.remove('cat-modal-banScroll')
    }
  }
</script>

<style lang="scss">
  @import '../../style/index';

  $time: .5s;
  @include fade('cat-modal-', $time);
  @include bounce('cat-modal-', $time);
  @include slide-down('cat-modal-', $time);
  @include slide-up('cat-modal-', $time);
  @include slide-left('cat-modal-', $time);
  @include slide-right('cat-modal-', $time);

  .cat-modal-wrap {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;

    &-center {
      justify-content: center;
      align-items: center;

      .cat-modal-close {
        right: 5px;
        top: 5px;
        font-size: 18px;
      }
    }

    &-top {
      align-items: flex-start;

      .cat-modal-body {
        width: 100vw;
      }

      .cat-modal-close {
        right: 5px;
        top: 100%;
        transform: translateY(5px);
      }
    }

    &-bottom {
      align-items: flex-end;

      .cat-modal-body {
        width: 100vw;
      }

      .cat-modal-close {
        right: 5px;
        bottom: 100%;
        transform: translateY(-5px);
      }
    }

    &-left {
      justify-content: flex-start;

      .cat-modal-body {
        height: 100vh;
      }

      .cat-modal-close {
        left: 100%;
        top: 5px;
        transform: translateX(5px);
      }
    }

    &-right {
      justify-content: flex-end;

      .cat-modal-body {
        height: 100vh;
      }

      .cat-modal-close {
        right: 100%;
        top: 5px;
        transform: translateX(-5px);
      }
    }

    &:not(&-center) .cat-modal-close {
      color: #666;
    }

    &-hasMask:not(&-center) .cat-modal-close {
      color: #fff;
    }
  }

  .cat-modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    display: table;
    z-index: 1;

    &:hover+.cat-modal .cat-modal-close {
      opacity: 1;
    }
  }

  .cat-modal {
    position: absolute;
    z-index: 2;

    .cat-modal-close {
      position: absolute;
      font-size: 18px;
      line-height: 1;
      cursor: pointer;
      opacity: .6;
    }
  }

  .cat-modal-body {
    width: 100%;
    height: 100%;
    background-color: #fff;
    min-width: 300px;
    padding: 20px;

    &-use_shadow {
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, .36);
    }
  }

  .cat-modal-banScroll {
    overflow: hidden;

    body {
      overflow: hidden;
    }
  }
</style>
