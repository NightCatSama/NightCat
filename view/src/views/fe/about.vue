<template>
  <div class="about-view">
    <section class="about-me">
      <h1 class="title">关于本网站</h1>
      <p>
        点滴记录学习历程
        <small>本博客的代码是开源的: <a href="https://github.com/mafeifan/NightCat" target="_blank">https://github.com/mafeifan/NightCat</a></small>
      </p>
    </section>

    <!-- 评论区分割线 -->
    <div ref="comment" class="line" :data-title="comment_count ? `${comment_count} 条留言` : '留言区'"></div>

    <Comment @addComment="comment_count++" type="about" :totalCount.sync="comment_count"></Comment>
  </div>
</template>

<script>
  import 'github-markdown-css'

  import Comment from '@/components/UI/Comment'
  export default {
    name: 'about',
    components: {
      Comment
    },
    data () {
      return {
        comment_count: 0
      }
    },
    methods: {
    },
    mounted () {
    }
  }
</script>

<style lang="scss">
  @import '~style';

  $width: 800px;

  .about-view {
    min-height: 100vh;
    overflow: hidden;
    @include flex-cross-center;
    flex-direction: column;

    .about-me {
      width: $width;
      margin: 200px 0;

      .title {
        margin-bottom: 20px;
      }

      p {
        line-height: 1.36;
        font-size: 14px;
      }

      ul, ol {
        list-style-position: inside;
      }
    }

    $line-color: $grey1;
    .line {
      position: relative;
      width: $width;
      margin-bottom: 40px;
      font-size: 24px;
      color: $line-color;
      text-align: center;

      &::before {
        content: attr(data-title);
        position: relative;
        display: inline-block;
        padding: 0 10px;
        background-color: $bgc;
        z-index: 1;
      }

      &::after {
        content: '';
        display: inline-block;
        width: $width;
        position: absolute;
        height: 2px;
        top: 50%;
        left: 0;
        background-color: $line-color;
        transform: translateY(-50%);
      }
    }
  }
</style>
