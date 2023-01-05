export interface ILoginInput {
  email: string
  password: string
}

export interface IRegistrationInput {
  email: string
  username: string
  password: string
  sex: string
  avatar: string
}

export interface IUpdateInput {
  email: string
  username: string
  password: string
  sex: string
  avatar: string
  phone_number: string
}