import type { AuthLoginPost200ResponseToken } from './auth-login-post200-response-token'
import type { AuthLoginPost200ResponseUser } from './auth-login-post200-response-user'

export interface AuthLoginPost200Response {
  user: AuthLoginPost200ResponseUser
  token: AuthLoginPost200ResponseToken
}
