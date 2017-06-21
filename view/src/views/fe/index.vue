<template>
  <div class="view">
    <Sidebar
      ref="sidebar"
      :user="user"
      :class="['sidebar', { 'open-sidebar': open }]"
      @close="open = false"
    >
    </Sidebar>
    <div
      ref="openBtn"
      :class="['open-btn', { 'open-sidebar': open }]"
      @click="open = !open"
    >
      夜喵！
    </div>
    <div :class="['main', { 'open-sidebar': open }]">
      <router-view></router-view>
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

    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      z-index: 1;
      transform: translateX(-100%);
      transition: transform .4s ease;

      &.open-sidebar {
        transform: translateX(0);
      }
    }

    .open-btn {
      position: fixed;
      top: 20px;
      left: 20px;
      cursor: pointer;
      padding: 5px 12px;
      z-index: 1;
      transition: transform .4s ease;

      &.open-sidebar {
        transform: translateX(280px);
      }
    }

    .main {
      flex: 1;
      transition: transform .4s ease;

      &.open-sidebar {
        transform: translateX(280px);
      }
    }
  }
</style>
