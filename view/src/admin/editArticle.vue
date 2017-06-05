<template>
  <div class="admin-add-article">
    <!--侧边按钮组-->
    <aside class="aside">
      <router-link class="radius-btn" :to="{ name: 'Admin-Article' }" exact>
        <Icon name="bars" :size="24"></Icon>
      </router-link>
      <div class="radius-btn green" @click="editArticle">
        <Icon name="check" :size="24"></Icon>
      </div>
    </aside>

    <!--主体-->
    <div class="admin-main">
      <!--其他区域-->
      <div class="other-area">
        <label for="title">
          Title:
        <input id="title" type="text" v-model="title" @input="setDraft" />
        </label>
        <label for="cover">
          Cover:
        <input id="cover" type="text" v-model="cover" @input="setDraft" />
        </label>
        <label for="tag">
          Tag:
          <span v-for="name in tags" class="tag">
            {{ name }}
          </span>
          <Icon name="plus-circle-o" @click.native="modalShow = true"></Icon>
        </label>
      </div>
      <div class="content-area">
        <!--编辑区域-->
        <div class="edit-area" data-area="Edit">
          <textarea ref="edit" v-model="content" @input="updateDisplay" @keydown.tab.prevent="onTab"></textarea>
        </div>
        <!--展示区域-->
        <div class="display-area" data-area="Display">
          <div class="markdown-body" v-html="view"></div>
        </div>
      </div>
    </div>

    <!--标签模态框-->
    <Modal v-model="modalShow" class-name="modal" type="top">
      <div v-if="allTags.length === 0">
        暂无标签
      </div>
      <div v-else v-for="(tag, i) in allTags" :class="['tag-badge', { active: tags.indexOf(tag) > -1 }]" @click="clickTag(tag)">
        {{ tag }}
      </div>
    </Modal>
  </div>
</template>

