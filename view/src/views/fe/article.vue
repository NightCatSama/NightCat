<template>
  <div class="article-view">
    <div class="cover" :style="{ backgroundImage: `url(${cover})`}"></div>
    <article>
      <!-- 文章头部 -->
      <h1 class="title">{{ title }}</h1>
      <p class="meta">
        by {{ author }}
        <time>{{ created_at }}</time>
      </p>

      <!-- 文章主体 -->
      <div class="markdown-body" v-html="view"></div>

      <!-- 标签区块 -->
      <div class="tag-list">
        <small>Tag: </small>
        <router-link
          class="tag"
          v-for="(tag, index) in tags"
          :key="index"
          :to="{
            name: 'ArticleList',
            query: {
              tag: tag,
              page: undefined
            }
          }"
        >
          {{ tag }}
        </router-link>
      </div>
    </article>
    <section class="comment">
      此处应有评论框
    </section>
    <section class="comment-list">
      此处应有评论列表
    </section>
  </div>
</template>

<script>
  import 'github-markdown-css'

  export default {
    name: 'article',
    data () {
      return {
        content: '',
        title: '',
        author: '',
        cover: '',
        view: '',
        created_at: null,
        tags: []
      }
    },
    methods: {
      getArticleContent () {
        this.$graphql.query(`
          getArticleById ($id) {
            title,
            author,
            content,
            view,
            cover,
            created_at,
            tags
          }
        `, {
          id: this.$route.params.id
        })
        .then((res) => {
          console.log(res.view)
          Object.assign(this, res)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      }
    },
    mounted () {
      this.getArticleContent()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  $width: 860px;

  .article-view {
    background-color: $white;
    @include flex-cross-center(flex, column);

    .cover {
      width: 100%;
      height: 60vh;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    article {
      margin: 30px auto;
      width: $width;
      padding: 40px;

      .title {
        font-size: 44px;
        margin-bottom: 20px;
      }

      .meta {
        margin-bottom: 40px;
        font-size: 14px;
        color: $font1;

        time {
          font-size: 12px;
          color: $blue_l3;
        }
      }
    }
    .tag-list {
      margin-top: 80px;
      display: flex;
      @include flex-cross-center;

      small {
        margin-right: 10px;
      }
    }

    .tag {
      position: relative;
      display: inline-block;
      text-decoration: none;
      white-space: nowrap;
      font-weight: 400;
      color: $white;
      height: 18px;
      line-height: 18px;
      padding: 0 5px 0 8px;
      border-radius: 0 3px 3px 0;
      margin: 0 10px 0 5px;
      font-size: 12px;
      background-color: $brown;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: $white;
        transform: translateY(-50%);
      }

      &::after {
        content: '';
        position: absolute;
        left: -18px;
        top: 0;
        @include triangle (18px, $brown, left);
      }

      &.blue {
        background-color: $blue_d2;

        &::after {
          border-right-color: $blue_d2;
        }
      }
    }

    .comment {
      width: $width;
      height: 160px;
      @include flex-center;
      background-color: #ccc;
      color: $font1;
      font-size: 40px;
      margin-bottom: 30px;
    }

    .comment-list {
      width: $width;
      height: 400px;
      @include flex-center;
      background-color: #ccc;
      color: $font1;
      font-size: 40px;
      margin-bottom: 30px;
    }
  }
</style>
