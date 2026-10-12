import { prisma } from '../config/prisma.js';
import { RegisterDto } from '../dtos/auth.dto.js';

export class AuthRepository {
  async findByUsername(username: string) {
    return await prisma.user.findUnique({ where: { username } });
  }

  async create(data: Omit<RegisterDto, 'password_confirmation'>) {
    return await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });
  }
}