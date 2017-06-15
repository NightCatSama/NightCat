<template>
  <div class="login-view">
    <div class="form-wrap">
      <!-- Login form -->
      <form v-if="sonType !== ''" @submit.prevent="submit" class="form">
        <Input
          v-if="type === 'login'"
          ref="account"
          class="form-item"
          v-model="account"
          label="Account / Email"
          :complete.sync="accountPass"
          :verify="accountOrEmailIsRight"
          >
        </Input>
        <Input
          v-if="type === 'register' && sonType === 'account'"
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
          v-if="type === 'register' && sonType === 'email'"
          ref="email"
          class="form-item"
          v-model="email"
          label="Email"
          :complete.sync="emailPass"
          :verify="emailIsRight"
          >
        </Input>
        <Input
          v-if="sonType === 'account'"
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
          v-if="type === 'register' && sonType === 'account'"
          ref="repassword"
          class="form-item"
          v-model="repassword"
          type="password"
          label="Password Again"
          :complete.sync="pwdAgainPass"
          :verify="passwordIsEqual"
          >
        </Input>
        <Btn v-if="type === 'login'" class="sign-btn" :disabled="accountLogin" type="submit">Login</Btn>
        <Btn v-if="type === 'register'" class="sign-btn" :disabled="sonType === 'account' ? accountRegister : emailRegister" type="submit">Register</Btn>
        <div class="other-btn" @click="sonType = ''">Other</div>
      </form>

      <!-- Other -->
      <div v-if="type === 'login' && sonType === ''" class="form">
        <h1>Login</h1>
        <Btn class="sign-btn" @click="sonType = 'account'">Account</Btn>
        <Btn class="sign-btn" @click="loginByGithub">Github</Btn>
      </div>

      <!-- Other -->
      <div v-if="type === 'register' && sonType === ''" class="form">
        <h1>Register</h1>
        <Btn class="sign-btn" @click="sonType = 'account'">Account</Btn>
        <Btn class="sign-btn" @click="sonType = 'email'">Email</Btn>
      </div>

      <!-- 导航 -->
      <ul class="type-nav">
        <li :class="{ active: type === 'login' }" @click="type = 'login'; sonType = ''">Login</li>
        <li :class="{ active: type === 'register' }" @click="type = 'register'; sonType = ''">Register</li>
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
      email: '',
      account: '',
      password: '',
      repassword: '',
      accountPass: false,
      loginName: this.$route.meta.login,
      registerName: this.$route.meta.register,
      toName: this.$route.meta.to,
      emailPass: false,
      pwdPass: false,
      pwdAgainPass: false,
      type: this.$route.meta.type,
      sonType: '',
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
  computed: {
    accountLogin () {
      return !this.accountPass || !this.pwdPass
    },
    accountRegister () {
      return !this.accountPass || !this.pwdPass || !this.pwdAgainPass
    },
    emailRegister () {
      return !this.emailPass
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
    // 验证邮箱是否正确
    emailIsRight (val, vm) {
      vm.status = isEmail(val) ? 'normal' : 'error'
      vm.process = val.length ? 100 : 0

      return vm.status === 'normal'
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
      if (this.type === 'login') {
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
        this.$toast('登录成功', 'success')
        .then(() => this.$router.replace(this.targetPath))
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
        this.$toast('登录成功', 'success')
        .then(() => this.$router.replace(this.targetPath))
      })
      .catch((err) => this.$toast(err.message, 'error'))
    },
    // 注册
    register () {
      this.sonType === 'email' ? this.registerByEmail() : this.registerByAccount()
    },
    registerByAccount () {
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
        this.$toast('注册成功', 'success')
        .then(() => this.$router.replace(this.targetPath))
      })
      .catch((err) => {
        this.$toast(err.message, 'error')
      })
    },
    // 通过邮箱注册
    registerByEmail () {
      let { email } = this
      this.$http.post('/sendSignupEmail', {
        email
      })
      .then((res) => {
        console.log(res)
        this.$toast('已向注册邮箱发送激活邮件', 'success')
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
    height: 360px
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
