import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@shared/database/services/database.service';

@Injectable()
export class SubscribeService extends DatabaseService {
  async subscribe(toUserId: number, fromUserId: number) {
    const data = { fromUser: { id: fromUserId }, toUser: { id: toUserId } };
    const isSubscribet = await this.database.subscribes.findOne({ where: { ...data } });
    const user = await this.database.users.findOneOrFail({ where: { id: toUserId } });

    if (isSubscribet) {
      user.subscribersCount -= 1;
      await this.database.subscribes.delete({ id: isSubscribet.id });
    } else {
      user.subscribersCount += 1;
      await this.database.subscribes.create({ ...data });
    }

    await this.database.courses.save(user);
    return !isSubscribet;
  }
}
