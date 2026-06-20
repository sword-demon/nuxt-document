import type { AuthLoginPost200Response } from '~/types/models/auth-login-post200-response'

export const useAuth = () => {
  const token = useCookie('token', { maxAge: 60 * 60 * 24 * 7 })

  const login = (data: AuthLoginPost200Response) => {
    token.value = data.token.token
  }

  const logout = () => {
    // 退出登录
    token.value = ''
  }

  const isLogin = computed(() => token.value !== '')

  return {
    login,
    logout,
    isLogin
  }
}
