<template>
  <div class="article-list-view">
    <h1 class="view-title">
      {{ tag ? `【${tag}】分类下的文章` : '所有文章' }}<span class="tag-count">共{{totalCountInTag}}篇</span>
    </h1>
    <section class="article-list">
      <ul v-if="list.length">
        <li v-for="(article, i) in list">
          <div class="cover" v-if="article.cover">
            <router-link :to="{
              name: 'ArticleDetail',
              params: {
                id: article._id
              }
            }">
              <span :style="{ backgroundImage: `url(${article.cover})`}"></span>
            </router-link>
          </div>
          <div class="content">
            <router-link :to="{
              name: 'ArticleDetail',
              params: {
                id: article._id
              }
            }" class="title" tag="h1">{{ article.title }}</router-link>
            <p class="digest">{{ digest(article.content) }}</p>
            <p class="info">
            - by {{ article.author.account }}
            <time>{{ article.created_at }}</time>
            <router-link :to="{
              name: 'ArticleDetail',
              params: {
                id: article._id
              },
              hash: '#comment'
            }" class="comment-count">{{ article.comment_count ? `${article.comment_count} 条评论` : '暂无评论' }}</router-link>
            </p>
            <div class="tag-list">
              <Icon name="tags"></Icon>
              <router-link
                class="tag"
                v-for="(tag, index) in article.tags"
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
          </div>
          <router-link :to="{
            name: 'ArticleDetail',
            params: {
              id: article._id
            }
          }" class="check-content">阅读全文 ></router-link>
        </li>
      </ul>
      <div v-if="!list.length && !load" class="no-article">
        还未发布文章
      </div>

      <div v-if="load" class="no-article">
        加载中...
      </div>

      <div v-if="list.length" class="pagination">
        <a :class="{ disabled: !hasPrevPage }" href="javascript:;" @click="prevPage"><< Prev</a>
        {{ this.page + 1 }} / {{ this.totalPage }}
        <a :class="{ disabled: !hasNextPage }" href="javascript:;" @click="nextPage">Next >></a>
      </div>

      <!-- Tag 区块 -->
      <aside class="tags-list">
        <h1>Tags</h1>
        <router-link
          class="tag blue"
          :to="{
            name: 'ArticleList',
            query: {
              tag: undefined,
              page: undefined
            }
          }"
        >
          全部文章
        </router-link>
        <router-link
          class="tag blue"
          v-for="(tag, i) in tags"
          v-if="tag.count > 0"
          :key="i"
          :style="{
            opacity: 1 - (tags[0].count - tag.count) / (tags[0].count - tags[tags.length - 1].count) * 0.5
          }"
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
      </aside>
    </section>
  </div>
</template>

