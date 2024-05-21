import { AxiosResponse } from "axios"
import { customAxios } from "../axios/axios"

export const deleteItemById=(id:number, tableName:string):Promise<AxiosResponse>=>{
    console.log(id,tableName,"Sending delete");
 const nesto = customAxios.delete(tableName+id)
 return nesto;
    
}