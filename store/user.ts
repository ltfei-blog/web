import { getUserInfo } from '~/utils/userInfo'

export const useUserStore = () => {
  const isLogin = useState<boolean | null>('isLogin', () => null)
  const user = useState<{
    id: number
    username: string
    avatar: string
    city?: any
    gender?: any
    register_date: string
    last_login_date?: any
    status: number
    avatar_pendant?: any
  }>('user')
  const loading = useState('loading', () => false)

  /**
   * 加载用户信息(全局只加载一次)
   */
  const useUserInfo = async (): Promise<void> => {
    if (loading.value) {
      return new Promise((resovle) => {
        watch(loading, () => {
          resovle()
        })
      })
    }
    if (isLogin.value == null && !loading.value) {
      loading.value = true
      await getUserInfo()
      loading.value = false
    }
  }

  return {
    isLogin,
    user,
    useUserInfo
  }
}
