<template>
  <div :class="wrap_class">
    <label :for="name" :class="label_class">{{ label }}</label>
    <input
      ref="input"
      :id="name"
      :class="input_class"
      :type="type"
      :value="val"
      :disabled="disabled"
      :readonly="readonly"
      @input="inputHandle"
      @focus="_focus"
      @blur="_blur"
      @keyup.enter="$emit('enter')"
      :placeholder="in_placeholder" />
    <span :class="progress_class" :style="{ width: Math.min(process, 100) + '%' }"></span>
  </div>
</template>

<script>
  const prefixCls = 'cat-input'
  import { getClass } from '@/assets/tools'

  export default {
    name: 'Input',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      label: {
        type: String,
        required: true
      },
      disabled: Boolean,
      readonly: Boolean,
      id: String,
      placeholder: String,
      value: String,
      filter: Function,
      verify: Function
    },
    data () {
      return {
        is_focus: false,
        process: false,
        status: 'normal',
        val: this.value
      }
    },
    watch: {
      val (val) {
        this.is_complete(val)
        this.$emit('input', val)
      },
      value (val) {
        this.val = val
      }
    },
    computed: {
      wrap_class () {
        return getClass(prefixCls, [
          'wrap'
        ])
      },
      input_class () {
        return getClass(prefixCls, [
          ''
        ])
      },
      label_class () {
        return getClass(prefixCls, [
          'label',
          {
            'label-shrink': this.is_focus || this.value
          }
        ])
      },
      progress_class () {
        return getClass(prefixCls, [
          'progress'
        ]).concat([this.status])
      },
      name () {
        return this.id || this.label
      },
      in_placeholder () {
        return this.is_focus ? this.placeholder : ''
      }
    },
    methods: {
      inputHandle (e) {
        let val = e.target.value
        this.val = e.target.value = this.filter ? this.filter(val) : val
      },
      is_complete (val) {
        if (this.verify) {
          this.$emit('update:complete', this.verify(val, this))
        }
      },
      _focus (e) {
        this.$emit('focus')
        this.is_focus = true
      },
      _blur (e) {
        this.$emit('blur')
        this.is_focus = false
      }
    },
    mounted () {
      this.val = this.filter ? this.filter(this.val) : this.val
      this.is_complete(this.val)
    }
  }
</script>

<style lang="scss">
  @import '../../style/index';

  $prefixCls: cat-input;

  .#{$prefixCls}-wrap {
    display: inline-block;
    position: relative;
    margin-top: 20px;
  }

  .#{$prefixCls}-label {
    position: absolute;
    top: 50%;
    left: 0px;
    font-size: 14px;
    transform: translate3d(0, -50%, 0);
    color: $font1;
    transition: all .3s;

    &-shrink {
      font-size: 12px;
      top: -15px;
      transform: translate3d(0, 0, 0);
    }
  }

  .#{$prefixCls} {
    width: 100%;
    position: relative;
    padding: 8px 20px 4px 0;
    color: $font;
    background-color: $tr;
    border: none;
    outline: none;
    width: 230px;
    border-bottom: 2px solid $font2;

    @include placeholder($placeholder, 13px);

    [disabled] {
      opacity: .3;
      cursor: not-allowed;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: $font;
      -webkit-box-shadow: 0 0 0px 1000px $white inset;
    }
  }

  .#{$prefixCls}-progress {
    height: 2px;
    width: 0%;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: width .3s;

    &.normal {
      background-color: $blue_l3;
    }
    &.error {
      background-color: $red_l3;
    }
    &.success {
      background-color: $green_l3;
    }
  }
</style>
