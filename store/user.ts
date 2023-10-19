export const useUserStore = () => {
  const isLogin = useState('isLogin', () => false)
  const user = useState<{
    id: number
    username: string
    avatar: string
    city?: any
    gender?: any
    register_date: string
    last_login_date?: any
    status?: any
    avatar_pendant?: any
  }>('user')
  return {
    isLogin,
    user
  }
}
