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
exports.WishlistController = void 0;
const common_1 = require("@nestjs/common");
const wishlist_service_1 = require("./wishlist.service");
const create_wishlist_dto_1 = require("./dto/create-wishlist.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../user/role/roles.decorator");
const enum_role_1 = require("../user/role/enum.role");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
let WishlistController = class WishlistController {
    constructor(wishlistService) {
        this.wishlistService = wishlistService;
    }
    async create(createWishlistDto, req, res) {
        try {
            const data = await this.wishlistService.create(createWishlistDto, req.user.userId);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async findOne(req, res) {
        try {
            const data = await this.wishlistService.findOne(+req.user.userId);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async remove(id, req, res) {
        try {
            const data = await this.wishlistService.remove(id, req.user.userId);
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
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.USER),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wishlist_dto_1.CreateWishlistDto, Object, Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.USER),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Get)('getByUserId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.USER),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], WishlistController.prototype, "remove", null);
WishlistController = __decorate([
    (0, swagger_1.ApiTags)("Wishlist*"),
    (0, common_1.Controller)('wishlist'),
    __metadata("design:paramtypes", [wishlist_service_1.WishlistService])
], WishlistController);
exports.WishlistController = WishlistController;
//# sourceMappingURL=wishlist.controller.js.map