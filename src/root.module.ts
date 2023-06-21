import { Module } from '@nestjs/common';

import { DatabaseModule } from '@shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class RootModule {}
