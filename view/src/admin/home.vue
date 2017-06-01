<template>
  <div class="admin-home">
    <AdminHeader :user="user"></AdminHeader>
    <main>
      <nav class="nav">
        <Popover ref="popover" trigger="hover" placement="right" :show_arrow="false" :use_shadow="false" class-name="nav-popover">
          <div>用户管理</div>
          <router-link to="/admin/user" slot="reference">
            <Icon name="user" :size="24"></Icon>
          </router-link>
        </Popover>
        <Popover ref="popover" trigger="hover" placement="right" :show_arrow="false" :use_shadow="false" class-name="nav-popover">
          <div>文章管理</div>
          <router-link to="/admin/book" slot="reference">
            <Icon name="book" :size="24"></Icon>
          </router-link>
        </Popover>
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

<style lang="scss" scoped>
  @import '../style/index';

  .admin-home {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    main {
      flex: 1;
      display: flex;
    }

    nav {
      margin: 20px;

      a {
        width: 50px;
        height: 50px;
        @include flex-center;
        border-radius: 50%;
        opacity: .6;
        background-color: $grey2;
        color: $white;
        text-decoration: none;
        margin-bottom: 10px;
        transition: all .3s;

        &:hover {
          opacity: 1;
        }

        &.router-link-active {
          opacity: 1;
          background-color: $grey;
        }
      }
    }
  }

  .nav-popover {
    padding: 5px;
    min-width: auto;
    width: auto;
    font-size: 14px;
    background-color: $grey2;
    color: $white;
  }
</style>
