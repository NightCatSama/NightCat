<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import './style/core/index';

  // 评论区
  .comment-form {
    display: flex;
    align-items: flex-start;
    margin-bottom: 60px;


    .comment-wrap {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 3px;
      margin-right: 10px;
      flex-shrink: 0;
    }

    textarea {
      flex: 1;
      width: 100%!important;
      border: none;
      outline: none;
      padding: 10px;
      font-size: 14px;
      color: $font1;
      box-shadow: $shadow;
    }

    aside {
      position: absolute;
      left: 0;
      bottom: -20px;
      font-size: 12px;
      color: $font2;
    }

    .word-limit {
      position: absolute;
      right: 8px;
      bottom: 8px;
      font-size: 12px;
      color: $font2;

      &.red {
        color: $red;
      }
    }

    .send-btn {
      position: absolute;
      right: 0;
      bottom: -40px;
      width: 80px;
    }
  }

  // markdown
  #app .markdown-body {
    word-break: break-all;
    font-size: 14px;
  }
</style>
