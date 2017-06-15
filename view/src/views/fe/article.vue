<template>
  <div class="article-view">
    <div class="cover" :style="{ backgroundImage: `url(${cover})`}"></div>
    <article>
      <h1 class="title">{{ title }}</h1>
      <p class="meta">
        by {{ author }}
        <time>{{ created_at }}</time>
      </p>
      <div class="markdown-body" v-html="view"></div>
    </article>
    <section class="comment"></section>
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

  .article-view {
    background-color: $white;
    @include flex-main-center(flex, column);

    .cover {
      height: 60vh;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }

    article {
      margin: 30px auto;
      width: 860px;
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
  }
</style>
