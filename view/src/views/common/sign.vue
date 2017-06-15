<template>
  <div class="login-view">
    <div class="form-wrap">
      <!-- Login form -->
      <form v-if="type !== 'login'" @submit.prevent="submit" class="form">
        <Input
          v-if="type === 'account'"
          ref="account"
          class="form-item"
          v-model="account"
          label="Account / Email"
          :complete.sync="accountPass"
          :verify="accountOrEmailIsRight"
          >
        </Input>
        <Input
          v-if="type === 'register'"
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
        <Btn v-if="type === 'account'" class="sign-btn" :disabled="!accountPass || !pwdPass" type="submit">Login</Btn>
        <Btn v-if="type === 'register'" class="sign-btn" :disabled="!accountPass || !pwdPass || !pwdAgainPass" type="submit">Register</Btn>
        <div v-if="type === 'account'" class="other-btn" @click="type = 'login'">Other</div>
      </form>

      <!-- Other -->
      <div v-if="type === 'login'" class="form">
        <Btn class="sign-btn" @click="type = 'account'">Account</Btn>
        <Btn class="sign-btn" @click="loginByGithub">Github</Btn>
      </div>

      <!-- 导航 -->
      <ul class="type-nav">
        <li :class="{ active: type !== 'register' }" @click="type = 'login'">Login</li>
        <li :class="{ active: type === 'register' }" @click="type = 'register'">Register</li>
      </ul>
    </div>
  </div>
</template>

<script>
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isByteLength from 'validator/lib/isByteLength'
import isEmail from 'validator/lib/isEmail'
import config from '@/config'

export default {
  name: 'admin-login11',
  data () {
    return {
      account: '',
      password: '',
      repassword: '',
      accountPass: false,
      loginName: this.$route.meta.login,
      registerName: this.$route.meta.register,
      toName: this.$route.meta.to,
      pwdPass: false,
      pwdAgainPass: false,
      type: this.$route.meta.type,
      targetPath: ''
    }
  },
  watch: {
    type (val) {
      if (val === 'register') {
        this.$router.push({
          name: this.registerName
        })
      }
      else {
        this.$router.push({
          name: this.loginName
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
    // 验证账号或邮箱是否正确
    accountOrEmailIsRight (val, vm) {
      vm.status = val.length >= 6 ? 'normal' : 'error'
      vm.process = val.length / 6 * 100

      return isByteLength(val, { min: 6 })
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
      if (this.type === 'account') {
        this.login()
      }
      else if (this.type === 'register') {
        this.register()
      }
    },
    // 登录
    login () {
      let account = this.account
      isEmail(account) ? this.loginByEmail(account) : this.loginByAccount(account)
    },
    // 通过账号登录
    loginByAccount (account) {
      let { password } = this
      this.$graphql.mutation(`
        login ($account, $password) {
          account,
          admin,
          avatar
        }
      `, {
        account,
        password
      })
      .then((res) => {
        this.$store.commit('setSignStatus', res)
        this.$toast('登录成功', {
          type: 'success',
          callback: () => {
            this.$router.replace(this.targetPath)
          }
        })
      })
      .catch((err) => this.$toast(err.message, 'error'))
    },
    // 通过邮箱登录
    loginByEmail (email) {
      let { password } = this
      this.$graphql.mutation(`
        loginByEmail ($email, $password) {
          account,
          admin,
          avatar
        }
      `, {
        email,
        password
      })
      .then((res) => {
        this.$store.commit('setSignStatus', res)
        this.$toast('登录成功', {
          type: 'success',
          callback: () => {
            this.$router.replace(this.targetPath)
          }
        })
      })
      .catch((err) => this.$toast(err.message, 'error'))
    },
    // 注册
    register () {
      let { account, password, repassword } = this
      this.$graphql.mutation(`
        register ($account, $password, $repassword) {
          account,
          admin,
          avatar
        }
      `, {
        account,
        password,
        repassword
      })
      .then((res) => {
        this.$store.commit('setSignStatus', res)
        this.$toast('注册成功', {
          type: 'success',
          callback: () => {
            this.$router.replace(this.targetPath)
          }
        })
      })
      .catch((err) => {
        this.$toast(err.message, 'error')
      })
    },
    // 通过 github 登录
    loginByGithub () {
      window.location = `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&state=${this.targetPath}&scope=user`
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (vm.targetPath) {
        return false
      }
      else if (from.fullPath === '/') {
        vm.targetPath = vm.$route.meta.to
      }
      else {
        vm.targetPath = from.fullPath
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '~style';

  .login-view {
    height: 100vh;
    @include flex-center;
  }

  .form-wrap {
    position: relative;
    width: 400px;
    height: 320px
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
    list-style: none;
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

  .other-btn {
    font-size: 13px;
    margin-top: 15px;
    cursor: pointer;
    color: $font2;
    transition: color .3s;

    &:hover {
      color: $blue;
    }
  }
</style>
