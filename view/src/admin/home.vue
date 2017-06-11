<template>
  <div class="admin-home">
    <AdminHeader :user="user"></AdminHeader>
    <main>
      <nav class="nav">
        <router-link class="radius-btn" to="/admin/user">
          <Icon name="user" :size="24"></Icon>
        </router-link>
        <router-link class="radius-btn" to="/admin/article">
          <Icon name="book" :size="24"></Icon>
        </router-link>
        <router-link class="radius-btn" to="/admin/tag">
          <Icon name="tag" :size="24"></Icon>
        </router-link>
      </nav>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import AdminHeader from '@/components/Admin/Header'
  export default {
    name: 'admin-home',
    components: {
      AdminHeader
    },
    data () {
      return {
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    }
  }
</script>

<style lang="scss">
  @import '../style/index';

  .admin-home {
    display: flex;
    flex-direction: column;
    height: 100vh;

    main {
      flex: 1;
      display: flex;
    }

    nav {
      margin: 20px;
    }

    .radius-btn {
      width: 50px;
      height: 50px;
      @include flex-center;
      border-radius: 50%;
      opacity: .6;
      background-color: $grey2;
      color: $white;
      text-decoration: none;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all .3s;

      &:hover {
        opacity: 1;
      }

      &.blue {
        background-color: $blue;
      }

      &.red {
        background-color: $red;
      }

      &.green {
        background-color: $green;
      }

      &.yellow {
        background-color: $yellow;
      }

      &.router-link-active {
        opacity: 1;
        background-color: $grey;
      }
    }

    .sidebar {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      width: 300px;
      background-color: $white;
      box-shadow: $shadow;

      .next-btn {
        border: none;
        border-radius: 0;
        background-color: $grey4;
        color: $font1;
        height: 44px;
      }
    }

    .admin-main {
      position: relative;
      flex: 1;
      display: flex;
      background-color: $white;
      margin-right: 20px;
      padding: 20px;
      box-shadow: $shadow;
      font-size: 14px;
    }

    .aside {
      position: absolute;
      right: 100%;
      top: 300px;
      margin-right: 20px;
    }
  }
</style>
