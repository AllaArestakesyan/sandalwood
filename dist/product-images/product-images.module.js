"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImagesModule = void 0;
const common_1 = require("@nestjs/common");
const product_images_service_1 = require("./product-images.service");
const product_images_controller_1 = require("./product-images.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_image_entity_1 = require("./entities/product-image.entity");
const product_entity_1 = require("../product/entities/product.entity");
let ProductImagesModule = class ProductImagesModule {
};
ProductImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_image_entity_1.ProductImage, product_entity_1.Product])],
        controllers: [product_images_controller_1.ProductImagesController],
        providers: [product_images_service_1.ProductImagesService],
        exports: [product_images_service_1.ProductImagesService],
    })
], ProductImagesModule);
exports.ProductImagesModule = ProductImagesModule;
//# sourceMappingURL=product-images.module.js.map