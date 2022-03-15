import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesModule } from './articles/articles.module';
import { ThinkModule } from './think/think.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:bYTJ47hrIhTQtClp@cluster0.9c1ju.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'),
    ArticlesModule,
    ThinkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
