<template>
  <div class="login-view">
    <div class="form-wrap">
      <!-- Login form -->
      <form v-if="type === 'login'" @submit.prevent="login" class="form">
        <Input
          class="form-item"
          v-model="account"
          label="Account"
          :complete.sync="accountPass"
          :filter="accountFilter"
          :verify="accountIsRight"
          >
        </Input>
        <Input
          class="form-item"
          v-model="password"
          type="password"
          label="Password"
          :complete.sync="pwdPass"
          :verify="passwordIsRight"
          >
        </Input>
        <Btn class="sign-btn" :disabled="!accountPass || !pwdPass" type="submit">Login</Btn>
      </form>

      <!-- Sign form -->
      <form v-if="type === 'sign'" @submit.prevent="sign" class="form">
        <Input
          class="form-item"
          v-model="account"
          label="Account"
          :filter="accountFilter"
          :verify="accountIsRight"
          >
        </Input>
        <Input
          class="form-item"
          v-model="password"
          type="password"
          label="Password"
          :complete.sync="pwdPass"
          :verify="passwordIsRight"
          >
        </Input>
        <Input
          class="form-item"
          v-model="passwordAgain"
          type="password"
          label="Password Again"
          :complete.sync="pwdAgainPass"
          :verify="passwordIsEqual"
          >
        </Input>
        <Btn class="sign-btn" :disabled="!accountPass || !pwdPass || !pwdAgainPass" type="submit">Register</Btn>
      </form>

      <!-- Other -->
      <div v-if="type === 'other'" class="form">
        <Btn class="sign-btn" @click="loginByGithub">Github</Btn>
      </div>

      <!-- 导航 -->
      <ul class="type-nav">
        <li :class="{ active: type === 'login' }" @click="type = 'login'">Login</li>
        <li :class="{ active: type === 'sign' }" @click="type = 'sign'">Register</li>
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
      accountPass: false,
      password: '',
      pwdPass: false,
      passwordAgain: '',
      pwdAgainPass: false,
      type: this.$route.name === 'Admin-Register' ? 'sign' : 'login',
      order: ['login', 'sign', 'other']
    }
  },
  watch: {
    type (val) {
      let index = this.order.indexOf(val)
      this.order.splice(index, 1)
      this.order.unshift(val)

      if (val === 'sign') {
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
    // 验证是否正确
    accountIsRight (val, vm) {
      vm.status = val.length >= 6 ? 'normal' : 'error'
      vm.process = val.length / 6 * 100

      return isByteLength(val, { min: 6, max: 20 }) && isAlphanumeric(val)
    },
    passwordIsRight (val, vm) {
      vm.status = val.length >= 6 ? 'normal' : 'error'
      vm.process = val.length / 6 * 100

      return isByteLength(val, { min: 6 }) && isAlphanumeric(val)
    },
    passwordIsEqual (val, vm) {
      vm.status = val === this.password ? 'normal' : 'error'
      vm.process = val ? 100 : 0

      return val === this.password
    },
    login () {
      this.$http.post('/signin', {
        account: this.account,
        password: this.password
      })
      .then((res) => {
        if (!res.data.is_admin) {
          this.$toast('非管理员身份', 'error')
        }
        else {
          this.$toast(res.message, {
            type: 'success',
            callback: () => {
              console.log(this.$router)
              this.$router.replace({
                name: 'Admin-Home'
              })
            }
          })
        }
      })
      .catch((err) => {
        this.$toast(err.message, 'error')
      })
    },
    sign () {
      this.$http.post('/signup', {
        account: this.account,
        password: this.password,
        repassword: this.passwordAgain
      })
      .then((res) => {
        this.$toast(res.message, 'success')
      })
      .catch((err) => {
        this.$toast(err.message, 'error')
      })
    },
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
