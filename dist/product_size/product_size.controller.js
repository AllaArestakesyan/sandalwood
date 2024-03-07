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
exports.ProductSizeController = void 0;
const common_1 = require("@nestjs/common");
const product_size_service_1 = require("./product_size.service");
const create_product_size_dto_1 = require("./dto/create-product_size.dto");
const update_product_size_dto_1 = require("./dto/update-product_size.dto");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../user/role/roles.decorator");
const enum_role_1 = require("../user/role/enum.role");
const passport_1 = require("@nestjs/passport");
const roles_guard_1 = require("../auth/roles.guard");
let ProductSizeController = class ProductSizeController {
    constructor(productSizeService) {
        this.productSizeService = productSizeService;
    }
    async create(createProductSizeDto, req, id, res) {
        try {
            const data = await this.productSizeService.create(createProductSizeDto, id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
        }
    }
    async update(id, updateProductSizeDto, req, res) {
        try {
            const data = await this.productSizeService.update(+id, updateProductSizeDto);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
        }
    }
    async remove(id, req, res) {
        try {
            const data = await this.productSizeService.remove(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Post)(":productId"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)("productId")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_size_dto_1.CreateProductSizeDto, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductSizeController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_size_dto_1.UpdateProductSizeDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductSizeController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, roles_decorator_1.HasRoles)(enum_role_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductSizeController.prototype, "remove", null);
ProductSizeController = __decorate([
    (0, swagger_1.ApiTags)('Product-size*'),
    (0, common_1.Controller)('product-size'),
    __metadata("design:paramtypes", [product_size_service_1.ProductSizeService])
], ProductSizeController);
exports.ProductSizeController = ProductSizeController;
//# sourceMappingURL=product_size.controller.js.map