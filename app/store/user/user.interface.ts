import { IUser } from "@/shared/types/user.types";

export interface IUserState {
  email: string;
  username: string;
  sex: string;
  avatar?: string;
  isAdmin: boolean;
  phone_number?: string;
}
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}
export interface IRegistration {
  email: string;
  username: string;
  sex: string;
  avatar?: string;
  password: string;
}

export interface IAuthResponse extends ITokens {
  user: IUser & {
    isAdmin: boolean
  }
}
