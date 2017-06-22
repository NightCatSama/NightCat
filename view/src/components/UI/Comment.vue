<template>
  <div :class="wrap_class">
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
            placeholder="说点什么吧 ~"
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
      <router-link v-else to="/login" tag="div" class="no-sign">
        登录后方可评论
      </router-link>
    </section>

    <!-- 评论列表区块 -->
    <section class="comment-list">
      <Loadmore @load-method="getComments" :done="!hasNextPage">
        <div v-for="(comment, i) in comments" class="comment-item">
          <aside class="floor">#{{ comment.floor }}</aside>
          <img :src="comment.user.avatar" alt="avatar" class="avatar">
          <div class="comment-main">
            <div class="meta">
              <router-link :to="{
                name: 'UserDetail',
                params: {
                  account: comment.user.account
                }
              }" tag="span" class="comment-account">
              {{ comment.user.account }}
              </router-link>
              <time>评论于 {{ comment.created_at }}</time>
            </div>
            <div class="content markdown-body" v-html="comment.view"></div>

            <!-- 回复列表区块 -->
            <section class="reply-list">
              <div v-for="(reply, j) in comment.reply" class="comment-item">
                <img :src="reply.user.avatar" alt="avatar" class="avatar">
                <div class="comment-main">
                  <div class="meta">
                    <span class="comment-account">
                      <router-link :to="{
                        name: 'UserDetail',
                        params: {
                          account: reply.user.account
                        }
                      }" tag="span">
                      {{ reply.user.account }}
                      </router-link>
                      <span class="target-account">
                        回复
                        <router-link :to="{
                          name: 'UserDetail',
                          params: {
                            account: reply.target_user.account
                          }
                        }" tag="span">
                        {{ reply.target_user.account }}
                        </router-link>
                        ：
                      </span>
                    </span>
                    <time>回复于 {{ reply.created_at }}</time>
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
      </Loadmore>
      <div class="loadmore-btn" v-if="oneFloor" @click="checkAllComment">查看全部评论</div>
    </section>
  </div>
</template>

<script>
  const prefixCls = 'cat-comment'
  import { getClass } from '@/assets/tools'

  export default {
    name: 'Comment',
    props: {
      type: {
        type: String,
        default: 'article'
      },
      id: String
    },
    data () {
      return {
        comment: '',
        comments: [],
        comment_cursor: '',
        reply_content: '',
        target_user: '',
        target_user_account: '',
        reply_index: null,
        comment_limit: 200,
        offset: this.$route.query.floor ? (+this.$route.query.floor - 1) : null,
        hasNextPage: false
      }
    },
    computed: {
      wrap_class () {
        return getClass(prefixCls, [
          ''
        ])
      },
      user () {
        return this.$store.state.user
      },
      oneFloor () {
        return typeof this.offset === 'number' && !Number.isNaN(this.offset)
      }
    },
    methods: {
      getArticle () {
        return this.$graphql.query(`
          comments ($article_id, $first, $after, $offset) {
            totalCount
            edges {
              node {
                ...comment
              }
              cursor
            }
            pageInfo {
              hasNextPage,
              endCursor
            }
          }
        `, {
          article_id: this.id,
          first: this.oneFloor ? 1 : 10,
          offset: this.offset || 0,
          after: this.comment_cursor
        }, ['comment'])
      },
      getIndieComments () {
        return this.$graphql.query(`
          indieComments ($type, $first, $after, $offset) {
            totalCount,
            edges {
              node {
                ...comment
              }
              cursor
            }
            pageInfo {
              hasNextPage,
              endCursor
            }
          }
        `, {
          type: this.type,
          first: this.oneFloor ? 1 : 10,
          offset: this.offset || 0,
          after: this.comment_cursor
        }, ['comment'])
      },
      getComments (next, error) {
        let query = this.type === 'article' ? 'getArticle' : 'getIndieComments'

        this[query]()
        .then((res) => {
          next && next()
          this.hasNextPage = this.oneFloor ? false : res.pageInfo.hasNextPage
          this.comment_cursor = res.pageInfo.endCursor
          this.comments = this.comments.concat(res.edges.map((edge) => edge.node))
          this.$emit('update:totalCount', res.totalCount)
        })
        .catch((err) => {
          this.$toast(err.message, 'error')
          error && error(err.message)
        })
      },
      addArticleComment () {
        return this.$graphql.mutation(`
          addComment ($article_id, $content) {
            ...comment
          }
        `, {
          article_id: this.id,
          content: this.comment
        }, ['comment'])
      },
      addIndieComment () {
        return this.$graphql.mutation(`
          addIndieComment ($type, $content) {
            ...comment
          }
        `, {
          type: this.type,
          content: this.comment
        }, ['comment'])
      },
      addComment () {
        if (!this.comment) return this.$toast('评论不能为空', 'warning')

        let query = this.type === 'article' ? 'addArticleComment' : 'addIndieComment'
        this[query]()
        .then((res) => {
          this.$toast('发送成功', 'success')
          this.comment = ''
          this.comments.unshift(res)
          this.$emit('addComment')
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
            ...reply
          }
        `, {
          comment_id: id,
          target_user: this.target_user,
          content: this.reply_content
        }, ['reply'])
        .then((res) => {
          this.$toast('回复成功', 'success')
          this.reply_content = ''
          this.reply_index = null
          this.comments[index].reply.push(res)
          this.$emit('addReply')
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      checkAllComment () {
        this.comments = []
        this.offset = null
        this.comment_cursor = ''
        this.getComments()
      },
      onTab (e, content) {
        let start = e.target.selectionStart
        this[content] = this[content].substr(0, start) + '  ' + this[content].substr(start)
        this.$nextTick()
        .then(() => {
          e.target.selectionStart = start + 2
          e.target.selectionEnd = start + 2
        })
      }
    },
    mounted () {
      this.getComments()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  $prefixCls: cat-comment;
  $width: 800px;

  .#{$prefixCls} {
    width: $width;

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
          margin: 10px 0;
          min-height: 60px;
          white-space: pre-wrap;
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
