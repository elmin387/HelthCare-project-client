import { AxiosResponse } from "axios"
import { EmailConfirmation, Login, Register } from "../interfaces/AuthInterface"
import { customAxios } from "../axios/axios"

export const registerUser = (data: Register): Promise<AxiosResponse> => {
    return customAxios.post('api/account/registration', data)
  }

  export const emailConfirmation = ({ userId, code }: EmailConfirmation): Promise<AxiosResponse> => {
    return customAxios.get('api/account/emailconfirmation', {
      params: { userId, code },
    })
  }
  
  export const loginUser = (data: Login): Promise<AxiosResponse> => {
    console.log(data)
    return customAxios.post('api/account/token', data)
  }