<script>
  import MarkdownIt from 'markdown-it'
  import hljs from 'highlight.js'
  import 'github-markdown-css'

  let md = new MarkdownIt({
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
                hljs.highlight(lang, str, true).value +
                '</code></pre>'
        } catch (__) {}
      }

      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
  })

  export default {
    name: 'admin-add-article',
    data () {
      return {
        type: this.$route.params.type,
        modalShow: false,
        content: '',
        title: '',
        cover: '',
        view: '',
        allTags: [],
        tags: [],
        timer: null
      }
    },
    computed: {
      typeWord () {
        return this.type === 'add' ? '确定添加文章吗？' : '确定保存文章吗？'
      }
    },
    methods: {
      updateDisplay () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }

        this.timer = setTimeout(() => {
          this.setDraft()
          this.view = md.render(this.content)
        }, 300)
      },
      editArticle () {
        if (!this.title) return this.$toast('标题不能为空', 'warning')
        if (!this.content) return this.$toast('内容不能为空', 'warning')

        this.$prompt(this.typeWord, () => {
          this.type === 'add' ? this.addArticle() : this.updateArticle()
        })
      },
      addArticle () {
        this.$graphql.mutation(`
          addArticle (title: "${this.title}", content: ${JSON.stringify(this.content)}, cover: "${this.cover}", tags: ${JSON.stringify(JSON.stringify(this.tags))}) {
            author
          }
        `)
        .then((res) => {
          this.clearDraft()
          this.$toast('添加成功', {
            type: 'success',
            callback: () => {
              this.$router.replace({
                name: 'Admin-Article'
              })
            }
          })
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      updateArticle () {
        this.$graphql.mutation(`
          updateArticle (id: "${this.$route.params.id}", title: "${this.title}", content: ${JSON.stringify(this.content)}, cover: "${this.cover}", tags: ${JSON.stringify(JSON.stringify(this.tags))}) {
            author
          }
        `)
        .then((res) => {
          this.clearDraft()
          this.$toast('保存成功', {
            type: 'success',
            callback: () => {
              this.$router.replace({
                name: 'Admin-Article'
              })
            }
          })
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      onTab () {
        let start = this.$refs.edit.selectionStart
        this.content = this.content.substr(0, start) + '  ' + this.content.substr(start)
        this.$nextTick()
        .then(() => {
          this.$refs.edit.selectionStart = start + 2
          this.$refs.edit.selectionEnd = start + 2
        })
      },
      getTags () {
        this.$graphql.query(`
          tags {
            name
          }
        `)
        .then((res) => {
          this.allTags = Array.from(res, (tag) => tag.name)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      clickTag (tag) {
        let index = this.tags.indexOf(tag)
        if (index > -1) {
          this.tags.splice(index, 1)
        }
        else {
          this.tags.push(tag)
        }
      },
      getDraft () {
        let content = window.localStorage.getItem('content')
        let title = window.localStorage.getItem('title')
        let cover = window.localStorage.getItem('cover')
        let tags = window.localStorage.getItem('tags')

        if (content) {
          this.content = content
          this.view = md.render(this.content)
        }

        if (title) {
          this.title = title
        }

        if (cover) {
          this.cover = cover
        }

        if (tags) {
          this.tags = JSON.parse(tags)
        }
      },
      setDraft () {
        window.localStorage.setItem('content', this.content)
        window.localStorage.setItem('title', this.title)
        window.localStorage.setItem('cover', this.cover)
        window.localStorage.setItem('tags', JSON.stringify(this.tags))
      },
      clearDraft () {
        window.localStorage.removeItem('content')
        window.localStorage.removeItem('title')
        window.localStorage.removeItem('cover')
        window.localStorage.removeItem('tags')
      }
    },
    mounted () {
      this.getTags()
      this.getDraft()
    },
    destroyed () {
      this.type === 'edit' && this.clearDraft()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/index';

  .admin-add-article {
    position: relative;
    flex: 1;
    display: flex;
    margin: 20px 0;

    .admin-main {
      padding: 0;
      flex-direction: column;
    }

    .other-area {
      display: flex;
      align-items: center;
      height: 50px;
      border-bottom: 1px dashed $grey2;
      background-color: $grey5;
      padding: 0 20px;

      label {
        font-size: 16px;
        font-weight: bold;
      }

      input {
        border: 0;
        padding: 4px 2px;
        outline: none;
        border-bottom: 1px solid $grey2;
        background-color: $tr;
        margin-right: 20px;
        font-size: 14px;
        width: 240px;
        transition: all .3s;

        &:focus {
          border-bottom-color: $blue;
        }
      }

      .tag {
        font-weight: normal;
        margin: 0 5px;
        padding: 2px 6px;
        text-align: center;
        background-color: $blue;
        color: $white;
      }
    }

    .content-area {
      flex: 1;
      display: flex;
    }

    .edit-area, .display-area {
      position: relative;
      flex: 1;
      flex-shrink: 0;

      &::after {
        content: attr(data-area);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 60px;
        color: $grey4;
      }
    }

    .edit-area {
      border-right: 1px dashed $grey2;

      textarea {
        width: 100%;
        height: 100%;
       padding: 20px;
        border: none;
        resize: none;
        outline: none;
        overflow: auto;
      }
    }

    .display-area {

      .markdown-body {
        width: 100%;
        height: 100%;
        overflow: auto;
        padding: 20px;
      }
    }

    .tag-badge {
      display: inline-block;
      padding: 5px 12px;
      border: 2px solid $grey3;
      border-radius: 20px;
      cursor: pointer;
      transition: all .3s;
      margin-right: 10px;

      &:hover {
        border-color: $grey2;
      }

      &.active {
        color: $blue;
        border-color: $blue;
      }
    }
  }
</style>

<style lang="scss">
  @import '../style/index';

  .admin-add-article {
    .modal {
      padding: 20px;
      text-align: center;

      button {
        margin-top: 20px;
        width: 150px;
      }
    }
  }
</style>

