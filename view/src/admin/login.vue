<template>
  <div class="login-view">
    <Input v-model="val"></Input>
  </div>
</template>

<style lang="scss" scoped>
  @import '../style/index';

  .login-view {
    height: 100vh;
    @include flex-center;
  }
</style>

<script>
export default {
  name: 'admin-login',
  data () {
    return {
      val: 'abc'
    }
  }
}
</script>
