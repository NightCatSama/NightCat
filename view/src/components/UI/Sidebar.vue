<template>
  <div :class="wrap_class">
    <div class="account-info">
      <template v-if="user">
        <img :src="user.avatar" alt="avatar" class="avatar">
        <div class="user-info">
          <span class="account">{{ user.account }}</span>
          <div class="login-group">
            <router-link to="/user" @click.native="close">个人信息</router-link>
            /
            <a href="javascript:;" @click="logout" class="logout-btn">退出登录</a>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="avatar avatar-placeholder">404</div>
        <div class="user-info">
          登录后方可评论
          <div class="login-group">
            <router-link to="/login">登录</router-link>
            /
            <router-link to="/register">注册</router-link>
          </div>
        </div>
      </template>
    </div>
    <nav class="nav">
      <router-link to="/article" @click.native="close">文章</router-link>
      <router-link to="/links" @click.native="close">友链</router-link>
      <router-link to="/about" @click.native="close">关于</router-link>
      <router-link to="/admin" @click.native="close">管理</router-link>
      <a href="/graphql">GraphQL</a>
    </nav>
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
            account
          }
        `)
        .then((res) => {
          this.$toast('退出成功', 'success')
          this.$store.commit('logout')
        })
      },
      login () {
        this.$router.replace({
          name: 'Admin-Login'
        })
      },
      close () {
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/index';

  $prefixCls: cat-sidebar;
  $width: 280px;

  .#{$prefixCls} {
    display: flex;
    flex-direction: column;
    width: $width;
    background-color: $grey;
    box-shadow: 0 5px 15px 2px rgba(0, 0, 0, .16);

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
          cursor: default;
          user-select: none;
        }
      }

      .user-info {
        margin-left: 10px;
      }

      .login-group {
        margin-top: 10px;

        .logout-btn {
          color: $font2;
        }
      }

      .account {
        font-size: 14px;
      }
    }

    .nav {
      margin-top: 100px;
      padding-right: 80px;
      text-align: right;
      color: $white;

      a {
        position: relative;
        color: $white;
        font-size: 20px;
        display: block;
        text-decoration: none;
        margin-bottom: 60px;
        transition: all .3s;

        &::after {
          content: '';
          position: absolute;
          right: -20px;
          top: -10px;
          height: 60px;
          width: 1px;
          background-color: $white;
          transform: rotate(45deg);
          transition: all .3s;
        }

        &:hover {
          color: $blue;

          &::after {
            background-color: $blue;
          }
        }

        &.router-link-active {
          color: $roseate;

          &::after {
            background-color: $roseate;
          }
        }
      }
    }
  }
</style>
