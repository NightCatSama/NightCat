<template>
  <button :type="type" :class="component_class" @click="handleClick">
    <Icon v-if="is_loading" name="loading" :rotate="true"></Icon>
    <Icon v-if="!is_loading && prefix" :name="prefix"></Icon>
    <span v-if="loading_text">
      {{ loading_text }}
    </span>
    <span v-else>
      <slot></slot>
    </span>
    <Icon v-if="!is_loading && suffix" :name="suffix"></Icon>
  </button>
</template>

<script>
  const prefixCls = 'cat-btn'

  export default {
    name: 'Btn',
    props: {
      size: {
        default: 'md',
        type: String
      },
      disabled: {
        default: false,
        type: Boolean
      },
      is_loading: {
        default: false,
        type: Boolean
      },
      type: String,
      loading_text: String,
      prefix: String,
      suffix: String
    },
    computed: {
      component_class () {
        return [
          prefixCls,
          {
            [`${prefixCls}-${this.size}`]: this.size,
            'disabled': this.is_loading || this.disabled
          }
        ]
      }
    },
    methods: {
      handleClick (e) {
        this.$emit('click', e)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../style/index';

  $prefixCls: cat-btn;
  $default: #d9d9d9;
  $defaul_deep: #666;

  .#{$prefixCls} {
    display: inline-block;
    margin-bottom: 0;
    text-align: center;
    white-space: nowrap;
    border-radius: $border_radius;
    color: $defaul_deep;
    vertical-align: middle;
    border: 1px solid $default;
    background-color: #fff;
    user-select: none;
    position: relative;
    color: rgba(0 ,0 , 0, .65);
    outline: none;
    box-shadow: none;
    cursor: pointer;
    transition: all .2s;

    &:hover {
      border-color: darken($default, 25%);
    }

    &:active {
      border-color: darken($default, 10%);
    }

    &.disabled {
      opacity: .3;
      cursor: not-allowed;

      &:active {
        box-shadow: none;
      }
    }
  }

  // 字体大小
  $btn_font: 12px 14px 16px;

  // 间隔距离
  $btn_gap: 12px 14px 16px;

  // 按钮内图标大小
  $btn_icon: 14px 16px 18px;

  $i: 1;
  @each $name, $value in $size {
    .#{$prefixCls}-#{$name} {
      padding: 0 nth($btn_gap, $i);
      font-size: nth($btn_font, $i);
      height: $value;

      .cat-icon {
        margin: 0 -1px;
        font-size: nth($btn_icon, $i);
        line-height: 1;
      }
    }

    $i: $i + 1;
  }

</style>

