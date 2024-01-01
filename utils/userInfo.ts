import { getUserInfo } from '~/apis/users/userInfo'
import { useUserStore } from '~/store/user'

export const useUserInfo = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    return
  }
  const { user, isLogin } = useUserStore()
  const { data, status } = await getUserInfo()
  if (status == 200) {
    user.value = data
    isLogin.value = true
  }
}
