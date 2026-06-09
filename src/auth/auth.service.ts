import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // Explicit ga any[] ani type pedithe strict TypeScript errors raavu
  private users: any[] = [];

  constructor(private jwtService: JwtService) {}

  // 1. SIGNUP LOGIC
  async signup(body: any) {
    const { email, password, role } = body;

    // Check if role is correct
    if (role !== 'DOCTOR' && role !== 'PATIENT') {
      throw new BadRequestException('Role must be either DOCTOR or PATIENT');
    }

    // Check if user already exists
    const userExists = this.users.find((u) => u.email === email);
    if (userExists) {
      throw new BadRequestException('User already exists!');
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: this.users.length + 1,
      email,
      password: hashedPassword,
      role,
    };

    this.users.push(newUser);
    return { message: 'User registered successfully!', userId: newUser.id };
  }

  // 2. LOGIN LOGIC
  async login(body: any) {
    const { email, password } = body;

    const user = this.users.find((u) => u.email === email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    // Compare Password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    // Generate JWT Token
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
