<template>
  <div class="placeholder-view">
    placeholder
  </div>
</template>

<script>
  export default {
    name: 'placeholder',
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .placeholder-view {
    height: 100vh;
    @include flex-center;
    overflow: hidden;
  }
</style>
