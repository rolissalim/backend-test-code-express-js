import { RegisterDto } from '../dtos/auth.dto';
export declare class AuthRepository {
    findByUsername(username: string): Promise<{
        id: number;
        username: string;
        password: string;
        createdAt: Date;
    } | null>;
    create(data: Omit<RegisterDto, 'password_confirmation'>): Promise<{
        id: number;
        username: string;
        password: string;
        createdAt: Date;
    }>;
}
//# sourceMappingURL=authRepository.d.ts.map