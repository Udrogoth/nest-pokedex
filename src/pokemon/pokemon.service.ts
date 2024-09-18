import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Query } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';
import { envs } from 'src/config/envs';


@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    // private readonly configService: ConfigService,
  ) {
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;

    } catch (error) {
      this.handleException(error)
    }
  }

  findAll(paginationDto: PaginationDto) {
    const { limit = envs.DEFAULT_LIMIT, offset = 0 } = paginationDto;
    return this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      })
      .select('-__v')
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term })
    }

    //mongoID

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findById(term)
    }

    //name
    if (!pokemon) {

      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim })
    }

    if (!pokemon)
      throw new NotFoundException(`pokemon with id, name or number ${term} not found`)

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);
    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trimEnd();

    try {
      await pokemon.updateOne(updatePokemonDto)


      return { ...pokemon.toJSON(), ...updatePokemonDto };

    } catch (error) {
      this.handleException(error)

    }

  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id)
    // await pokemon.deleteOne();


    const { deletedCount } = await this.pokemonModel.deleteMany({ _id: id })
    if (deletedCount === 0) {
      throw new BadRequestException(`pokemon with id ${id} not fount`)
    }
    return;
  }


  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`don´t update pokemon`);
  }

}
