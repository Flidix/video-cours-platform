import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class ListenService extends DatabaseService {

   async createListen(toVideo: number, fromUser: number){      
      await this.database.listens.create({fromUser: {id: fromUser}, toVideo: {id: toVideo} });
   }

}
