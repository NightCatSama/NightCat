<template>
  <div class="links-view">
    <section class="links-main">
      <h1 class="title">Links</h1>
      <div class="links-wrap">
        <a v-for="(link, i) in list" class="link-item" :href="link.link" target="_blank">
          <div class="avatar" :style="{ backgroundImage: `url(${link.avatar})`}"></div>
          <div class="info">
            <div class="name">{{ link.name }}</div>
            <div class="bio">{{ link.bio }}</div>
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'links',
    data () {
      return {
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
      }
    },
    mounted () {
      this.getLinks()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .links-view {
    min-height: 100vh;
    overflow: hidden;
    @include flex-cross-center;
    flex-direction: column;

    .links-main {
      width: 800px;
      margin: 200px 0;

      .title {
        margin-bottom: 20px;
      }
    }

    .link-item {
      height: 140px;
      width: 380px;
      background-color: $white;
      overflow: hidden;
      display: inline-flex;
      box-shadow: $paper-shadow;
      padding: 10px;
      margin: 0 20px 20px 0;
      text-decoration: none;
      color: $font;
      transition: all .3s;

      &:hover {
        transform: scale(1.05);
        box-shadow: $near-shadow;
      }

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
        overflow: hidden;
        padding: 10px 20px;

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
