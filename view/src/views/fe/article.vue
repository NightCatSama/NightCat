<template>
  <div class="article-view">
    <div class="cover" :style="{ backgroundImage: `url(${cover})`}"></div>
    <article>
      <!-- 文章头部 -->
      <h1 class="title">{{ title }}</h1>
      <p class="meta">
        by {{ author.account }}
        <time>发表于 {{ created_at }}</time>
      </p>

      <!-- 文章主体 -->
      <div class="markdown-body content" v-html="view"></div>

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
              tag: tag.name,
              page: undefined
            }
          }"
        >
          {{ tag.name }}
        </router-link>
      </div>
    </article>

    <!-- 评论区分割线 -->
    <div ref="comment" class="line" :data-title="comment_count ? `${comment_count} 条评论` : '评论区'"></div>

    <Comment @addComment="comment_count++" :id="$route.params.id"></Comment>
  </div>
</template>

<script>
  import { scrollToElem } from '@/assets/smooth_scroll'
  import Comment from '@/components/UI/Comment'
  import 'github-markdown-css'

  export default {
    name: 'article',
    components: {
      Comment
    },
    data () {
      return {
        content: '',
        title: '',
        author: '',
        cover: '',
        view: '',
        comment_count: 0,
        created_at: null,
        tags: []
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      oneFloor () {
        return typeof this.offset === 'number' && !Number.isNaN(this.offset)
      }
    },
    methods: {
      getArticleContent () {
        this.$graphql.query(`
          getArticleById ($id) {
            ...article
          }
        `, {
          id: this.$route.params.id
        }, ['article'])
        .then((res) => {
          Object.assign(this, res)
          if (this.$route.hash) {
            scrollToElem(this.$refs[this.$route.hash.slice(1)])
          }
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

  $width: 800px;

  .article-view {
    @include flex-cross-center(flex, column);

    .cover {
      width: 100%;
      height: 80vh;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-color: $grey1;
    }

    article {
      margin: 80px auto 20px;
      width: $width;

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
          color: $blue_d3;
          margin-left: 10px;
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
