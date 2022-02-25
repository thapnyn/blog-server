import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private readonly ArticleModel: Model<ArticleDocument>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createArticle = await this.ArticleModel.create(createArticleDto);
    return createArticle;
  }

  async findAll(): Promise<Article[]> {
    return this.ArticleModel.find().exec();
  }

  async findOne(id: string): Promise<Article> {
    return this.ArticleModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedArticle = await this.ArticleModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedArticle;
  }
}