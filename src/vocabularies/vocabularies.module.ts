import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { Vocabulary, VocabularySchema } from './schemas/vocabulary.schema';
import { VocabulariesController } from './vocabularies.controller';
import { VocabulariesService } from './vocabularies.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{name: Vocabulary.name, schema: VocabularySchema}])
  ],
  controllers: [VocabulariesController],
  providers: [VocabulariesService]
})
export class VocabulariesModule {}
