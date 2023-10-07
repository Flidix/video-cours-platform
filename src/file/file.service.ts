import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { S3 } from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

import { Environment } from '@shared/variables/environment';

export enum FileTypes {
  AVATAR = 'avatar',
  VIDEO = 'video',

  userAvatar = 'userAvatar',
}

@Injectable()
export class FileService {
  private readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      region: 'eu-central-1',
      accessKeyId: Environment.S3_BUCKET_ACCESS_KEY_ID,
      secretAccessKey: Environment.S3_BUCKET_SECRET_ACCESS_KEY,
    });
  }

  async createFile(type: FileTypes, file): Promise<string> {
    const upload = {
      Bucket: 'course-platform',
      Body: file.buffer,
      Key: type + '/' + file.originalname,
      ACL: 'public-read',
    };
    return (await this.s3.upload(upload).promise()).Location;
  }

  removeFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', 'static', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
