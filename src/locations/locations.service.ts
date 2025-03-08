import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocationsService {
    constructor(
    @InjectRepository(Location)
        private locationrepository: Repository<Location>

  ){}
  create(createLocationDto: CreateLocationDto) {
    return this.locationrepository.save(createLocationDto);
  }

  findAll() {
    return this.locationrepository.find()
  }

  findOne(id: number) {
   const location = this.locationrepository.findOneBy({
    locationId: id, 
   })
   if(!location) throw new NotFoundException("Location not found")
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    const location = this.locationrepository.preload({
      locationId: id,
      ...updateLocationDto,
    })
    return location
  }

  remove(id: number) {
    return this.locationrepository.delete({
      locationId: id
    });
  }
}
