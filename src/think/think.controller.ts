import { Body, Controller, Delete, Get, Headers, Param, Post, HttpException, HttpStatus, } from '@nestjs/common';
import { ThinkService } from './think.service';
import { CreateThinkDto } from './dto/create-think.dto';
import { Think } from './schemas/think.schema';

@Controller('think')
export class ThinkController {
  constructor(private readonly thinkService: ThinkService) {}

  @Post()
  async create(@Headers() headers, @Body() createThinkDto: CreateThinkDto) {
    createThinkDto.userAgent = headers['user-agent'];
    return this.thinkService.create(createThinkDto).catch(err => {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err.message
      }, HttpStatus.BAD_REQUEST);
    })
  }

  @Get()
  async findAll(): Promise<Think[]> {
    return this.thinkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Think> {
    return this.thinkService.findOne(id).catch(err => {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        message: "Not Found",
        error: `Think with id [${id}] not found`,
      }, HttpStatus.NOT_FOUND);
    })
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.thinkService.delete(id);
  }
}