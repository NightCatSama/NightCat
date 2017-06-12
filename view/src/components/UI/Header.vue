<template>
  <header :class="wrap_class">
  </header>
</template>

<script>
  const prefixCls = 'cat-header'
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
      },
      login () {
        this.$router.replace({
          name: 'Admin-Login'
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
  }

  .sign-btn {
    padding: 10px;
    cursor: pointer;
    font-size: 14px;
    transition: all .3s;

    &:hover {
      color: $blue;
    }
  }
</style>
