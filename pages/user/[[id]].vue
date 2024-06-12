<script setup lang="ts">
import { BAvatar } from '@ltfei-blog/blogui'
import { useUserStore } from '~/store/user'
import { User as IconUser } from '@icon-park/vue-next'
import { getMember as getMemberApi, MemberData } from '~/apis/users/member'
import { Female as IconFemale, Male as IconMale } from '@icon-park/vue-next'

defineOptions({
  name: 'PageUser'
})

definePageMeta({
  middleware: [
    async (to) => {
      // 这里关闭了ssr 还是会报500
      if (process.server) {
        return
      }
      const { isLogin, useUserInfo, user } = useUserStore()
      await useUserInfo()
      const id = to.params.id

      /**
       * 没有id(访问的不是其他人的主页)
       * 且没有登录(访问的不是自己的主页)
       */
      if (!id && !isLogin.value) {
        return navigateTo('/login')
      }
      // 已经登录了的 跳转到自己的主页
      if (!id) {
        return navigateTo({
          path: '/user/' + user.value.id,
          hash: to.hash
        })
      }

      return
    }
  ]
})

const route = useRoute()
const { isLogin, user } = useUserStore()
const id = route.params.id as string

const data = ref<MemberData>({
  username: '未登录',
  avatar: '',
  get_likes: 0,
  id: 0,
  desc: '',
  gender: 2,
  register_date: 0,
  followers: 0,
  following: 0
})

const res = await getMemberApi(Number(id))
data.value = res.data

// todo: 未找到用户/用户状态异常的判断
data.value &&
  useSeoMeta({
    title: data.value.username + '的个人空间'
  })
</script>

<template>
  <div class="page-user" v-if="data">
    <div class="user">
      <div class="top">
        <client-only>
          <div class="user-info">
            <div class="avatar">
              <nuxt-link v-if="!isLogin" to="/login" class="to-login-icon">
                <icon-user size="22"></icon-user>
              </nuxt-link>
              <template v-else>
                <b-avatar :src="data.avatar"></b-avatar>
              </template>
            </div>
            <div class="text">
              <div class="username">
                {{ data.username }}
                <div class="gender">
                  <icon-female
                    v-if="data.gender == 0"
                    theme="outline"
                    size="18"
                    fill="#f51279"
                    :strokeWidth="4"
                  />
                  <icon-male
                    v-if="data.gender == 1"
                    theme="outline"
                    size="18"
                    fill="#128EF5"
                    :strokeWidth="4"
                  />
                </div>
              </div>
              <div class="desc">{{ data.desc || '这家伙很懒，什么都没写' }}</div>
            </div>
          </div>
        </client-only>
        <div class="operation">
          <client-only>
            <EditUserInfo v-if="id == user.id.toString()">
              <a-button>编辑资料</a-button>
            </EditUserInfo>
            <template v-else>
              <a-button>关注</a-button>
              <!-- <a-button>取消关注</a-button> -->
            </template>
          </client-only>
        </div>
      </div>
      <div class="data">
        <div class="item">
          <div class="name">获赞</div>
          <div class="value">{{ data.get_likes }}</div>
        </div>
        <div class="item">
          <div class="name">关注</div>
          <div class="value">{{ data.following }}</div>
        </div>
        <div class="item">
          <div class="name">粉丝</div>
          <div class="value">{{ data.followers }}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <UserPageContainer />
      <UserPageSidebar class="sidebar" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.page-user {
  max-width: 900px;
  margin: 0 auto;
  // height: 10px;
  .user {
    background-color: @bg-color;
    width: 100%;
    height: 115px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 60px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .text {
          margin-left: 8px;
          .username {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            align-items: center;
            .gender {
              margin-left: 3px;
            }
          }
          .desc {
            font-size: 16px;
          }
        }
      }
    }
    .data {
      align-self: flex-end;
      margin-top: 10px;
      display: flex;
      .item {
        display: flex;
        align-items: flex-end;
        flex-direction: row-reverse;
        margin-left: 10px;
        .name {
          font-size: 14px;
          color: @text-color-regular;
          margin: 0 2px;
        }
        .value {
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
  }
  .container {
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    .sidebar {
      .min-width(700px, {
        display: none;
      });
    }
  }
}
</style>
