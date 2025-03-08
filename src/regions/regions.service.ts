import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RegionsService {
    constructor(
      @InjectRepository(Region)
      private regionReposirtory: Repository<Region>
    ){}

  create(createRegionDto: CreateRegionDto) {
    return this.regionReposirtory.save(createRegionDto);
  }

  findAll() {
    return this.regionReposirtory.find;
  }

  findOne(id: number) {
    const region = this.regionReposirtory.findOneBy({
      regionId : id
    });
    if (!region) throw new NotFoundException("Region not found")
  }

  async update(id: number, updateRegionDto: UpdateRegionDto){
    const regionToUpdate = await this.regionReposirtory.preload({
    regionId: id,
    ...UpdateRegionDto
  })
  if(!regionToUpdate) throw new BadRequestException()
    return this.regionReposirtory.save(regionToUpdate);
  }


  remove(id: number) {
    return this.regionReposirtory.delete({
      regionId: id,
    });
  }
}
