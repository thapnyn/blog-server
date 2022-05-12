import { Test, TestingModule } from '@nestjs/testing';
import { VocabularyCategoriesService } from './vocabulary-categories.service';

describe('VocabularyCategoriesService', () => {
  let service: VocabularyCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VocabularyCategoriesService],
    }).compile();

    service = module.get<VocabularyCategoriesService>(VocabularyCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
