export type Login = {
    email: string
    password: string
  }
  
  export type Register = Login & {
    confirmPassword: string
    clientConfirmationEmailURI: string
  }
  
  export type EmailConfirmation = {
    userId: string
    code: string
  }
  
  export type UserAuth = {
    email: string
    role: string
    token: string
    isFirstLogin: boolean
  }
  export type UserContextInterface = {
    userAuth: UserAuth
    setUserAuth: (value: UserAuth) => void
  }
  