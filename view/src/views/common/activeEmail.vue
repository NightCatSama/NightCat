<template>
  <div class="active-email-view">
  </div>
</template>

<script>
  export default {
    name: 'active-email',
    data () {
      return {
      }
    },
    methods: {
      activeEmail () {
        let { account, key } = this.$route.query

        this.$http.post('/activeEmail', {
          email: account,
          key: key
        })
        .then((res) => {
          this.$store.commit('setSignStatus', res.data)

          if (res.message === '注册成功') {
            this.$toast('注册成功', {
              type: 'success',
              callback: () => this.$router.replace('/setPassword')
            })
          }
          else {
            this.$toast('激活成功', {
              type: 'success',
              callback: () => this.$router.replace('/')
            })
          }
        })
        .catch((err) => {
          this.$toast(err.message, {
            type: 'error',
            callback: this.gobackHome
          })
        })
      },
      gobackHome () {
        this.$toast('3秒后返回首页', {
          type: 'error',
          time: 3000,
          callback: () => this.$router.replace('/')
        })
      }
    },
    mounted () {
      this.activeEmail()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .active-email-view {
    height: 100vh;
    @include flex-center;
    overflow: hidden;
  }
</style>
