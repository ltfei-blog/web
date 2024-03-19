import { getUserInfo as getUserInfoApi } from '~/apis/users/userInfo'
import { useUserStore } from '~/store/user'

export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      return
    }
  } catch {
    return
  }
  const { user, isLogin } = useUserStore()
  const { data, status } = await getUserInfoApi()
  if (status == 200) {
    user.value = data
    isLogin.value = true
  } else {
    isLogin.value = false
  }
}
