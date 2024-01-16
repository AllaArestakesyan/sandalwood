import { RegisterDTO } from '../auth/dto/auth.dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPassword } from './dto/forgot-password';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPassword } from './dto/reset-password';
export declare class UserService {
    private usersRepository;
    private readonly mailerService;
    constructor(usersRepository: Repository<User>, mailerService: MailerService);
    create(userDto: RegisterDTO): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
    findOneBy(email: string): Promise<User | undefined>;
    findAll(id: number): Promise<User[]>;
    verify(user: {
        email: string;
        emailToken: string;
    }): Promise<string>;
    findOneById(id: number): Promise<User | NotFoundException>;
    updatePic(id: number, file: any): Promise<NotFoundException | "Updated">;
    updateData(id: number, updateUserDto: UpdateUserDto): Promise<string | NotFoundException>;
    forgotPassword(fPass: ForgotPassword): Promise<string | NotFoundException>;
    resetPassword(rPass: ResetPassword, email: string): Promise<string>;
    changePassword(data: ChangePasswordDto, id: number): Promise<string>;
    remove(id: number, userId: number): Promise<string>;
}
