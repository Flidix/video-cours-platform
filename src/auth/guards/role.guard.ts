import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import { decode } from 'jsonwebtoken';
import { DataSource } from 'typeorm';

import { UserService } from '../../user/user.service';
import { DatabaseService } from '@shared/database/services/database.service';

import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class RoleGuard extends DatabaseService implements CanActivate {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly userService: UserService,
  ) {
    super(datasource);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'forbidden' });
      }
      const userId = decode(token) as UserEntity;
      const user = await this.userService.findOneById(userId.id);

      if (user.isAdmin === true) {
        return true;
      }
    } catch (e) {
      throw new UnauthorizedException('forbidden');
    }
    return false;
  }
}
