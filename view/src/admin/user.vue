<template>
  <div class="admin-user">
    <ul class="user-list">
      <li v-for="(user, i) in list" :class="{ active: active === i }" @click="active = i">
        <img :src="user.avatar" alt="avatar" />
        <div class="account">
          {{ user.account }}
        </div>
        <span v-if="user.admin" class="admin-badge">管理员</span>
      </li>
      <Btn class="next-btn" v-show="hasNextPage" @click="getUserList">Loadmore</Btn>
    </ul>
    <div class="user-main">
      <template v-if="userInfo">
        <div class="user-info">
          <div class="user-info-item">账号：{{ userInfo.account }}</div>
          <div class="user-info-item">昵称：{{ userInfo.name }}</div>
          <div class="user-info-item">邮箱：{{ userInfo.email }}</div>
          <div class="user-info-item">概况：{{ userInfo.profile }}</div>
          <div class="user-info-item">位置：{{ userInfo.location }}</div>
          <div class="user-info-item">Github：{{ userInfo.github }}</div>
          <div class="user-info-item">网站：{{ userInfo.website }}</div>
          <Btn class="user-info-item" @click="setAdmin">{{ userInfo.admin ? '取消管理员' : '设置管理员' }}</Btn>
        </div>
        <div class="avatar-group">
          <img :src="userInfo.avatar" alt="avatar" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Admin-User',
    props: {
    },
    data () {
      return {
        hasNextPage: true,
        page: 0,
        list: [],
        data: {},
        active: 0
      }
    },
    watch: {
      account (val) {
        if (val && !this.data[val]) {
          this.getUserInfo(val)
        }
      }
    },
    computed: {
      account () {
        return this.list.length ? this.list[this.active].account : ''
      },
      userInfo () {
        return this.data[this.account]
      }
    },
    methods: {
      getUserInfo (account) {
        this.$graphql.query(`
          user (account: "${account}") {
            account,
            name,
            email,
            avatar,
            profile,
            location,
            github,
            website,
            active,
            admin
          }
        `)
        .then((res) => {
          this.updateData({ [account]: res })
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      updateData (data) {
        this.data = Object.assign({}, this.data, data)
      },
      setAdmin () {
        let account = this.account
        let index = this.active

        this.$graphql.mutation(`
          setAdmin (account: "${account}") {
            admin
          }
        `)
        .then((res) => {
          this.$toast('设置成功', 'success')
          this.data[account].admin = res.admin
          this.list[index].admin = res.admin
          this.$forceUpdate()
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      getUserList () {
        this.$graphql.query(`
          users (first: 10, after: "${this.cursor || ''}") {
            edges {
              node {
                account,
                name,
                email,
                avatar,
                admin
              }
              cursor
            }
            pageInfo {
              hasNextPage,
              endCursor
            }
          }
        `)
        .then((res) => {
          this.hasNextPage = res.pageInfo.hasNextPage
          this.list = this.list.concat(res.edges.map((obj) => obj.node))
          this.cursor = res.pageInfo.endCursor
        })
        .catch((err) => this.$toast(err.message, 'error'))
      }
    },
    mounted () {
      this.getUserList()
    }
  }
</script>

<style lang="scss" scoped>
  @import '../style/index';

  .admin-user {
    flex: 1;
    margin: 20px 0;
    display: flex;

    .user-list {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
      width: 300px;
      background-color: $white;

      li {
        height: 120px;
        @include flex-cross-center;
        padding: 20px;
        border-bottom: 1px solid #eee;
        cursor: pointer;

        img {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          margin-right: 20px;
        }

        &.active {
          background-color: $green_l3;
          color: $white;
        }
      }

      .next-btn {
        border: none;
        border-radius: 0;
        background-color: $grey4;
        color: $font1;
        height: 44px;
      }
    }

    .user-main {
      position: relative;
      flex: 1;
      background-color: $white;
      margin-right: 20px;
      padding: 20px;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      color: $font1;

      &-item {
        margin: 5px 0 10px;
      }
    }

    .avatar-group {
      position: absolute;
      right: 20px;
      top: 20px;

      img {
        width: 128px;
        height: 128px;
        border-radius: 50%;
      }
    }

    .admin-badge {
      font-size: 13px;
      margin-left: 10px;
      background-color: $blue;
      color: $white;
      border-radius: 4px;
      padding: 2px 3px;
    }
  }
</style>
