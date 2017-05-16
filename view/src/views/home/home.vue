<template>
  <div class="home-view">
    <canvas id="bg_canvas"></canvas>
    <aside class="source_link">
      <a href="https://github.com/NightCatSama/My-Animat/blob/master/bead/src/javascripts/canvas.js" target="_blank">source code</a>
    </aside>
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

    #bg_canvas {
      width: 100%;
      height: 100%;
    }
    
    .source_link {
      position: absolute;
      right: 8px;
      bottom: 8px;
      font-size: 14px;
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
