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
    <div class="line" :data-title="comment_count ? `${comment_count} 条评论` : '评论区'"></div>

    <!-- 评论区块 -->
    <section class="comment">
      <div v-if="user" class="comment-form">
        <img :src="user.avatar" alt="avatar" class="avatar">
        <div class="comment-wrap">
          <textarea
            v-model="comment"
            name="comment"
            id="comment"
            rows="6"
            placeholder="球球你，说点什么吧 ~"
            @keydown.tab.prevent="onTab($event, 'comment')"
          >
          </textarea>
          <span :class="['word-limit', { red: comment.length > comment_limit }]">{{ comment.length }} / {{ comment_limit }}</span>
          <aside>温馨提示：只有绑定邮箱的用户会受到回复提示邮件</aside>
          <Btn class="send-btn" @click="addComment" suffix="send">
            发送
          </Btn>
        </div>
      </div>
      <div v-else class="no-sign">
        登录后方可评论
      </div>
    </section>

    <!-- 评论列表区块 -->
    <section class="comment-list">
      <div v-for="(comment, i) in comments" class="comment-item">
        <aside class="floor">#{{ i + 1 }}</aside>
        <img :src="comment.user.avatar" alt="avatar" class="avatar">
        <div class="comment-main">
          <div class="meta">
            <span class="comment-account">{{ comment.user.account }}</span>
            <time>{{ comment.created_at }}</time>
          </div>
          <div class="content markdown-body" v-html="comment.view"></div>

          <!-- 回复列表区块 -->
          <section class="reply-list">
            <div v-for="(reply, j) in comment.reply" class="comment-item">
              <img :src="reply.user.avatar" alt="avatar" class="avatar">
              <div class="comment-main">
                <div class="meta">
                  <span class="comment-account">
                    {{ reply.user.account }}
                    <span class="target-account">
                      回复 {{ reply.target_user.account }}：
                    </span>
                  </span>
                  <time>{{ reply.created_at }}</time>
                </div>
                <div class="content markdown-body" v-html="reply.view"></div>
              </div>
              <span v-if="user && reply_index !== i" class="reply-btn" @click="openReply(i, reply.user)">回复</span>
            </div>

            <!-- 回复区块 -->
            <template v-if="user && reply_index === i">
              <div class="comment-form">
                <img :src="user.avatar" alt="avatar" class="avatar">
                <div class="comment-wrap">
                  <textarea
                    v-model="reply_content"
                    name="reply"
                    id="reply"
                    rows="6"
                    :placeholder="`回复 ${target_user_account} ：`"
                    @keydown.tab.prevent="onTab($event, 'reply_contnt')"
                  >
                  </textarea>
                  <span :class="['word-limit', { red: reply_content.length > comment_limit }]">{{ reply_content.length }} / {{ comment_limit }}</span>
                  <aside>温馨提示：只有绑定邮箱的用户会受到回复提示邮件</aside>
                  <Btn class="send-btn" @click="addReply(comment._id)" suffix="send">
                    发送
                  </Btn>
                </div>
              </div>
            </template>

          </section>
          <span v-if="user && reply_index !== i" class="reply-btn" @click="openReply(i, comment.user)">回复</span>
          <span v-else-if="user" class="reply-btn" @click="reply_index = null">取消回复</span>
        </div>
      </div>
      <div class="loadmore-btn" v-if="hasNextPage" @click="getComments">加载更多</div>
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
        comment_count: 0,
        created_at: null,
        tags: [],
        comment: '',
        comments: [],
        comment_cursor: '',
        reply_content: '',
        target_user: '',
        target_user_account: '',
        reply_index: null,
        comment_limit: 200,
        hasNextPage: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      onTab (e, content) {
        let start = e.target.selectionStart
        this[content] = this[content].substr(0, start) + '  ' + this[content].substr(start)
        this.$nextTick()
        .then(() => {
          e.target.selectionStart = start + 2
          e.target.selectionEnd = start + 2
        })
      },
      getArticleContent () {
        this.$graphql.query(`
          getArticleById ($id) {
            title,
            author,
            content,
            view,
            cover,
            comment_count,
            created_at,
            tags {
              _id,
              name
            }
          }
        `, {
          id: this.$route.params.id
        })
        .then((res) => {
          Object.assign(this, res)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      getComments () {
        this.$graphql.query(`
          comments ($article_id, $first, $after) {
            edges {
              node {
                _id,
                view,
                created_at,
                user {
                  _id,
                  account,
                  avatar
                },
                reply {
                  view,
                  created_at,
                  target_user {
                    _id,
                    account,
                    avatar
                  },
                  user {
                    _id,
                    account,
                    avatar
                  }
                }
              }
              cursor
            }
            pageInfo {
              hasNextPage,
              endCursor
            }
          }
        `, {
          article_id: this.$route.params.id,
          first: 10,
          after: this.comment_cursor
        })
        .then((res) => {
          this.hasNextPage = res.pageInfo.hasNextPage
          this.comment_cursor = res.pageInfo.endCursor
          this.comments = this.comments.concat(res.edges.map((edge) => edge.node))
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      addComment () {
        if (!this.comment) return this.$toast('评论不能为空', 'warning')

        this.$graphql.mutation(`
          addComment ($article_id, $content) {
            _id,
            view,
            created_at,
            reply {
              view,
              created_at,
              target_user {
                _id,
                account,
                avatar
              },
              user {
                _id,
                account,
                avatar
              }
            },
            user {
              _id,
              account,
              avatar
            }
          }
        `, {
          article_id: this.$route.params.id,
          content: this.comment
        })
        .then((res) => {
          this.$toast('发送成功', 'success')
          this.comment = ''
          this.comments.unshift(res)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      openReply (index, obj) {
        this.reply_index = index
        this.target_user = obj._id
        this.target_user_account = obj.account
      },
      addReply (id) {
        if (!this.reply_content) return this.$toast('回复不能为空', 'warning')

        let index = this.reply_index

        this.$graphql.mutation(`
          addReply ($comment_id, $content, $target_user) {
            _id,
            view,
            created_at,
            target_user {
              _id,
              account,
              avatar
            },
            user {
              _id,
              account,
              avatar
            }
          }
        `, {
          comment_id: id,
          target_user: this.target_user,
          content: this.reply_content
        })
        .then((res) => {
          this.$toast('回复成功', 'success')
          this.reply_content = ''
          this.reply_index = null
          this.comments[index].reply.push(res)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      }
    },
    mounted () {
      this.getArticleContent()
      this.getComments()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  $width: 800px;

  .article-view {
    background-color: $white;
    @include flex-cross-center(flex, column);

    .cover {
      width: 100%;
      height: 60vh;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      background-color: $grey1;
    }

    article {
      margin: 80px auto;
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
        background-color: $white;
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

    .comment {
      width: $width;
      margin-bottom: 20px;
      padding: 20px;

      .no-sign {
        @include flex-center;
        background-color: #ccc;
        color: $font1;
        font-size: 32px;
        height: 160px;
        width: 100%;
      }
    }

    .comment-list {
      width: $width;
      margin-bottom: 30px;

      .comment-item {
        position: relative;
        display: flex;
        margin-bottom: 20px;
        background-color: #fefefe;
        padding: 20px;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, .16);

        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 3px;
          margin-right: 10px;
        }

        .comment-main {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .meta {
          display: flex;
          justify-content: space-between;

          .comment-account {
            font-size: 16px;
            font-weight: bold;
            color: $blue_d2;

            .target-account {
              font-size: 13px;
              color: $blue_d3;
            }
          }

          time {
            font-size: 12px;
            color: $blue_d3;
          }
        }

        .content {
          font-size: 14px;
          margin: 10px 0;
          min-height: 60px;
          white-space: pre-line;
          word-break: break-word;
        }

        .reply-btn {
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 12px;
          color: $blue;
          opacity: 1;
          cursor: pointer;
          transition: opacity .2s;
        }
      }
    }

    .loadmore-btn {
      text-align: center;
      margin: 50px 0 40px;
      cursor: pointer;
      font-size: 18px;
    }

    .floor {
      position: absolute;
      left: -5px;
      top: 0;
      font-size: 12px;
      color: $font2;
      white-space: nowrap;
      transform: translateX(-100%);
    }
  }
</style>
