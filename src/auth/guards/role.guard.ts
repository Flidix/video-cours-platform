import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { UserService } from '../../user/user.service';
import { DatabaseService } from '@shared/database/services/database.service';


@Injectable()
export class RoleGuard extends DatabaseService implements CanActivate {
  constructor(
      @InjectDataSource() datasource: DataSource,
      private readonly jwtService: JwtService,
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
      const userId = this.jwtService.verify(token);
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