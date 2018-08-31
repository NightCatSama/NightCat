<template>
  <div class="admin-add-article">
    <!--侧边按钮组-->
    <aside class="aside">
      <router-link class="radius-btn blue" :to="{ name: 'Admin-Article' }" exact>
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
          <span v-for="tag in tags" class="tag">
            {{ tag.name }}
          </span>
          <Icon name="plus-circle-o" @click.native="modalShow = true"></Icon>
        </label>
      </div>
      <div class="content-area">
        <mavon-editor ref="md" v-model="content" :ishljs="true" @change="updateDisplay" @imgAdd="$imgAdd" />
        <!--编辑区域-->
        <!--<div class="edit-area" data-area="Edit">-->
          <!--<textarea ref="edit" v-model="content" @input="updateDisplay" @keydown.tab.prevent="onTab"></textarea>-->
        <!--</div>-->
        <!--展示区域-->
        <!--<div class="display-area" data-area="Display">-->
          <!--<div ref="view" class="markdown-body" v-html="view"></div>-->
        <!--</div>-->
      </div>
    </div>

    <!--标签模态框-->
    <Modal v-model="modalShow" class-name="modal" type="top">
      <div v-if="allTags.length === 0">
        暂无标签
      </div>
      <div v-else>
        <h1>Tag</h1>
        <hr />
        <div v-for="(tag, i) in allTags" :class="['tag-badge', { active: isActive(tag) }]" @click="clickTag(tag)">
          {{ tag.name }}
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  // import md from '@/assets/markdown'

  export default {
    name: 'admin-add-article',
    data () {
      return {
        type: this.$route.name === 'Admin-AddArticle' ? 'add' : 'edit',
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
    mounted () {
      this.getTags()
      this.type === 'edit' ? this.getArticleContent() : this.getDraft()
    },
    computed: {
      typeWord () {
        return this.type === 'add' ? '确定添加文章吗？' : '确定保存文章吗？'
      }
    },
    methods: {
      $imgAdd(pos, $file){
        // 第一步.将图片上传到服务器.
        let formdata = new FormData();
        formdata.append('image', $file);
        this.$http({
          url: '/uploadImg',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((url) => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          this.$refs.md.$img2Url(pos, url);
        })
      },
      updateDisplay () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
        }

        this.timer = setTimeout(() => {
          this.setDraft()
          // this.view = md.render(this.content)
          // this.$nextTick(() => this.syncScrollTop())
        }, 200)
      },
      syncScrollTop () {
        let { scrollTop, scrollHeight, clientHeight } = this.$refs.edit
        this.$refs.view.scrollTop = ((scrollTop + clientHeight) / scrollHeight) * this.$refs.view.scrollHeight - clientHeight
      },
      editArticle () {
        if (!this.title) return this.$toast('标题不能为空', 'warning')
        if (!this.content) return this.$toast('内容不能为空', 'warning')
        // TODO
        // this.$prompt(this.typeWord, () => {
        //   this.type === 'add' ? this.addArticle() : this.updateArticle()
        // })
        this.type === 'add' ? this.addArticle() : this.updateArticle()
      },
      addArticle () {
        let { title, content, cover } = this
        let tags = this.tags.map((tag) => tag._id)
        this.$graphql.mutation(`
          addArticle ($title, $content, $cover, $tags) {
            title
          }
        `, {
          title,
          content,
          cover,
          tags
        })
        .then((res) => {
          this.clearDraft()
          this.$toast('添加成功', 'success')
          .then(() => this.$router.replace({ name: 'Admin-Article' }))
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      updateArticle () {
        let { title, content, cover } = this
        let tags = this.tags.map((tag) => tag._id)
        this.$graphql.mutation(`
          updateArticle ($id, $title, $content, $cover, $tags) {
            title
          }
        `, {
          id: this.$route.params.id,
          title,
          content,
          cover,
          tags
        })
        .then((res) => {
          this.clearDraft()
          this.$toast('保存成功', 'success')
          .then(() => this.$router.replace({ name: 'Admin-Article' }))
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
            ...tag
          }
        `, ['tag'])
        .then((res) => {
          this.allTags = res
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      clickTag (obj) {
        let index = -1
        Array.from(this.tags, (t, i) => {
          if (t._id === obj._id) {
            index = i
          }
        })
        if (index > -1) {
          this.tags.splice(index, 1)
        }
        else {
          this.tags.push(obj)
        }
      },
      getDraft () {
        let content = window.localStorage.getItem('content')
        let title = window.localStorage.getItem('title')
        let cover = window.localStorage.getItem('cover')
        let tags = window.localStorage.getItem('tags')

        if (content) {
          this.content = content
          // this.view = md.render(this.content)
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
      },
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
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      isActive (obj) {
        return this.tags.some((t, i) => t._id === obj._id)
      }
    },
  }
</script>
<style lang="scss">
  @import '~style';

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
        opacity: .6;
      }
    }

    .edit-area {
      border-right: 1px dashed $grey2;

      textarea {
        position: relative;
        z-index: 2;
        width: 100%;
        height: 100%;
        padding: 20px;
        border: none;
        resize: none;
        outline: none;
        overflow: auto;
        background-color: $tr;
      }
    }

    .markdown-body {
      width: 100%;
      z-index: 990;
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

  .admin-add-article {
    .modal {
      padding: 80px 60px;

      h1 {
        margin-bottom: 10px;
      }

      hr {
        margin-bottom: 20px;
      }

      button {
        margin-top: 20px;
        width: 150px;
      }
    }
  }
</style>
