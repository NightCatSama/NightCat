<template>
  <div class="set-password-view">
    <div class="wrap">
      <h4>设置你的密码</h4>
      <div class="">
        <Input
          v-model="password"
          type="password"
          label="Password"
          :verify="passwordIsRight"
          >
        </Input>
        <Icon name="right-circle" :size="18" class="next-icon" @click.native="setPwd"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import isAlphanumeric from 'validator/lib/isAlphanumeric'
import isByteLength from 'validator/lib/isByteLength'

export default {
  name: 'admin-home',
  data () {
    return {
      password: '',
      pwdPass: false
    }
  },
  methods: {
    setPwd () {
      if (this.pwdPass) {
        console.log(123)
      }
    },
    passwordIsRight (val, vm) {
      vm.status = val.length >= 6 ? 'normal' : 'error'
      vm.process = val.length / 6 * 100

      if (isByteLength(val, { min: 6 }) && isAlphanumeric(val)) {
        return true
      }
      else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
  @import '../style/index';

  .set-password-view {
    height: 100vh;
    @include flex-center;

    .wrap {
      display: flex;
      flex-direction: column;

      h4 {
        margin-bottom: 10px;
      }

      input {
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bgc inset;
        }
      }

      .next-icon {
        color: $blue;
        transition: all .3s;
        cursor: pointer;

        &:hover {
          color: $blue-d2
        }
      }
    }
  }
</style>
