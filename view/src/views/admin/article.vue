<template>
  <div class="admin-article-view">
    <!--侧边按钮组-->
    <aside class="aside">
      <div class="radius-btn blue" @click="gotoAddArticle">
        <Icon name="plus" :size="24"></Icon>
      </div>
      <div class="radius-btn yellow" @click="gotoEditArticle">
        <Icon name="post" :size="24"></Icon>
      </div>
      <div class="radius-btn red" @click="deleteArticle">
        <Icon name="delete" :size="24"></Icon>
      </div>
    </aside>

    <!--左侧文章列表-->
    <div class="sidebar">
      <ul class="article-list">
        <li v-if="!list.length" class="no-article">
          Nothing
        </li>
        <li v-for="(article, i) in list" :class="{ active: active === i }" @click="active = i" @dblclick="openArticle(article._id)">
          <div class="cover" :style="{ backgroundImage: `url(${article.cover})`}"></div>
          <div :class="['release-tag', { released: article.release }]" @click.stop="modifyRelease(i)"></div>
          <div class="info">
            <h3 class="title">
              {{ article.title }}
            </h3>
            <small>
              {{ article.created_at }} by {{ article.author.account }}
            </small>
            <br />
            <span v-for="tag in article.tags" class="tag">{{ tag.name }}</span>
          </div>
        </li>
        <Btn class="next-btn" v-show="hasNextPage" @click="getArticleList">Loadmore</Btn>
      </ul>
    </div>

    <!--文章详情-->
    <div class="admin-main">
      <div v-if="!list.length" class="no-article">
        Nothing
      </div>
      <div v-if="view" class="markdown-body" v-html="view"></div>
    </div>
  </div>
</template>

<script>
  import 'github-markdown-css'

  export default {
    name: 'Admin-Article',
    data () {
      return {
        active: 0,
        list: [],
        cursor: '',
        hasNextPage: false
      }
    },
    computed: {
      view () {
        return this.list.length ? this.list[this.active].view : null
      }
    },
    methods: {
      // 得到文章列表
      getArticleList () {
        this.$graphql.query(`
          article ($first, $after) {
            edges {
              node {
                ...article
              }
              cursor
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        `, {
          first: 5,
          after: this.cursor
        }, ['article'])
        .then((res) => {
          this.hasNextPage = res.pageInfo.hasNextPage
          this.list = this.list.concat(res.edges.map((obj) => obj.node))
          this.cursor = res.pageInfo.endCursor
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      // 发布/下架 文章
      modifyRelease (index) {
        let article = this.list[index]
        let word = article.release ? '下架' : '发布'

        this.$prompt(`确定${word}这篇文章吗？`, () => {
          this.$graphql.mutation(`
            releaseArticle ($id) {
              release
            }
          `, {
            id: article._id
          })
          .then((res) => {
            this.$toast('修改成功', 'success')
            this.list[index].release = res.release
            this.$forceUpdate()
          })
          .catch((err) => this.$toast(err.message, 'error'))
        })
      },
      // 删除文章
      deleteArticle () {
        if (!this.list[this.active]) return this.$toast('没有文章可以删除。')

        this.$prompt('确定删除这篇文章吗？', () => {
          this.$graphql.mutation(`
            deleteArticle ($id) {
              _id
            }
          `, {
            id: this.list[this.active]._id
          })
          .then((res) => {
            this.$toast('删除成功', 'success')
            let active = this.active
            this.active = Math.max(active - 1, 0)
            this.list.splice(active, 1)
          })
          .catch((err) => this.$toast(err.message, 'error'))
        })
      },
      // 跳转至文章编辑页面
      gotoEditArticle () {
        if (!this.list[this.active]) return this.$toast('没有文章可以编辑。', 'warning')

        let article = this.list[this.active]
        this.$router.push({
          name: 'Admin-EditArticle',
          params: {
            type: 'edit',
            id: article._id
          }
        })
      },
      gotoAddArticle () {
        this.$router.push({
          name: 'Admin-AddArticle',
          params: {
            type: 'add'
          }
        })
      },
      openArticle (id) {
        window.open(`/article/${id}`)
      }
    },
    mounted () {
      this.getArticleList()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~style';

  .admin-article-view {
    position: relative;
    flex: 1;
    margin: 20px 0;
    display: flex;

    .article-list {
      overflow: auto;

      li {
        position: relative;
        height: 150px;
        @include flex-cross-center;
        padding: 20px;
        border-bottom: 1px solid $grey4;
        cursor: pointer;

        .cover {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: .2;
          background-color: $grey3;
          background-repeat: no-repeat;
          background-size: cover;
          transition: all .3s;
        }

        .release-tag {
          position: absolute;
          top: 0;
          right: 0;
          opacity: .4;
          @include triangle(36px, $blue, top-right);

          &.released {
            @include triangle(36px, $green, top-right);
          }
        }

        .info {
          position: relative;
          z-index: 9;

          .title {
            font-size: 18px;
          }

          small {
            font-size: 12px;
            font-weight: normal;
            white-space: nowrap;
          }
        }

        &.active {
          .info {
            color: $white;
            text-shadow: 0 0 8px rgba(0, 0, 0, .95), 1px 1px 3px rgba(0, 0, 0, .9);
          }
          .cover {
            opacity: .9;
            box-shadow: inset 0 0 20px 5px rgba(0, 0, 0, 0.36);
          }
          .release-tag {
            opacity: .8;
          }
        }
      }
    }

    .no-article {
      width: 100%;
      height: 100%;
      color: $font2;
      font-size: 20px;
      @include flex-center;
    }

    .admin-main {
      overflow: auto;

      .markdown-body {
        margin: 20px;
        width: 100%;
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

    .admin-badge {
      display: inline-block;
      font-size: 13px;
      margin: 2px 10px 10px 0;
      background-color: $blue;
      color: $white;
      border-radius: 4px;
      padding: 2px 3px;
    }
  }
</style>
