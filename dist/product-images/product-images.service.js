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
exports.ProductImagesService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const typeorm_1 = require("@nestjs/typeorm");
const product_image_entity_1 = require("./entities/product-image.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const path_1 = require("path");
let ProductImagesService = class ProductImagesService {
    constructor(imageRepository, productRepository) {
        this.imageRepository = imageRepository;
        this.productRepository = productRepository;
    }
    async create(createImageProductDto, id) {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            const img = this.imageRepository.create(Object.assign(Object.assign({}, createImageProductDto), { product }));
            return this.imageRepository.save(img);
        }
        else {
            throw new common_1.NotFoundException('product not found');
        }
    }
    async addImagesProduct(id, images) {
        const product = await this.productRepository.findOneBy({ id });
        console.log(product, images);
        if (product) {
            for (let e of images) {
                await this.imageRepository.save({ name: e.filename, product });
            }
            return 'Updated';
        }
        else {
            return new common_1.NotFoundException('product not found');
        }
    }
    async remove(id) {
        const img = await this.imageRepository.findOneBy({ id });
        if (img) {
            fs.unlinkSync((0, path_1.join)(__dirname, '..\\..', 'uploads\\') + img.name);
            this.imageRepository.delete({ id });
            return "delete image by id ";
        }
        else {
            throw new common_1.NotFoundException('img not found');
        }
    }
    async removeByProductId(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            const imgs = await this.imageRepository.find({
                where: { product }
            });
            this.imageRepository.delete({ product });
            for (let e of imgs) {
                fs.unlinkSync((0, path_1.join)(__dirname, '..\\..', 'uploads\\') + e.name);
            }
        }
        return "delete image by product id ";
    }
};
ProductImagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_image_entity_1.ProductImage)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductImagesService);
exports.ProductImagesService = ProductImagesService;
//# sourceMappingURL=product-images.service.js.map