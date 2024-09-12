import { Get, Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { consultAdapter } from 'src/config/consultAdapter';


@Injectable()
export class SeedService {

  @Get()
  async executeSeed() {
    // const data =  await fetch('https://pokeapi.co/api/v2/pokemon?limit=600')
    //   .then(resp => resp.json())

    const {data} = await consultAdapter('https://pokeapi.co/api/v2/pokemon?limit=10');
    
     data.results.forEach(({name, url})=>{
      const no = url.split('/').at(-2);

     })
    
     return data.results;
  }
}
