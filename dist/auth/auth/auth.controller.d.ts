import { AuthService } from './auth.service';
import { RegisterDTO } from '../dto/auth.dto';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { LoginUser } from '../dto/login.dto';
export declare class AuthController {
    private readonly authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(us: LoginUser, req: any): Promise<{
        access_token: string;
    }>;
    register(registerDto: RegisterDTO, res: Response): Promise<any>;
    getProfile(req: any, res: Response): Promise<any>;
    onlyAdmin(req: any): Promise<import("../../user/entities/user.entity").User | import("@nestjs/common").NotFoundException>;
}
