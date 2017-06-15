<template>
  <div class="view">
    <div :class="['wrap', { 'open-sidebar': open }]">
      <Sidebar ref="sidebar" :user="user"></Sidebar>
      <div ref="openBtn" class="open-btn" @click="open = !open">夜喵！</div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { on, off } from '@/assets/tools'

  export default {
    name: 'article',
    data () {
      return {
        open: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      }
    },
    methods: {
      handleDocumentClick (e) {
        if (!this.$refs.sidebar || this.$refs.sidebar.$el.contains(e.target) || this.$refs.openBtn.contains(e.target)) {
          return false
        }

        this.open = false
      }
    },
    mounted () {
      on(document, 'click', this.handleDocumentClick)
    },
    destroyed () {
      off(document, 'click', this.handleDocumentClick)
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .view {
    width: 100vw;
    min-height: 100vh;
    overflow-x: hidden;

    .wrap {
      display: flex;
      width: 100%;
      transition: transform .5s ease;

      &.open-sidebar {
        transform: translateX(280px);
      }
    }

    .open-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      cursor: pointer;
      padding: 5px 12px;
    }

    .main {
      flex: 1;
    }
  }
</style>
