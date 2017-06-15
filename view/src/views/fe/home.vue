<template>
  <div class="home-view">
    <section class="canvas-bg">
      <canvas id="bg_canvas"></canvas>
      <aside class="source_link">
        <a href="https://github.com/NightCatSama/NightCat/blob/master/view/src/assets/bg_canvas.js" target="_blank">source code</a>
      </aside>
    </section>
  </div>
</template>

<script>
import Canvas from '@/assets/bg_canvas'
import { on, off } from '@/assets/tools'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {
    gotoHome () {
      this.$router.push({
        name: 'ArticleList'
      })
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Canvas('bg_canvas')
    on(document, 'keyup', this.gotoHome)
  },
  beforeDestroy () {
    off(document, 'keyup', this.gotoHome)
  }
}
</script>

<style lang="scss">
  @import '~style';

  .home-view {
    height: 100vh;
    @include flex-center;
    background-color: rgb(224, 224, 224);
    overflow: hidden;

    .canvas-bg {
      width: 100%;
      height: 100%;
    }

    #bg_canvas {
      width: 100%;
      height: 100%;
    }

    .source_link {
      position: absolute;
      right: 8px;
      bottom: 8px;
      font-size: 13px;
      z-index: 5;

      a {
        color: $blue_d3;

        &:hover {
          color: $yellow;
        }
      }
    }
  }
</style>
