<template>
  <div class="about-view">
    <section class="about-me">
      <h1 class="title">关于本网站</h1>
      <p>
        此网站建立于2017年6月，如你所见，这是一个简单又简陋的个人网站。因为从后端到前端都是本人一手设计的，有什么让你不舒服的地方欢迎在下方评论区吐槽~
        <br />
        <br />
        做博客的初衷是用于记录我的学习经历和踩过坑，还有分享我想分享的东西。
        <br />
        <br />
        但是本人是个语文水平三年级的人，你可能会不可避免看到以下情况：
        <br />
        <br />
        <ol>
          <li>文字比代码少</li>
          <li>语句不通顺</li>
          <li>排版紊乱</li>
        </ol>
        <br />
        <small>最后本博客的代码是开源的: <a href="https://github.com/NightCatSama/NightCat" target="_blank">https://github.com/NightCatSama/NightCat</a></small>
      </p>
      <br />
      <br />
      <h1 class="title">关于我</h1>
      <p>
        唔，我叫夜喵，性别男。是一枚兴趣使然的前端攻城狮，喜欢做有趣的特效和游戏，私下的爱好是 看番 和 打游戏。
        <br />
        <br />
        欢迎关注我的 Github ⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄: <a href="https://github.com/NightCatSama" target="_blank">https://github.com/NightCatSama</a>
        <br />
        <br />
        如果有什么想和我聊的，可以加我的扣扣：642163903
      </p>
    </section>

    <!-- 评论区分割线 -->
    <div ref="comment" class="line" :data-title="comment_count ? `${comment_count} 条留言` : '留言区'"></div>

    <Comment @addComment="comment_count++" type="about" :totalCount.sync="comment_count"></Comment>
  </div>
</template>

<script>
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
