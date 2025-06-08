export interface JwtPayload {
  username: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}