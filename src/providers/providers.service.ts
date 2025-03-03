import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository, Like } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';


@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ){}
  create(createProviderDto: CreateProviderDto) {
    return this.providerRepository
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string ) {
   return this.providerRepository.findOneBy({
    providerId: id,
  ...UpdateProviderDto
  })
  }

  async findOneByName(name: string) {
    console.log(name);
    const provider = await this.providerRepository.findBy({
      providerName: Like(`%${name}%`)
    });
    if (!provider) throw new NotFoundException();
    return provider;
  }


  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    });
  
    if (!product) {
      throw new Error(`Provider with id ${id} not found`);
    }
  
    return this.providerRepository.save(product);
  }
  
  remove(id: string) {
   this.providerRepository.delete({
    providerId: id
   })
  }
}
