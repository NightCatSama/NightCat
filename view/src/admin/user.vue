<template>
  <div class="admin-user">
    <!--左侧用户列表-->
    <div class="sidebar">
      <ul class="user-list">
        <li v-for="(user, i) in list" :class="{ active: active === i }" @click="active = i">
          <img :src="user.avatar" alt="avatar" />
          <div class="account">
            {{ user.account }}
          </div>
          <span v-if="user.admin" class="admin-badge">管理员</span>
        </li>
      </ul>
      <Btn class="next-btn" v-show="hasNextPage" @click="getUserList">Loadmore</Btn>
    </div>

    <!--用户详情-->
    <div class="admin-main">
      <template v-if="userInfo">
        <div class="user-group">
          <img :src="userInfo.avatar + '?size=200'" alt="avatar" />
          <div class="user-info">
            <div class="user-info-item">账号：{{ userInfo.account }}</div>
            <div class="user-info-item">昵称：{{ userInfo.name }}</div>
            <div class="user-info-item">邮箱：{{ userInfo.email }}</div>
            <div class="user-info-item">概况：{{ userInfo.profile }}</div>
            <div class="user-info-item">位置：{{ userInfo.location }}</div>
            <div class="user-info-item">Github：{{ userInfo.github }}</div>
            <div class="user-info-item">网站：{{ userInfo.website }}</div>
          </div>
        </div>
        <Btn class="admin-btn" @click="setAdmin">{{ userInfo.admin ? '取消管理员' : '设置管理员' }}</Btn>
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
    }

    .admin-main {
      flex-direction: column;
    }

    .user-group {
      display: flex;

      img {
        width: 208px;
        height: 208px;
        border-radius: 8px;
        margin-right: 20px;
      }
    }

    .user-info {
      display: flex;
      flex-direction: column;
      color: $font1;

      &-item {
        margin: 5px 0 10px;

        &:last-child {
          margin-bottom: 0;
        }
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

    .admin-btn {
      max-width: 400px;
      margin-top: 20px;
    }
  }
</style>
