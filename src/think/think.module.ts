import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThinkController } from './think.controller';
import { ThinkService } from './think.service';
import { Think, ThinkSchema } from './schemas/think.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Think.name, schema: ThinkSchema }])],
  controllers: [ThinkController],
  providers: [ThinkService],
})
export class ThinkModule {}