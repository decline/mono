export interface JwtPayload {
  sub: string;
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface JwtLoginResponse {
  accessToken: string;
}
