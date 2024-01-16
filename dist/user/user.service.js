"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
let UserService = class UserService {
    constructor(usersRepository, mailerService) {
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
    }
    async create(userDto) {
        const user = this.usersRepository.create(userDto);
        return this.usersRepository.save(user);
    }
    async findOne(email) {
        return await this.usersRepository.
            createQueryBuilder("user")
            .where('user.email = :email', { email })
            .orWhere('user.username = :email', { email })
            .getOne();
    }
    async findOneBy(email) {
        return await this.usersRepository.findOne({
            where: {
                email,
            },
        });
    }
    async findAll(id) {
        const data = await this.usersRepository.
            createQueryBuilder("user")
            .where('user.id != :id', { id })
            .getMany();
        return data;
    }
    async verify(user) {
        const us = await this.usersRepository.findOne({
            where: {
                email: user.email,
                emailToken: user.emailToken
            },
        });
        if (us) {
            await this.usersRepository.update({ id: us.id }, { emailToken: null, isVerified: 1 });
            return "you are verified";
        }
        else {
            throw new common_1.NotFoundException("Oops! data not found");
        }
    }
    async findOneById(id) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                pic_url: true,
                role: true
            },
        });
        if (user) {
            return user;
        }
        else {
            return new common_1.NotFoundException('user not found');
        }
    }
    async updatePic(id, file) {
        const user = await this.usersRepository.findOneBy({ id });
        if (user) {
            this.usersRepository.update({ id }, { pic_url: file.filename });
            return 'Updated';
        }
        else {
            return new common_1.NotFoundException('user not found');
        }
    }
    async updateData(id, updateUserDto) {
        const user = await this.usersRepository.findOneBy({ id });
        if (user) {
            const { name, username } = updateUserDto;
            this.usersRepository.update({ id }, { name, username });
            return 'Updated - ' + user.email;
        }
        else {
            return new common_1.NotFoundException('user not found');
        }
    }
    async forgotPassword(fPass) {
        const user = await this.usersRepository.findOne({
            where: {
                email: fPass.email,
            },
        });
        if (user) {
            const code = Math.floor(Math.random() * 10000000);
            await this.usersRepository.update({ id: user.id }, { code });
            try {
                await this.mailerService.sendMail({
                    to: "sandalwoodstyle@gmail.com",
                    from: 'sandalwoodstyle@gmail.com',
                    subject: 'Welcome to Shop! Confirm your Email',
                    html: `<h3 style='color:#0aa'>Hello ${user.name}</h3>\n
          You have requested to reset the password of your account.
          \n\n\nHere is the security code to change your password. 
          \n <h3 style="font-fam">${code}</h3>`
                });
            }
            catch (e) {
                console.log(e.message);
            }
            return 'forgotPassword - ' + user.email;
        }
        else {
            return new common_1.NotFoundException('user not found');
        }
    }
    async resetPassword(rPass, email) {
        const user = await this.usersRepository.findOne({
            where: {
                email: email,
                code: rPass.code
            }
        });
        if (user) {
            if (rPass.password != rPass.confirm_password) {
                throw new common_1.BadRequestException('Passwords do not match.');
            }
            await this.usersRepository.update({ id: user.id }, {
                password: bcrypt.hashSync(rPass.password, 10),
                code: null
            });
            return 'forgotPassword - ' + user.email;
        }
        else {
            throw new common_1.BadRequestException('Invalid or expired reset code.');
        }
    }
    async changePassword(data, id) {
        const user = await this.usersRepository.findOneBy({ id });
        console.log(user);
        let comp1 = bcrypt.compareSync(data.currentPassword, user.password);
        let comp = bcrypt.compareSync(data.password, user.password);
        console.log(data);
        console.log(comp1);
        if (!comp1) {
            throw new common_1.HttpException('Wrong passwors', common_1.HttpStatus.BAD_REQUEST);
        }
        if (!!comp) {
            throw new common_1.HttpException('Current and new password can not match', common_1.HttpStatus.BAD_REQUEST);
        }
        if (data.password === data.confirmationPassword) {
            if (user) {
                this.usersRepository.update({ id: id }, { password: bcrypt.hashSync(data.password, 10) });
                return 'password updated';
            }
            else {
                throw new common_1.NotFoundException('user not found');
            }
        }
        else {
            throw new common_1.HttpException('Passwords do not match', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id, userId) {
        const us = await this.usersRepository.findOneBy({ id });
        if (us) {
            if (us.id == userId) {
                this.usersRepository.delete({ id });
                return `delete ${us.email} account`;
            }
            else {
                throw new common_1.NotFoundException("you don't have any access");
            }
        }
        else {
            throw new common_1.NotFoundException("user not found");
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mailer_1.MailerService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map