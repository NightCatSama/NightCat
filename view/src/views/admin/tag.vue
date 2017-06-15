<template>
  <div class="admin-tag">
    <!--侧边按钮组-->
    <aside class="aside">
      <div class="radius-btn blue" @click="addModalShow = true">
        <Icon name="plus" :size="24"></Icon>
      </div>
      <div class="radius-btn red" @click="minusClick">
        <Icon name="delete" :size="24"></Icon>
      </div>
    </aside>

    <div class="admin-main">
      <div v-if="!list.length">暂无标签</div>
      <div v-for="(tag, i) in list" :class="['tag-badge', { active: active === i }]" @click="clickTag(i)">
        {{ tag.name }}
        {{ tag.count }}
      </div>
    </div>

    <!--添加模态框-->
    <Modal v-model="addModalShow" class-name="tag-modal">
      <Input label="name" v-model="name" @enter="addTag"></Input>
      <Btn @click="addTag">OK</Btn>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: 'admin-tag',
    data () {
      return {
        addModalShow: false,
        active: null,
        list: [],
        name: ''
      }
    },
    computed: {
      activeTag () {
        return this.list.length && this.active !== null ? this.list[this.active].name : ''
      }
    },
    methods: {
      getTags () {
        this.$graphql.query(`
          tags {
            name,
            count
          }
        `)
        .then((res) => {
          this.list = res
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      addTag () {
        this.$graphql.mutation(`
          addTag ($name) {
            name
          }
        `, {
          name: this.name
        })
        .then((res) => {
          this.$toast('添加成功', 'success')
          this.addModalShow = false
          this.getTags()
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      removeTag () {
        this.$graphql.mutation(`
          removeTag ($name) {
            name
          }
        `, {
          name: this.activeTag
        })
        .then((res) => {
          this.$toast('删除成功', 'success')
          this.active = null
          this.getTags()
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      clickTag (i) {
        this.active = i === this.active ? null : i
      },
      minusClick () {
        if (!this.activeTag) {
          return this.$toast('请先选中一个标签', 'warning')
        }
        this.$prompt('确定删除该标签吗？', this.removeTag)
      }
    },
    mounted () {
      this.getTags()
    }
  }
</script>

<style lang="scss" scoped>
  @import '~style';

  .admin-tag {
    position: relative;
    flex: 1;
    margin: 20px 0;
    display: flex;

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

    .admin-main {
      align-items: baseline;
    }
  }
</style>

<style lang="scss">
  @import '../../style/index';

  .tag-modal {
    @include flex-center(flex, column);

    button {
      margin-top: 20px;
      align-self: stretch;
    }
  }
</style>

