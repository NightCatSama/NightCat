<template>
  <div class="home-view">
    <canvas id="bg_canvas"></canvas>
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

<style lang="scss">
  @import '../../style/index';

  .home-view {
    height: 100vh;
    @include flex-center;
  }

  #bg_canvas {
    width: 100%;
    height: 100%;
  }
</style>
