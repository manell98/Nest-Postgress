import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ChuckNorrisService } from './chuck-norris.service';
import { ChuckNorrisEntity } from './chuck-norris.entity';
import { IUpdateChuckNorris } from './interfaces/UpdateChuckNorris.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IndexChuckNorrisSwagger } from './swagger/index.chuck-norris';
import { IndexErrorSwagger } from './swagger/index.error';
import { IndexApiChuckNorrisSwagger } from './swagger/index.api-chuck-norris';

@Controller('/chuck-norris')
@ApiTags('Chuck Norris')
export class ChuckNorrisController {
  constructor(private readonly chuckNorrisService: ChuckNorrisService) {}

  @Get()
  @ApiOperation({ summary: 'Busca um Chuck Norris na API externa' })
  @ApiResponse({
    status: 200,
    description: 'Retorna os dados do Chuck Norris',
    type: IndexChuckNorrisSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao conectar na API do Chuck Norris',
    type: IndexErrorSwagger,
  })
  async apiChuckNorris(): Promise<ChuckNorrisEntity> {
    return this.chuckNorrisService.apiChuckNorris();
  }

  @Post()
  @ApiOperation({ summary: 'Salva um Chuck Norris na Base de Dados' })
  @ApiResponse({
    status: 201,
    description: 'Chuck Norris salvo com sucesso!!',
    type: IndexChuckNorrisSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao salvar o Chuck Norris na Base de Dados',
    type: IndexErrorSwagger,
  })
  async save(
    @Body() inputChuckNorris: IndexApiChuckNorrisSwagger,
  ): Promise<ChuckNorrisEntity> {
    return this.chuckNorrisService.saveDataInEntityChuckNorris(
      inputChuckNorris,
    );
  }

  @Post('/find-and-save')
  @ApiOperation({
    summary: 'Busca um Chuck Norris na API externa e salva na Base de Dados',
  })
  @ApiResponse({
    status: 201,
    description: 'Chuck Norris encontrado e salvo com sucesso!!',
    type: IndexChuckNorrisSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar e salvar o Chuck Norris na Base de Dados',
    type: IndexErrorSwagger,
  })
  async findAndSave(): Promise<ChuckNorrisEntity> {
    return this.chuckNorrisService.findAndSave();
  }

  @Get('/find-all')
  @ApiOperation({
    summary: 'Busca e rotorna todos os Chuck Norris na Base de Dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Todos Chuck Norris retornados com sucesso!!',
    type: IndexChuckNorrisSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao retornar todos os Chuck Norris da Base de Dados',
    type: IndexErrorSwagger,
  })
  async findAll(): Promise<Array<ChuckNorrisEntity>> {
    return this.chuckNorrisService.findAll();
  }

  @Get('/find-one')
  @ApiOperation({
    summary: 'Busca e retorna apenas um chuck norris pelo ID da Base de Dados',
  })
  @ApiResponse({
    status: 200,
    description: 'Chuck Norris retornado com sucesso!!',
    type: IndexChuckNorrisSwagger,
  })
  @ApiResponse({
    status: 402,
    description: 'Erro, nenhum Chuck Norris encontrado da Base de Dados',
    type: IndexErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao retornar o Chuck Norris da Base de Dados',
    type: IndexErrorSwagger,
  })
  async findById(
    @Headers('id-chuck-norris') idChuckNorris: string,
  ): Promise<ChuckNorrisEntity> {
    return this.chuckNorrisService.findById(idChuckNorris);
  }

  @Put()
  @ApiOperation({
    summary: 'Atualiza os dados e retonar o Chuck Norris Atualizado',
  })
  @ApiResponse({
    status: 200,
    description: 'Chuck Norris retornado com sucesso!!',
    type: IndexChuckNorrisSwagger,
  })
  @ApiResponse({
    status: 402,
    description:
      'Erro, nenhum Chuck Norris encontrado para atualizar na Base de Dados',
    type: IndexErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao tentar atualizar o Chuck Norris na Base de Dados',
    type: IndexErrorSwagger,
  })
  async update(
    @Body() bodyChuckNorris: IUpdateChuckNorris,
  ): Promise<ChuckNorrisEntity> {
    return this.chuckNorrisService.update(bodyChuckNorris);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta um Chuck Norris pelo ID na Base de Dados' })
  @ApiResponse({
    status: 204,
    description: 'Chuck Norris removido com sucesso!!',
    type: `Chuck Norris de id: {idChuckNorris}, removido com secesso!!`,
  })
  @ApiResponse({
    status: 402,
    description:
      'Erro, nenhum Chuck Norris encontrado para remover na Base de Dados',
    type: IndexErrorSwagger,
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao tentar remover o Chuck Norris na Base de Dados',
    type: IndexErrorSwagger,
  })
  async destroy(
    @Query('id-chuck-norris') idChuckNorris: string,
  ): Promise<string> {
    return this.chuckNorrisService.destroy(idChuckNorris);
  }
}
