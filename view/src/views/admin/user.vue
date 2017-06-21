<template>
  <div class="admin-user">
    <!--左侧用户列表-->
    <div class="sidebar">
      <ul class="user-list">
        <li v-for="(user, i) in list" :class="{ active: active === i }" @click="active = i">
          <img :src="user.avatar" alt="avatar" />
          <div class="account">
            {{ user.account }}
            <br />
            <small v-if="user.superAdmin" class="admin-badge red">超级管理员</small>
            <small v-if="!user.superAdmin && user.admin" class="admin-badge">管理员</small>
          </div>
        </li>
      </ul>
      <Btn class="next-btn" v-show="hasNextPage" @click="getUserList">Loadmore</Btn>
    </div>

    <!--用户详情-->
    <div class="admin-main">
      <template v-if="userInfo">
        <div class="user-group">
          <img :src="userInfo.avatar" alt="avatar" />
          <div class="user-info">
            <div class="user-info-item">账号：{{ userInfo.account }}</div>
            <div class="user-info-item">邮箱：{{ userInfo.email }}</div>
            <div class="user-info-item">概况：{{ userInfo.profile }}</div>
            <div class="user-info-item">位置：{{ userInfo.location }}</div>
            <div class="user-info-item">Github：{{ userInfo.github }}</div>
            <div class="user-info-item">网站：{{ userInfo.website }}</div>
          </div>
        </div>
        <Btn v-if="!userInfo.superAdmin" class="admin-btn" @click="setAdmin">{{ userInfo.admin ? '取消管理员' : '设置管理员' }}</Btn>
        <Btn v-if="!userInfo.superAdmin" class="admin-btn red" @click="removeUser">删除用户</Btn>
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
        cursor: '',
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
            ...user
          }
        `, {
          account
        }, ['user'])
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
      removeUser () {
        this.$prompt('确认删除该用户吗', () => {
          let account = this.account
          let index = this.active

          this.$graphql.mutation(`
            removeUser (account: "${account}") {
              account
            }
          `)
          .then((res) => {
            this.$toast('删除成功', 'success')
            this.active = index - 1
            this.list.splice(index, 1)
          })
          .catch((err) => this.$toast(err.message, 'error'))
        })
      },
      getUserList () {
        this.$graphql.query(`
          users ($first, $after) {
            edges {
              node {
                account,
                email,
                avatar,
                admin,
                superAdmin
              }
              cursor
            }
            pageInfo {
              hasNextPage,
              endCursor
            }
          }
        `, {
          first: 5,
          after: this.cursor
        })
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
  @import '~style';

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
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
        width: 168px;
        height: 168px;
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
      display: inline-block;
      font-size: 13px;
      margin-top: 4px;
      width: auto;
      background-color: $blue;
      color: $white;
      border-radius: 4px;
      padding: 2px 3px;

      &.red {
        background-color: $red;
      }
    }

    .admin-btn {
      max-width: 400px;
      margin-top: 10px;

      &.red {
        color: $red;
      }
    }
  }
</style>
