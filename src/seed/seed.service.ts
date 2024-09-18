import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axiosAdapter';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {

  }

  @Get()
  async executeSeed() {
    await this.pokemonModel.deleteMany({});

    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=105');


    const pokemonToInsert: { name: string, no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const no = +url.split('/').at(-2);
      // const pokemon = await this.pokemonModel.create({name, no})
      pokemonToInsert.push({ name, no });
    });

    this.pokemonModel.insertMany(pokemonToInsert);
    return 'Seed Executed';
  }
}



// @Get()
//   async executeSeed() {
//     await this.pokemonModel.deleteMany({});

//     const { data } = await consultAdapter('https://pokeapi.co/api/v2/pokemon?limit=103');


//     const insertPromisesArray = [];

//     data.results.forEach(({ name, url }) => {
//       const no = url.split('/').at(-2);
//       // const pokemon = await this.pokemonModel.create({name, no})
//       insertPromisesArray.push(
//         this.pokemonModel.create({ name, no })
//       );
//     });

//     await Promise.all(insertPromisesArray);
//     return 'Seed Executed';
//   }
// }