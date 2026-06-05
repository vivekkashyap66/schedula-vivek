import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUPER_SECRET_KEY_123', // Service lo icchina same key undali
    });
  }

  async validate(payload: any) {
    // Ikkada return ayye data request.user loki automatic ga velthundi
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
