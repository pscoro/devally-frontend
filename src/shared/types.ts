export type token = {jwtToken: string, tokenExpiry: number, issuedAt: number} | null;

export interface withAuthProps {
    accessToken: token
  }

  export type LoginData = {
    usernameOrEmail: string,
    password: string
}