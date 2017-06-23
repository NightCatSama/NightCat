<template>
  <div class="admin-links-view">
    <!--侧边按钮组-->
    <aside class="aside">
      <div class="radius-btn blue" @click="openModal('add')">
        <Icon name="plus" :size="24"></Icon>
      </div>
      <div class="radius-btn yellow" @click="openModal('edit')">
        <Icon name="post" :size="24"></Icon>
      </div>
      <div class="radius-btn red" @click="deleteLink">
        <Icon name="delete" :size="24"></Icon>
      </div>
    </aside>

    <div class="admin-main">
      <div v-for="(link, i) in list" :class="['link-item', { active: active === i }]" @click="active = i">
        <div class="avatar" :style="{ backgroundImage: `url(${link.avatar})`}"></div>
        <div class="info">
          <div class="name">{{ link.name }}</div>
          <div class="bio">{{ link.bio }}</div>
          <div class="link-wrap">Link: <a :href="link.link" class="link" target="_blank">{{ link.link }}</a></div>
        </div>
      </div>
    </div>

    <!--添加模态框-->
    <Modal v-model="addModalShow" class-name="link-modal">
      <Input label="名字" v-model="name"></Input>
      <Input label="头像" v-model="avatar"></Input>
      <Input label="简述" v-model="bio"></Input>
      <Input label="链接" v-model="link"></Input>
      <Btn v-if="type === 'add'" @click="addLink">OK</Btn>
      <Btn v-if="type === 'edit'" @click="editLink">OK</Btn>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'admin-links',
    data () {
      return {
        name: '',
        avatar: '',
        bio: '',
        link: '',
        addModalShow: false,
        active: null,
        type: 'add',
        list: []
      }
    },
    methods: {
      getLinks () {
        this.$graphql.query(`
          links {
            ...link
          }
        `, ['link'])
        .then((res) => {
          this.list = res
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      editLink () {
        let { name, bio, link, avatar } = this
        this.$graphql.mutation(`
          updateLink ($id, $name, $bio, $link, $avatar) {
            ...link
          }
        `, {
          id: this.list[this.active]._id,
          name,
          bio,
          link,
          avatar
        }, ['link'])
        .then((res) => {
          this.$toast('修改成功', 'success')
          this.addModalShow = false
          this.list = res
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      addLink () {
        let { name, bio, link, avatar } = this
        this.$graphql.mutation(`
          addLink ($name, $bio, $link, $avatar) {
            ...link
          }
        `, {
          name,
          bio,
          link,
          avatar
        }, ['link'])
        .then((res) => {
          this.$toast('添加成功', 'success')
          this.addModalShow = false
          this.list = res
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      deleteLink () {
        if (this.active === null) {
          return this.$toast('请选中一个需要删除的链接', 'warning')
        }

        let index = this.active
        this.$prompt(`确定删除${this.list[index].name}吗?`, () => {
          this.$graphql.mutation(`
            removeLink ($id) {
              ...link
            }
          `, {
            id: this.list[index]._id
          }, ['link'])
          .then((res) => {
            this.$toast('删除成功', 'success')
            this.list = res
            this.active = null
          })
          .catch((err) => this.$toast(err.message, 'error'))
        })
      },
      openModal (type) {
        if (type === 'edit') {
          if (this.active === null) {
            return this.$toast('请选中一个需要编辑的链接', 'warning')
          }
          let { name, bio, link, avatar } = this.list[this.active]
          this.name = name
          this.bio = bio
          this.link = link
          this.avatar = avatar
        }
        else {
          this.name = ''
          this.bio = ''
          this.link = ''
          this.avatar = ''
        }

        this.type = type
        this.addModalShow = true
      }
    },
    mounted () {
      this.getLinks()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .admin-links-view {
    position: relative;
    flex: 1;
    margin: 20px 0;
    display: flex;

    .link-modal {
      @include flex-center(flex, column);

      button {
        margin-top: 20px;
        align-self: stretch;
      }
    }

    .admin-main {
      display: block!important;
    }

    .link-item {
      height: 140px;
      width: 30%;
      overflow: hidden;
      @include flex-cross-center(inline-flex);
      box-shadow: $shadow;
      padding: 10px;
      margin: 10px;

      &.active {
        outline: 2px solid $blue;
      }

      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 3px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        background-color: $grey1;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        padding: 20px;

        .name {
          font-size: 20px;
          margin-bottom: 5px;
        }

        .bio {
          color: $grey1;
          margin-bottom: 25px;
          font-size: 14px;
        }

        .link-wrap {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .link {
          font-size: 12px;
          color: $blue;
        }
      }
    }
  }
</style>

