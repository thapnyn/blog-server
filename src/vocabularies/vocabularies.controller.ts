import { Controller, Body, Post, Request, UseGuards } from '@nestjs/common';
import { VocabulariesService } from './vocabularies.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateVocabularyDto } from './dto/create-vocabulary.dto';

@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/new')
  async create(@Body() createVocabulary: CreateVocabularyDto, @Request() req): Promise<CreateVocabularyDto> {
    return this.vocabulariesService.create(req.user, createVocabulary);
  }
}