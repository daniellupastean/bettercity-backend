import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IssueType } from 'src/entities/issueType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IssueTypesService {
  constructor(
    @InjectRepository(IssueType)
    private readonly issueTypesRepository: Repository<IssueType>,
  ) {}

  async getAllTypes() {
    const types = await this.issueTypesRepository.find();
    return types;
  }

  async createType(type: string) {
    return await this.issueTypesRepository.save({ type });
  }
}
