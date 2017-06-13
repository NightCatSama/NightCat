<template>
  <transition v-if="show" name="cat-loading-fade" @after-leave="destroy">
    <div :class="component_class" :style="component_style">
      <Icon v-if="status === 'loading'" name="loading" :rotate="true"></Icon>
    </div>
  </transition>
</template>

<script>
  const prefixCls = 'cat-loading'

  export default {
    name: 'Loading',
    data () {
      return {
        show: false,
        timer: null,
        status: 'loading',
        process: 0
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          `${prefixCls}-${this.status}`
        ]
      },
      component_style () {
        return {
          width: `${this.process}%`
        }
      }
    },
    watch: {
      process (val) {
        if (val === 100) {
          setTimeout(() => {
            this.show = false
          }, 200)
        }
        return val
      }
    },
    methods: {
      start () {
        document.body.appendChild(this.$el)
        this.$nextTick(() => {
          this.show = true
          this.startLoad()
        })
      },
      startLoad () {
        this.timer = setTimeout(() => {
          this.process += 5
          if (this.process < 95) {
            this.startLoad()
          }
        }, 200)
      },
      destroy () {
        this.$destroy(true)
      }
    },
    beforeDestroy () {
      document.body.removeChild(this.$el)
    }
  }
</script>

<style lang="scss">
  @import '~style';

  @include fade('cat-loading-', 1s);

  .cat-loading {
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    transition: all .2s linear;
    z-index: 999;

    &-loading {
      background-color: $blue;
    }

    &-success {
      background-color: $green;
    }

    &-error {
      background-color: $red;
    }

    .cat-icon {
      position: fixed;
      top: 5px;
      right: 5px;
      color: $blue;
    }
  }
</style>

