import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieEntity } from './serie.entity';
import { ISerieInterface } from './interfaces/serie.interface';

@Controller('api/v1/serie')
export class SerieController {
  constructor(private readonly serieService: SerieService) {}

  @Post()
  async save(@Body() serie: ISerieInterface): Promise<SerieEntity> {
    return this.serieService.save(serie);
  }

  @Get()
  async findAll(): Promise<Array<SerieEntity>> {
    return this.serieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SerieEntity> {
    return this.serieService.findById(id);
  }
}
