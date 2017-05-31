<template>
  <div class="admin-home">
    <ul>
      <li v-for="obj in list">
        <img :src="obj.avatar" alt="avatar" />
        {{ obj.name }}
        {{ obj.account }}
        {{ obj.email }}
        {{ obj.password }}
      </li>
    </ul>
    <Btn @click="logout">Logout</Btn>
  </div>
</template>

<script>
  export default {
    name: 'admin-home',
    data () {
      return {
        list: []
      }
    },
    methods: {
      logout () {
        this.$http.post('/signout')
        .then((res) => {
          console.log(res)
        })
      }
    },
    mounted () {
      this.$graphql.query('users', `
        name,
        account,
        email,
        password,
        avatar
      `)
      .then((res) => {
        this.list = res
      })
      .catch((err) => this.$toast(err.message, 'error'))
    }
  }
</script>

<style lang="scss">
  @import '../style/index';

  .admin-home {
    padding: 20px;
  }

  ul {

    img {
      width: 80px;
    }
  }
</style>
