<template>
  <div class="user-view">
    user
  </div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
      }
    },
    methods: {
      getUser () {
        console.log(this.$route.params.id)
      }
    },
    mounted () {
      this.getUser()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .user-view {
    height: 100vh;
    @include flex-center;
    overflow: hidden;
  }
</style>
