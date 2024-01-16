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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const mailer_1 = require("@nestjs-modules/mailer");
const user_service_1 = require("../../user/user.service");
const uuid_1 = require("uuid");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailerService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async validateUser(username, pass) {
        const user = await this.userService.findOne(username);
        if (user && bcrypt.compareSync(pass, user.password)) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async login(user) {
        if (!user.isVerified) {
            throw new common_1.HttpException('Is not verified', common_1.HttpStatus.BAD_REQUEST);
        }
        const payload = {
            username: user.email,
            userId: user.id,
            role: user.role,
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    async register(userDto) {
        const { email, name, username, password, phone_number } = userDto;
        const user = await this.userService.findOneBy(email);
        const userN = await this.userService.findOneBy(username);
        if (user) {
            throw new common_1.HttpException('Email is already in use.', common_1.HttpStatus.BAD_REQUEST);
        }
        else if (userN) {
            throw new common_1.HttpException('Username is already in use.', common_1.HttpStatus.BAD_REQUEST);
        }
        else {
            const emailToken = (0, uuid_1.v4)();
            const createdUser = await this.userService.create({
                name,
                username,
                email,
                password: bcrypt.hashSync(password, 10),
                role: 0,
                emailToken,
                isVerified: 0,
                phone_number
            });
            try {
                const url = `http://localhost:3000/verify?email=${email}&emailToken=${emailToken}`;
                await this.mailerService.sendMail({
                    to: "sandalwoodstyle@gmail.com",
                    from: 'sandalwoodstyle@gmail.com',
                    subject: 'Welcome to Shop! Confirm your Email',
                    html: `Hi! There, You have recently visited 
          our website and entered your email.\n\n
          Please follow the given link to verify your email
          <a href='${url}'>click</a>
          Thanks`
                });
            }
            catch (e) {
                console.log(e.message);
            }
            return {
                message: "Registration successful."
            };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map