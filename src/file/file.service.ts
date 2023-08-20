import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

export enum FileTypes {
  AVATAR = 'avatar',
  VIDEO = 'video',
}

@Injectable()
export class FileService {
  createFile(type: FileTypes, file): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException('Error creating file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  removeFile(fileName: string) {
    const filePath = path.resolve(__dirname, '..', 'static', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
