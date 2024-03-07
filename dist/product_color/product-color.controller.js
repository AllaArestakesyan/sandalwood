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
exports.ProductColorController = void 0;
const common_1 = require("@nestjs/common");
const product_color_service_1 = require("./product_color.service");
const create_product_color_dto_1 = require("./dto/create-product_color.dto");
const swagger_1 = require("@nestjs/swagger");
let ProductColorController = class ProductColorController {
    constructor(productColorService) {
        this.productColorService = productColorService;
    }
    async create(createProductColorDto, req, id, res) {
        try {
            const data = await this.productColorService.create(createProductColorDto, id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
        }
    }
    async remove(id, req, res) {
        try {
            const data = await this.productColorService.remove(+id);
            return res.status(common_1.HttpStatus.OK).json(data);
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
        }
    }
};
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Post)(":productId"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Param)("productId")),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_color_dto_1.CreateProductColorDto, Object, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductColorController.prototype, "create", null);
__decorate([
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductColorController.prototype, "remove", null);
ProductColorController = __decorate([
    (0, swagger_1.ApiTags)('Product-color*'),
    (0, common_1.Controller)('product-color'),
    __metadata("design:paramtypes", [product_color_service_1.ProductColorService])
], ProductColorController);
exports.ProductColorController = ProductColorController;
//# sourceMappingURL=product-color.controller.js.map