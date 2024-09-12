import axios from "axios"
import { PokeResponse } from "src/seed/interfaces/poke-response.interface"


export const consultAdapter= async(url: string)=>{
return await axios.get<PokeResponse>(url);
}