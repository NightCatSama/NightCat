<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    // this.$graphql.query('users', `
    //   name,
    //   password
    // `)
    // .then((res) => {
    //   console.log(res.data)
    // })
  }
}
</script>

<style lang="scss">
@import './style/core/index';

</style>
