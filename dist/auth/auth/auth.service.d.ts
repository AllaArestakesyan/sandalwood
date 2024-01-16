import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from '../dto/auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly mailerService;
    constructor(userService: UserService, jwtService: JwtService, mailerService: MailerService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(userDto: RegisterDTO): Promise<{
        message: string;
    }>;
}
