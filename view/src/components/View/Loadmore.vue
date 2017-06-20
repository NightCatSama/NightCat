<template>
  <div :class="component_class">
    <div :class="content_class" ref="content">
      <slot :loadmore="loadmore"></slot>
    </div>
    <div :class="status_class">
      <slot v-if="status === 'loading'" name="loading" :loadmore="loadmore">
        <div>
          <Icon name="loading" :rotate="true"></Icon>
          加载中....
        </div>
      </slot>
      <slot v-if="status === 'loadmore'" name="loadmore" :loadmore="loadmore">
        <Btn @click.native="loadmore">点击加载更多</Btn>
      </slot>
      <slot v-if="status === 'error'" name="error" :loadmore="loadmore">
        <Btn @click.native="loadmore">{{ error_msg }} 点击重试</Btn>
      </slot>
    </div>
  </div>
</template>

<script>
  const prefixCls = 'cat-loadmore'

  export default {
    name: 'Loadmore',
    props: {
      offset: {
        default: 300,
        type: Number
      },
      interval: {
        default: 3,
        type: Number
      },
      done: {
        default: false,
        type: Boolean
      },
      real_time: {
        default: false,
        type: Boolean
      }
    },
    data () {
      return {
        status: 'normal',
        error_msg: '加载失败',
        loadmore_scrollTop: 0,
        current_loaded: 0,
        scrollTop: 0
      }
    },
    computed: {
      component_class () {
        return [
          prefixCls
        ]
      },
      content_class () {
        return [
          `${prefixCls}-content`
        ]
      },
      status_class () {
        return [
          `${prefixCls}-status`
        ]
      }
    },
    watch: {
      scrollTop (val) {
        this.real_time && this.getLoadmoreTop()
        if (!this.done && this.status === 'normal' && val >= this.loadmore_scrollTop) {
          this.loadmore()
        }
      }
    },
    methods: {
      init () {
        this.bindEvent()
        this.getLoadmoreTop()
      },
      loadmore () {
        if (this.current_loaded >= this.interval) {
          this.current_loaded %= this.interval
          this.status = 'loadmore'
          return false
        }

        this.status = 'loading'
        this.$emit('load-method', this.next, this.error)
      },
      next () {
        this.$nextTick(() => {
          this.current_loaded += 1
          this.status = 'normal'
          this.getLoadmoreTop()
        })
      },
      error (msg) {
        this.error_msg = msg
        this.status = 'error'
      },
      getLoadmoreTop () {
        let { content } = this.$refs

        this.loadmore_scrollTop = content.offsetHeight + this.getOffsetTop(content) - this.offset - document.documentElement.clientHeight
      },
      getOffsetTop (elem) {
        var clientTop
        var scrollTop
        var doc = document.documentElement
        var body = document.body
        var top = elem.getBoundingClientRect().top

        clientTop = doc.clientTop || body.clientTop || 0
        scrollTop = window.pageYOffset || doc.scrollTop

        return (top + scrollTop - clientTop)
      },
      bindEvent () {
        document.addEventListener('scroll', this.scroll, false)
      },
      unbindEvent () {
        document.removeEventListener('scroll', this.scroll, false)
      },
      scroll () {
        this.scrollTop = window.pageYOffset || (document.documentElement.scrollTop + document.body.scrollTop)
      },
      reset () {
        this.current_loaded = 0
        this.scrollTop = 0
        this.status = 'normal'
        this.getLoadmoreTop()
      }
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
      this.unbindEvent()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .cat-loadmore {
    &-status {
      text-align: center;
      margin: 20px 0;
    }
  }
</style>
