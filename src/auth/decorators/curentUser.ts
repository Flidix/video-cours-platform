import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { UserEntity } from 'src/user/entities/user.entity';

export const CurrentUser = createParamDecorator(
  (field: keyof UserEntity | undefined, context: ExecutionContext) => {
    const { ctx } = context.switchToHttp().getRequest();

    return field ? ctx[field] : ctx;
  },
);
