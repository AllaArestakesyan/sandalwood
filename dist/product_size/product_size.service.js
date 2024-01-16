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
exports.ProductSizeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_size_entity_1 = require("./entities/product_size.entity");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("../product/entities/product.entity");
let ProductSizeService = class ProductSizeService {
    constructor(sizeRepository, productRepository) {
        this.sizeRepository = sizeRepository;
        this.productRepository = productRepository;
    }
    async create(createsizeProductDto, id) {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            const img = this.sizeRepository.create(Object.assign(Object.assign({}, createsizeProductDto), { product }));
            await this.sizeRepository.save(img);
            return "add new size";
        }
        else {
            throw new common_1.NotFoundException('product not found');
        }
    }
    async remove(id) {
        const size = await this.sizeRepository.findOneBy({ id });
        if (size) {
            this.sizeRepository.delete({ id });
            return "delete size by id " + id;
        }
        else {
            throw new common_1.NotFoundException('size not found');
        }
    }
    async removeByProductId(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (product) {
            this.sizeRepository.delete({ product });
        }
        return "delete size by product id " + id;
    }
    async update(id, updateProductSizeDto) {
        const size = await this.sizeRepository.findOneBy({ id });
        if (size) {
            this.sizeRepository.update({ id }, updateProductSizeDto);
            return "update size by id " + id;
        }
        else {
            throw new common_1.NotFoundException('size not found');
        }
    }
};
ProductSizeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_size_entity_1.ProductSize)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProductSizeService);
exports.ProductSizeService = ProductSizeService;
//# sourceMappingURL=product_size.service.js.map