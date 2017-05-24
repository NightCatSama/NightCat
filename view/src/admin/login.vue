<template>
  <div class="login-view">
    <div class="form-wrap">
      <!-- Login form -->
      <form @submit.prevent="login" :class="['form', `form-order-${order.indexOf('login')}`]">
        <Input
          class="form-item"
          v-model="account"
          label="Account"
          :verify="accountIsRight"
          >
        </Input>
        <Input
          class="form-item"
          v-model="password"
          type="password"
          label="Password"
          :verify="passwordIsRight"
          >
        </Input>
        <Btn class="sign-btn" type="submit">Login</Btn>
      </form>

      <!-- Sign form -->
      <form @submit.prevent="login" :class="['form', `form-order-${order.indexOf('sign')}`]">
        <Input
          class="form-item"
          v-model="account"
          label="Account"
          :verify="accountIsRight"
          >
        </Input>
        <Input
          class="form-item"
          v-model="password"
          type="password"
          label="Password"
          :verify="passwordIsRight"
          >
        </Input>
        <Input
          class="form-item"
          v-model="passwordAgain"
          type="password"
          label="Password Again"
          :verify="passwordIsEqual"
          >
        </Input>
        <Btn class="sign-btn" type="submit">Sign</Btn>
      </form>

      <!-- Other -->
      <div :class="['form', `form-order-${order.indexOf('other')}`]">
        <Btn class="sign-btn">Github</Btn>
        <Btn class="sign-btn">Email</Btn>
      </div>

      <!-- 导航 -->
      <ul class="type-nav">
        <li :class="{ active: type === 'login' }" @click="type = 'login'">Login</li>
        <li :class="{ active: type === 'sign' }" @click="type = 'sign'">Sign</li>
        <li :class="{ active: type === 'other' }" @click="type = 'other'">Other</li>
      </ul>
    </div>
  </div>
</template>

<script>
// import isAlphanumeric from 'validator/lib/isAlphanumeric'

export default {
  name: 'admin-login',
  data () {
    return {
      account: '',
      password: '',
      passwordAgain: '',
      type: 'login',
      order: ['other', 'sign', 'login']
    }
  },
  watch: {
    type (val) {
      let index = this.order.indexOf(val)
      this.order.splice(index, 1)
      this.order.push(val)
    }
  },
  methods: {
    accountIsRight (val, vm) {
      val = val.replace(/[^\w.-]/ig, '')
      vm.process = Math.min(val.length / 6 * 100, 100)
      vm.status = val.length >= 6 ? 'success' : 'error'
      return val
    },
    passwordIsRight (val, vm) {
      vm.process = Math.min(val.length / 6 * 100, 100)
      vm.status = val.length >= 6 ? 'success' : 'error'
      return val
    },
    passwordIsEqual (val, vm) {
      vm.status = val === this.password ? 'success' : 'error'
      return val
    },
    login () {
    },
    sign () {

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
    background-color: $white;
    box-shadow: 1px 2px 1px #d1d1d1;
    @include flex-center(flex, column);
    transition: all .3s;

    .form-item {
      margin-bottom: 10px;
    }

    .sign-btn {
      margin-top: 20px;
      width: 50%;
    }

    @for $i from 0 to 3 {
      &-order-#{$i} {
        top: $i * -5px;
        left: $i * -5px;
        z-index: $i;
      }
    }

    &.active {
      opacity: 1;
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
    transform: translateX(5px);
    transition: all .3s;

    li {
      padding: 3px 5px;
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
