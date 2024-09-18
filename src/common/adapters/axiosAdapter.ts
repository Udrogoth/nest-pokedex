import axios from "axios"
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { Injectable } from "@nestjs/common";


@Injectable()
export class AxiosAdapter implements HttpAdapter{
    private axios = axios;
    async get<T>(url: string): Promise<T> {

      try {
         const {data} = await axios.get<T>(url);
         return data;

      } catch (error) {
        throw new error('Error Check logs')
      }

    }
    
}

// export const consultAdapter = async(url: string)=>{
// return await axios.get<PokeResponse>(url);
// }