<template>
  <header :class="wrap_class">
    <div class="logo">
      NightCat 后台管理
    </div>
    <Popover ref="popover" trigger="hover" placement="bottom-right" :offset="20">
      <div class="logout-btn" @click="logout">退出登录</div>
    </Popover>
    <div class="right-group">
      <div v-if="user" class="user-group" v-popover:popover>
        <div>{{ user.account }}</div>
        <img :src="user.avatar" alt="avatar" />
      </div>
      <div v-else>
        <router-link to="/Admin/login">点击登录</router-link>
      </div>
    </div>
  </header>
</template>

<script>
  const prefixCls = 'cat-admin-header'
  import { getClass } from '@/assets/tools'

  export default {
    name: 'Header',
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
          ''
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../style/index';

  $prefixCls: cat-admin-header;

  .#{$prefixCls} {
    height: 60px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background-color: $grey;
    color: $white;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 4px 5px 0 rgba(0, 0, 0, 0.06), 0 1px 10px 0 rgba(0, 0, 0, 0.08);

    .logo {
      font-size: 18px;
    }

    .right-group {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }

    .user-group {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
      cursor: pointer;
      font-size: 14px;

      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-left: 10px;
      }
    }
  }

  .logout-btn {
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: all .3s;

    &:hover {
      color: $blue;
    }
  }
</style>
