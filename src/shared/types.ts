export type token = {jwtToken: string, tokenExpiry: number} | null;

export interface withAuthProps {
    accessToken: token
  }

  export type LoginData = {
    usernameOrEmail: string,
    password: string
}