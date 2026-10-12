import { RegisterDto, LoginDto } from '../dtos/auth.dto';
export declare class AuthService {
    private authRepository;
    register(dto: RegisterDto): Promise<{
        id: number;
        username: string;
    }>;
    login(dto: LoginDto): Promise<{
        authentication_token: string;
        refresh_token: string;
    }>;
}
//# sourceMappingURL=authService.d.ts.map