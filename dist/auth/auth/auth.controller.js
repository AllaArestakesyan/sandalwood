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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/common/decorators/core");
const auth_guard_1 = require("@nestjs/passport/dist/auth.guard");
const swagger_1 = require("@nestjs/swagger");
const enum_role_1 = require("../../user/role/enum.role");
const roles_decorator_1 = require("../../user/role/roles.decorator");
const auth_service_1 = require("./auth.service");
const jwt_auth_guard_1 = require("../jwt-auth.guard");
const local_auth_guard_1 = require("../local-auth.guard");
const roles_guard_1 = require("../roles.guard");
const express_1 = require("express");
const create_user_dto_1 = require("../../user/dto/create-user.dto");
const user_service_1 = require("../../user/user.service");
const login_dto_1 = require("../dto/login.dto");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    async login(us, req) {
        return this.authService.login(req.user);
    }
    async register(registerDto, res) {
        try {
            const data = await this.authService.register(registerDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ message: e.message });
        }
    }
    async getProfile(req, res) {
        try {
            const data = await this.userService.findOneById(req.user.userId);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.OK).json({ message: e.message });
        }
    }
    onlyAdmin(req) {
        return this.userService.findOneById(req.user.userId);
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, core_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUser, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBody)({ type: create_user_dto_1.CreateUserDto }),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, core_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.ADMIN),
    (0, core_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Get)('admin'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "onlyAdmin", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)("Auth*"),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map