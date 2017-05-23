<template>
  <div class="wrap">
    <label :class="label_class">Account</label>
    <input class="input" type="text" v-model="val" @focus="is_focus = true" @blur="is_focus = false" />
    <span class="progress"></span>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      value: String,
      verify: [String, Function]
    },
    data () {
      return {
        is_focus: false,
        val: this.value
      }
    },
    watch: {
      val (val) {
        this.$emit('input', val)
      }
    },
    computed: {
      label_class () {
        return [
          'label',
          {
            'label-shrink': this.is_focus || this.val
          }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/index';

  .wrap {
    display: inline-block;
    position: relative;
  }

  .label {
    position: absolute;
    top: 50%;
    left: 0px;
    font-size: 14px;
    transform: translate3d(0, -50%, 0);
    color: #868686;
    transition: all .3s;

    &-shrink {
      font-size: 12px;
      top: -15px;
      transform: translate3d(0, 0, 0);
    }
  }

  .input {
    width: 100%;
    position: relative;
    padding: 8px 0;
    color: $font;
    background-color: $tr;
    border: none;
    outline: none;
    width: 230px;
    border-bottom: 2px solid $font;

    &:-webkit-autofill {
      -webkit-text-fill-color: $white;
      -webkit-box-shadow: 0 0 0px 1000px $white inset;
    }
  }

  .progress {
    height: 2px;
    width: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: $red;
    transition: width .3s;

    &.error {
      background-color: $red;
    }
    &.success {
      background-color: $green;
    }
  }
</style>
