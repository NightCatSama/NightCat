<template>
  <div class="admin-user">
    <ul class="user-list">
      <li v-for="(user, i) in list" :class="{ active: active === i}" @click="active = i">
        <img :src="user.avatar" alt="avatar" />
        <div class="account">
          {{ user.account }}
        </div>
      </li>
    </ul>
    <div class="user-info">
      {{ active }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Admin-User',
    props: {
    },
    data () {
      return {
        list: [],
        active: 0
      }
    },
    computed: {
    },
    mounted () {
      this.$graphql.query(`
        users {
          account,
          name,
          email,
          avatar
        }
      `)
      .then((res) => {
        this.list = res
      })
      .catch((err) => this.$toast(err.message, 'error'))
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/index';

  .admin-user {
    flex: 1;
    margin: 20px 0;
    display: flex;

    .user-list {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      width: 300px;
      background-color: $white;

      li {
        height: 120px;
        @include flex-cross-center;
        padding: 20px;
        border-bottom: 1px solid #eee;
        cursor: pointer;

        img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-right: 20px;
        }

        &.active {
          background-color: $green_l3;
          color: $white;
        }
      }
    }

    .user-info {
      flex: 1;
      background-color: $white;
      @include flex-center;
      margin-right: 20px;
    }
  }
</style>
