import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Verify } from './dto/verify.dto';
import { ForgotPassword } from './dto/forgot-password';
import { ResetPassword } from './dto/reset-password';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    verify(user: Verify, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    changePassword(changePassword: ChangePasswordDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    update(res: Response, file: any, req: any): Promise<Response<any, Record<string, any>>>;
    updateData(updateUserDto: UpdateUserDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    forgotPassword(forgotPassword: ForgotPassword, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    resetPassword(resetPassword: ResetPassword, email: string, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
}
