<template>
  <h1>
    I'm Ready
    <Btn @click="logout">Logout</Btn>
  </h1>
</template>

<script>
  export default {
    name: 'admin-home',
    methods: {
      logout () {
        this.$http.post('/signout')
        .then((res) => {
          console.log(res)
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../style/index';

  h1 {
    margin: 20px;
  }
</style>
