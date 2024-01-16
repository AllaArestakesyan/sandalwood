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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const auth_guard_1 = require("@nestjs/passport/dist/auth.guard");
const express_1 = require("express");
const change_password_dto_1 = require("./dto/change-password.dto");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("../upload/config");
const roles_decorator_1 = require("./role/roles.decorator");
const enum_role_1 = require("./role/enum.role");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../auth/roles.guard");
const verify_dto_1 = require("./dto/verify.dto");
const forgot_password_1 = require("./dto/forgot-password");
const reset_password_1 = require("./dto/reset-password");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findAll(req, res) {
        try {
            const data = await this.userService.findAll(req.user.userId);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async verify(user, res) {
        try {
            const data = await this.userService.verify(user);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async findOne(id, res) {
        try {
            const data = await this.userService.findOneById(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async changePassword(changePassword, res, req) {
        try {
            const data = await this.userService.changePassword(changePassword, req.user.userId);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async update(res, file, req) {
        try {
            const data = await this.userService.updatePic(req.user.userId, file);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async updateData(updateUserDto, res, req) {
        try {
            const data = await this.userService.updateData(req.user.userId, updateUserDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async forgotPassword(forgotPassword, res, req) {
        try {
            const data = await this.userService.forgotPassword(forgotPassword);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async resetPassword(resetPassword, email, res, req) {
        try {
            const data = await this.userService.resetPassword(resetPassword, email);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async remove(id, res, req) {
        try {
            const data = await this.userService.remove(+id, req.user.userId);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.ADMIN),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)("/verify"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_dto_1.Verify, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('/us/changepassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', config_1.multerOptions)),
    (0, common_1.Patch)('/updatePicUrl'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _e : Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt')),
    (0, common_1.Patch)('/us/updateData'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateData", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/us/forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_1.ForgotPassword, typeof (_g = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _g : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Patch)('/us/resetPassword/:email'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("email")),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_1.ResetPassword, String, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.USER),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, auth_guard_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_j = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _j : Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)("User*"),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map