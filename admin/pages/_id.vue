<template>
  <section class="container">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      {{ title }}
    </h1>
    <nuxt-link class="button" to="/">
      Users
    </nuxt-link>
  </section>
</template>

<script>
// import axios from '~plugins/axios'

export default {
  name: 'id',
  // asyncData ({ params, error }) {
  //   return axios.get('/api/users/' + params.id)
  //   .then((res) => {
  //     return { user: res.data }
  //   })
  //   .catch((e) => {
  //     error({ statusCode: 404, message: 'User not found' })
  //   })
  // },
  data () {
    return {
      a: 'ha'
    }
  },
  computed: {
    title () {
      return `${this.a} nima`
    }
  },
  head () {
    return {
      title: `User: Fuck`
    }
  }
}
</script>

<style scoped>
.title
{
  margin-top: 30px;
}
.info
{
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button
{
  margin-top: 30px;
}
</style>
