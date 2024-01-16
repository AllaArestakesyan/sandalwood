"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductColorModule = void 0;
const common_1 = require("@nestjs/common");
const product_color_service_1 = require("./product_color.service");
const typeorm_1 = require("@nestjs/typeorm");
const product_color_entity_1 = require("./entities/product_color.entity");
const product_entity_1 = require("../product/entities/product.entity");
const product_color_controller_1 = require("./product-color.controller");
let ProductColorModule = class ProductColorModule {
};
ProductColorModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_color_entity_1.ProductColor, product_entity_1.Product])],
        providers: [product_color_service_1.ProductColorService],
        controllers: [product_color_controller_1.ProductColorController],
        exports: [product_color_service_1.ProductColorService]
    })
], ProductColorModule);
exports.ProductColorModule = ProductColorModule;
//# sourceMappingURL=product_color.module.js.map