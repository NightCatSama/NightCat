<template>
  <div :class="wrap_class">
    <div class="account-info">
      <template v-if="user">
        <img :src="user.avatar" alt="avatar">
        <h1>{{ user.account }}</h1>
      </template>
      <template>
        <div class="avatar avatar-placeholder">404</div>
        <div class="user-info">
          User: <span class="red">Undefined</span>
          <div class="login-group">
            <router-link>Login</router-link>
            <span>Github 快速登录</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  const prefixCls = 'cat-sidebar'
  import { getClass } from '@/assets/tools'

  export default {
    name: 'Sidebar',
    props: {
      user: Object
    },
    data () {
      return {
        show: false
      }
    },
    computed: {
      wrap_class () {
        return getClass(prefixCls, [
          '',
          {
            open: this.show
          }
        ])
      }
    },
    methods: {
      logout () {
        this.$graphql.mutation(`
          logout {
            name
          }
        `)
        .then((res) => {
          this.$toast('退出成功', 'success')
          this.$refs.popover.close()
          this.$store.commit('logout')
        })
      },
      login () {
        this.$router.replace({
          name: 'Admin-Login'
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/index';

  $prefixCls: cat-sidebar;
  $width: 280px;

  .#{$prefixCls} {
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: $width;
    height: 100vh;
    background-color: $grey;
    box-shadow: 0 5px 15px 2px rgba(0, 0, 0, .16);
    transition: transform .5s;

    .account-info {
      display: flex;
      align-items: center;
      width: 100%;
      height: 120px;
      font-size: 13px;
      padding: 10px 20px;
      background-color: $white;

      .avatar {
        height: 64px;
        width: 64px;
        border-radius: 3px;
        background-color: $grey2;

        &-placeholder {
          color: $white;
          @include flex-center;
        }
      }

      .user-info {
        margin-left: 10px;
      }

      .login-group {
        margin-top: 10px;

        button {
          padding: 3px 5px;
        }
      }

      .red {
        color: $red;
      }
    }
  }
</style>
