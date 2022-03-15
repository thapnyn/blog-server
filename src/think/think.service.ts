import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateThinkDto } from './dto/create-think.dto';
import { Think, ThinkDocument } from './schemas/think.schema';

@Injectable()
export class ThinkService {
  constructor(
    @InjectModel(Think.name) private readonly ThinkModel: Model<ThinkDocument>,
  ) {}

  async create(createThinkDto: CreateThinkDto): Promise<Think> {
    const createThink = await this.ThinkModel.create(createThinkDto);
    return createThink;
  }

  async findAll(): Promise<Think[]> {
    return this.ThinkModel.find().exec();
  }

  async findOne(id: string): Promise<Think> {
    return this.ThinkModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedThink = await this.ThinkModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedThink;
  }
}