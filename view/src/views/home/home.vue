<template>
  <div class="home-view">
    <section class="canvas-bg">
      <canvas id="bg_canvas"></canvas>
      <aside class="source_link">
        <a href="https://github.com/NightCatSama/NightCat/blob/master/view/src/views/home/bg_canvas.js" target="_blank">source code</a>
      </aside>
    </section>
  </div>
</template>

<script>
import Canvas from './bg_canvas'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  mounted () {
    /* eslint-disable no-new */
    new Canvas('bg_canvas')
  }
}
</script>

<style lang="scss" scoped>
  @import '../../style/index';

  .home-view {
    height: 100vh;
    @include flex-center;
    background-color: rgb(52, 52, 52);
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
