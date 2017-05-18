<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      USERS
    </h1>
  </section>
</template>

<script>
// import axios from '~plugins/axios'

export default {
  // async asyncData () {
  //   let { data } = await axios.get('/api/users')
  //   return {
  //     users: data
  //   }
  // },
  head () {
    return {
      title: 'Users'
    }
  },
  data () {
    return {
      users: [{
        name: 'Fucker'
      }]
    }
  }
}
</script>

<style scoped>
.title
{
  margin: 30px 0;
}
.users
{
  list-style: none;
  margin: 0;
  padding: 0;
}
.user
{
  margin: 10px 0;
}
</style>