<script>
  import removeMd from 'remove-markdown'

  export default {
    name: 'article-list',
    data () {
      return {
        tag: undefined,
        count: 5,  // 放到配置里
        list: [],
        tags: [],
        hasPrevPage: false,
        hasNextPage: false,
        totalPage: 0,
        totalCountInTag: 0,
        page: 0,
        load: false
      }
    },
    watch: {
      '$route': 'getArticleList'
    },
    methods: {
      // 得到文章列表
      getArticleList () {
        this.load = true;
        let page = +this.$route.query.page
        this.page = Number.isNaN(page) ? 0 : page
        this.tag = this.$route.query.tag

        let query = this.tag ? 'getTagQuery' : 'getArticleQuery'

        this[query]()
        .then((res) => {
          this.load = false;
          this.totalCountInTag = res.totalCount;
          this.totalPage = Math.ceil(res.totalCount / this.count)
          this.hasPrevPage = res.pageInfo.hasPrevPage
          this.hasNextPage = res.pageInfo.hasNextPage
          this.list = res.edges.map((obj) => obj.node)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      getTagQuery () {
        return this.$graphql.query(`
          articleByTagName ($name, $first, $offset, $release) {
            totalCount
            edges {
              node {
                ...article
              }
              cursor
            },
            pageInfo {
              hasPrevPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        `, {
          first: this.count,
          offset: this.page * this.count,
          name: this.tag,
          release: true
        }, ['article'])
      },
      getArticleQuery () {
        return this.$graphql.query(`
          article ($first, $offset, $release) {
            totalCount
            edges {
              node {
                ...article
              }
              cursor
            }
            pageInfo {
              hasPrevPage
              hasNextPage
              startCursor
              endCursor
            }
          }
        `, {
          first: this.count,
          offset: this.page * this.count,
          release: true
        }, ['article'])
      },
      prevPage () {
        if (!this.hasPrevPage) return false

        this.$router.push({
          name: 'ArticleList',
          query: {
            tag: this.tag,
            page: this.page - 1 || undefined
          }
        })
      },
      nextPage () {
        if (!this.hasNextPage) return false

        this.$router.push({
          name: 'ArticleList',
          query: {
            tag: this.tag,
            page: this.page + 1
          }
        })
      },
      getTags () {
        this.$graphql.query(`
          tags {
            name
            count
          }
        `)
        .then((res) => {
          this.tags = res.sort((a, b) => b.count - a.count)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      digest (content) {
        return removeMd(content.slice(0, 88)) + '...'
      }
    },
    mounted () {
      this.getArticleList()
      this.getTags()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .article-list-view {
    display: flex;
    flex-direction: column;

    .view-title {
      text-align: center;
      margin: 20px;
      .tag-count {
        font-size: 16px;
        margin-left: 10px;
        color: #ccc;
      }
    }

    .article-list {
      position: relative;
      width: 650px;
      margin: 20px auto;

      ul {
        list-style: none;
      }

      li {
        position: relative;
        margin-bottom: 30px;
        border-radius: 3px;
        box-shadow: $shadow;
        overflow: hidden;
        background-color: $white;
        transition: transform .3s;

        .cover {
          width: 100%;
          height: 240px;
          overflow: hidden;

          span {
            display: block;
            width: 100%;
            height: 100%;
            background-color: $grey3;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            transition: all .5s .1s;

            &:hover {
              transform: scale(1.1);
            }
          }
        }

        .content {
          padding: 20px;

          .title {
            display: inline-block;
            font-size: 28px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: color .3s;

            &:hover {
              color: $blue_d3;
            }
          }

          .digest {
            color: $font1;
            font-size: 14px;
            margin-bottom: 20px;
            word-break: break-word;
            line-height: 1.4;
          }

          .info {
            font-size: 14px;
            color: $font;
            // font-style: italic;
            margin-bottom: 10px;
          }

          time {
            font-size: 13px;
            margin-left: 10px;
          }

          .comment-count {
            font-size: 13px;
            margin-left: 10px;
            color: $red_d3;
            text-decoration: none;
          }

          .tag-list {
            display: flex;
            @include flex-cross-center;

            .cat-icon {
              font-size: 20px;
              color: $grey2;
              margin-right: 10px;
            }
          }
        }

        .check-content {
          position: absolute;
          right: 15px;
          bottom: 15px;
          font-size: 13px;
          color: $blue;
          transition: all .3s;
          text-decoration: none;

          &:hover {
            color: $yellow;
          }
        }
      }

      .pagination {
        margin: 40px 0;
        @include flex-center;

        a {
          margin: 0 30px;
          color: $font1;
          font-size: 14px;
          text-decoration: none;
          transition: all .3s;

          &:hover {
            color: $blue;
          }

          &.disabled {
            opacity: .2;
            cursor: not-allowed;
          }
        }
      }

      .tags-list {
        position: absolute;
        left: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 40px;

        h1 {
          font-size: 18px;
        }

        .tag {
          margin-top: 3px;
          margin-bottom: 3px;
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
    }

    .no-article {
      font-size: 30px;
      margin-top: 50px;
      text-align: center;
      color: $font2;
    }
  }
</style>
