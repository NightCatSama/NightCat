<template>
  <div class="user-view">
    <div v-if="userInfo" class="user-group">
      <div class="user-info">
        <h1 class="title">个人资料</h1>
        <div class="user-info-item">
          <label for="account">账号：</label>
          <input id="account" disabled v-model="userInfo.account"></input>
        </div>
        <div v-if="!isSelf" class="user-info-item">
          <label for="email">邮箱：</label>
          <input id="email" disabled v-model="userInfo.email"></input>
        </div>
        <div class="user-info-item">
          <label for="profile">概况：</label>
          <input id="profile" :disabled="!isSelf" v-model="userInfo.profile"></input>
        </div>
        <div class="user-info-item">
          <label for="location">位置：</label>
          <input id="location" :disabled="!isSelf" v-model="userInfo.location"></input>
        </div>
        <div class="user-info-item">
          <label for="github">Github：</label>
          <input id="github" :disabled="!isSelf" v-model="userInfo.github"></input>
        </div>
        <div class="user-info-item">
          <label for="website">网站：</label>
          <input id="website" :disabled="!isSelf" v-model="userInfo.website"></input>
        </div>
        <Btn v-if="isSelf" class="save-btn" @click="updateUser">保存修改</Btn>

        <template v-if="isSelf">
          <h1 class="title">绑定邮箱</h1>
          <div class="user-info-item">
            <div v-if="isSelf" class="has-btn-item">
              <input id="email" v-model="userInfo.email"></input>
              <Btn class="user-btn" @click="bindEmail">绑定邮箱</Btn>
            </div>
            <input v-else id="email" disabled v-model="userInfo.email"></input>
            <label for="subscribe" class="subscribe-wrap">
              <input type="checkbox" id="subscribe" v-model="userInfo.subscribe" name="subscribe" @change="setSubscribe"></input>
              订阅消息邮件
            </label>
          </div>
        </template>
      </div>
      <div class="user-avatar">
        <h1 class="title">头像</h1>
        <img :src="userInfo.avatar" alt="avatar" class="avatar" />
        <span class="upload-avatar">
          <Btn v-if="isSelf" class="user-btn upload-btn">上传新头像</Btn>
          <input class="avatar-input" type="file" accept="image/*" @change="uploadAvatar" />
        </span>
      </div>
    </div>
    <div v-else class="no-user">
      没有这个人
    </div>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
        userInfo: null
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      account () {
        return this.$route.params.account || ''
      },
      isSelf () {
        return this.user ? this.account ? this.account === this.user.account : true : false
      }
    },
    watch: {
      '$route': 'getUser'
    },
    methods: {
      getUser () {
        this.$graphql.query(`
          user ($account) {
            ...user
          }
        `, {
          account: this.account
        }, ['user'])
        .then((res) => {
          if (!res) {
            return this.$toast('未找到该用户', 'error')
          }
          this.userInfo = res
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      updateUser () {
        let { profile, website, github, location, avatar } = this.userInfo
        this.$graphql.mutation(`
          updateUser ($profile, $website, $github, $location, $avatar) {
            ...user
          }
        `, {
          avatar,
          profile,
          website,
          github,
          location
        }, ['user'])
        .then((res) => {
          this.$toast('保存成功', 'success')
          this.$store.commit('updateAvatar', res.avatar)
        })
        .catch((err) => this.$toast(err.message, 'error'))
      },
      bindEmail () {
        let { account, email } = this.userInfo
        this.$http.post('/sendSignupEmail', {
          account,
          email
        })
        .then((res) => {
          this.$toast('已向注册邮箱发送激活邮件', 'success')
        })
        .catch((err) => {
          this.$toast(err.message, 'error')
        })
      },
      uploadAvatar (e) {
        let file = e.target.files[0]

        if (!file) {
          return false
        }

        let reader = new FileReader()
        reader.onload = (e) => {
          this.compress(e.target.result).then((avatar) => {
            this.userInfo.avatar = avatar
          })
        }

        reader.readAsDataURL(file)
      },
      compress (src) {
        return new Promise((resolve) => {
          /*  压缩配置  */
          let opt = {
            width: 168,
            height: 168,
            quality: 0.92
          }

          let img = new Image()
          let canvas = document.createElement('CANVAS')
          canvas.width = opt.width
          canvas.height = opt.height
          let cxt = canvas.getContext('2d')

          img.onload = () => {
            let size = [img.width, img.height]
            /*  将长的方向进行裁剪  */
            let x, y, base
            if (size[0] > size[1]) {
              y = 0
              x = (size[0] - size[1]) / 2
              base = size[1]
            }
            else {
              x = 0
              y = (size[1] - size[0]) / 2
              base = size[0]
            }
            cxt.drawImage(img, x, y, base, base, 0, 0, opt.width, opt.height)
            resolve(canvas.toDataURL('image/jpeg', opt.quality))
          }

          img.src = src
        })
      },
      setSubscribe (e) {
        let { subscribe } = this.userInfo
        this.$graphql.mutation(`
          setSubscribe ($subscribe) {
            ...user
          }
        `, {
          subscribe
        }, ['user'])
        .then((res) => {
          this.$toast('设置成功', 'success')
        })
        .catch((err) => this.$toast(err.message, 'error'))
      }
    },
    mounted () {
      this.getUser()
    }
  }
</script>

<style lang="scss">
  @import '~style';

  .user-view {
    min-height: 100vh;
    @include flex-main-center;
    overflow: hidden;

    .user-group {
      display: flex;
      width: 800px;
      padding: 20px;
      margin: 200px 0;

      .title {
        margin-bottom: 12px;
      }
    }

    .user-info {
      flex: 1;
      margin-right: 120px;
      display: flex;
      flex-direction: column;

      .user-info-item {
        position: relative;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;

        label {
          width: 70px;
          font-size: 14px;
          margin-bottom: 5px;
        }

        input {
          width: 100%;
          height: 34px;
          padding: 6px 8px;
          font-size: 14px;
          color: #333;
          line-height: 20px;
          vertical-align: middle;
          background-color: #fafafa;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.075);

          &:focus {
            border-color: #51a7e8;
            outline: none;
            box-shadow: inset 0 1px 2px rgba(0,0,0,0.075),0 0 5px rgba(81,167,232,0.5);
          }

          &[disabled] {
            opacity: .75;
            background-color: #f1f1f1;
          }
        }

        .subscribe-wrap {
          width: 100%;
          white-space: nowrap;

          input {
            width: auto;

            &:focus {
              box-shadow: none;
            }
          }
        }

        .has-btn-item {
          display: flex;

          input {
            border-radius: 3px 0 0 3px;
          }

          button {
            border-radius: 0 3px 3px 0;
          }
        }
      }
    }

    .user-avatar {
      width: 168px;
      display: flex;
      flex-direction: column;

      .avatar {
        width: 168px;
        height: 168px;
        border-radius: 3px;
        margin-bottom: 10px;
      }
    }

    .save-btn {
      align-self: flex-start;
      padding: 0 20px;
      margin-bottom: 40px;
      border: none;
      color: $white;
      background-color: #eee;
      background-image: linear-gradient(-180deg, $green_l2 0%, $green_d1 100%);

      &:active {
        box-shadow: inset 0 4px 10px rgba(0, 0, 0, .25);
      }
    }

    .user-btn {
      padding: 0 20px;
      color: #333;
      background-color: #eff3f6;
      background-image: linear-gradient(-180deg, #fafbfc 0%, #eff3f6 90%);

      &:active {
        box-shadow: inset 0 2px 5px rgba(0, 0, 0, .15);
      }
    }

    .no-user {
      @include flex-center;
      font-size: 40px;
    }

    .upload-avatar {
      position: relative;

      button {
        width: 100%;
      }

      .avatar-input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
</style>
