<template>
  <div class="login-view">
    <div class="form-wrap">
      <!-- Login form -->
      <form v-if="type !== 'other'" @submit.prevent="submit" class="form">
        <Input
          ref="account"
          class="form-item"
          v-model="account"
          label="Account"
          :complete.sync="accountPass"
          :filter="accountFilter"
          :verify="accountIsRight"
          >
        </Input>
        <Input
          ref="password"
          class="form-item"
          v-model="password"
          type="password"
          label="Password"
          :complete.sync="pwdPass"
          :verify="passwordIsRight"
          >
        </Input>
        <Input
          v-if="type === 'register'"
          ref="repassword"
          class="form-item"
          v-model="repassword"
          type="password"
          label="Password Again"
          :complete.sync="pwdAgainPass"
          :verify="passwordIsEqual"
          >
        </Input>
        <Btn class="sign-btn" :disabled="!accountPass || !pwdPass" type="submit">{{ type.toLocaleUpperCase() }}</Btn>
      </form>

      <!-- Other -->
      <div v-if="type === 'other'" class="form">
        <Btn class="sign-btn" @click="loginByGithub">Github</Btn>
      </div>

      <!-- 导航 -->
      <ul class="type-nav">
        <li :class="{ active: type === 'login' }" @click="type = 'login'">Login</li>
        <li :class="{ active: type === 'register' }" @click="type = 'register'">Register</li>
        <li :class="{ active: type === 'other' }" @click="type = 'other'">Other</li>
      </ul>
    </div>
  </div>
</template>

<script>
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isByteLength from 'validator/lib/isByteLength'
import config from '@/config'

export default {
  name: 'admin-login',
  data () {
    return {
      account: '',
      password: '',
      repassword: '',
      accountPass: false,
      pwdPass: false,
      pwdAgainPass: false,
      type: this.$route.name === 'Admin-Register' ? 'register' : 'login'
    }
  },
  watch: {
    type (val) {
      if (val === 'register') {
        this.$router.push({
          name: 'Admin-Register'
        })
      }
      else {
        this.$router.push({
          name: 'Admin-Login'
        })
      }
    }
  },
  methods: {
    // 限制账号输入
    accountFilter (val) {
      val = val.replace(/[^0-9a-zA-Z]/ig, '')
      val = val.length > 20 ? val.slice(0, 20) : val
      return val
    },
    // 验证账号是否正确
    accountIsRight (val, vm) {
      vm.status = val.length >= 6 ? 'normal' : 'error'
      vm.process = val.length / 6 * 100

      return isByteLength(val, { min: 6, max: 20 }) && isAlphanumeric(val)
    },
    // 验证密码是否正确
    passwordIsRight (val, vm) {
      vm.status = val.length >= 6 ? 'normal' : 'error'
      vm.process = val.length / 6 * 100

      this.type === 'register' && this.$nextTick(() => this.$refs.repassword.is_complete())
      return isByteLength(val, { min: 6 }) && isAlphanumeric(val)
    },
    // 验证两次密码是否相等
    passwordIsEqual (val, vm) {
      vm.status = val === this.password ? 'normal' : 'error'
      vm.process = val ? 100 : 0

      return val === this.password
    },
    // 提交表单
    submit () {
      this[this.type]()
    },
    // 登录
    login () {
      this.$graphql.mutation(`
        login (account: "${this.account}", password: "${this.password}") {
          account,
          admin,
          avatar
        }
      `)
      .then((res) => {
        if (!res.admin) return this.$toast('非管理员身份', 'error')

        this.$store.commit('setSignStatus', res)

        this.$toast('登录成功', {
          type: 'success',
          callback: () => {
            this.$router.replace({
              name: 'Admin-Home'
            })
          }
        })
      })
      .catch((err) => this.$toast(err.message, 'error'))
    },
    // 注册
    register () {
      this.$graphql.mutation(`
        register (account: "${this.account}", password: "${this.password}", repassword: "${this.repassword}") {
          account,
          admin,
          avatar
        }
      `)
      .then((res) => {
        if (!res.admin) return this.$toast('非管理员身份', 'error')

        this.$store.commit('setSignStatus', res)

        this.$toast('注册成功', {
          type: 'success',
          callback: () => {
            this.$router.replace({
              name: 'Admin-Home'
            })
          }
        })
      })
      .catch((err) => {
        this.$toast(err.message, 'error')
      })
    },
    // 通过 github 登录
    loginByGithub () {
      window.location = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&state=admin&scope=user`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/index';

  .login-view {
    height: 100vh;
    @include flex-center;
  }

  .form-wrap {
    position: relative;
    width: 400px;
    height: 300px
  }

  .form {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: $white;
    box-shadow: $paper-shadow;
    @include flex-center(flex, column);
    transition: all 3s;

    .form-item {
      margin-bottom: 10px;
    }

    .sign-btn {
      margin-top: 20px;
      width: 50%;
    }
  }

  .type-nav {
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 100%;
    top: 0;
    height: 50%;
    color: $font1;
    font-size: 14px;
    transform: translateX(20px);
    transition: all .3s;

    li {
      padding: 3px 5px;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        color: $font;
      }

      &.active {
        color: $blue;
      }
    }
  }
</style>
