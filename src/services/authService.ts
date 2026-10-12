import { AuthRepository } from '../repositories/authRepository.js';
import { RegisterDto, LoginDto } from '../dtos/auth.dto.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  private authRepository = new AuthRepository();

  async register(dto: RegisterDto) {
    if (!dto.username || !dto.password || !dto.password_confirmation) {
      throw new Error('MISSING_FIELDS');
    }
    if (dto.password !== dto.password_confirmation) {
      throw new Error('PASSWORD_NOT_MATCH');
    }

    const existingUser = await this.authRepository.findByUsername(dto.username);
    if (existingUser) {
      throw new Error('USERNAME_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.authRepository.create({
      username: dto.username,
      password: hashedPassword,
    });

    return { id: newUser.id, username: newUser.username };
  }

  async login(dto: LoginDto) {
    if (!dto.username || !dto.password) {
      throw new Error('MISSING_FIELDS');
    }

    const user = await this.authRepository.findByUsername(dto.username);
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const jwtSecret = process.env.JWT_SECRET || 'supersecretkey';

    const authentication_token = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: '1h' }
    );

    const refresh_token = jwt.sign(
      { id: user.id, username: user.username },
      jwtSecret,
      { expiresIn: '7d' }
    );

    return { authentication_token, refresh_token };
  }
}