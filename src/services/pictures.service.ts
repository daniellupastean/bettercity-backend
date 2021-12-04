import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateResetToken } from 'src/common/utils';
import { Picture } from 'src/entities/picture.entity';
import { Repository } from 'typeorm';
const imgbbUploader = require('imgbb-uploader');

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private readonly picturesRepository: Repository<Picture>,
  ) {}

  async uploadPictures(pictures: Array<any>, issueId: string) {
    const linksArray = [];
    for (let i = 0; i < pictures.length; i++) {
      const link = await this.uploadPictureToImgbb(pictures[i]);

      await this.picturesRepository.save({ issueId, link });

      linksArray.push(link);
    }

    return linksArray;
  }

  async uploadPictureToImgbb(base64Picture: string) {
    const options = {
      apiKey: process.env.IMGBB_API_KEY,
      base64string: base64Picture,
    };
    const result = await imgbbUploader(options);

    return result.url;
  }
}
