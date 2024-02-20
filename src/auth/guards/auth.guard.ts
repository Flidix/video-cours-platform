import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtPayload, decode } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    console.log('Auth Header:', authHeader);

    if (!authHeader) {
      console.log('Authorization header missing');
      throw new UnauthorizedException({ message: 'unauthorized' });
    }

    const [bearer, token] = authHeader.split(' ');

    console.log('Bearer:', bearer);
    console.log('Token:', token);

    if (bearer !== 'Bearer' || !token) {
      console.log('Invalid token format');
      throw new UnauthorizedException({ message: 'unauthorized' });
    }

    const user = decode(token) as JwtPayload;

    console.log('Decoded User:', user);

    if (!user || typeof user !== 'object') {
      console.log('Token could not be decoded');
      throw new UnauthorizedException({ message: 'unauthorized' });
    }

    const expiration = user.exp;
    const currentTime = Math.floor(Date.now() / 1000);

    console.log('Expiration:', expiration);
    console.log('Current Time:', currentTime);

    if (expiration && currentTime > expiration) {
      console.log('Token has expired');
      throw new UnauthorizedException({ message: 'Token has expired' });
    }

    req.ctx = user;

    return true;
  }
}
