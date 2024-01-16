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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("../category/entities/category.entity");
const product_images_service_1 = require("../product-images/product-images.service");
const product_color_service_1 = require("../product_color/product_color.service");
const product_size_service_1 = require("../product_size/product_size.service");
let ProductService = class ProductService {
    constructor(productRepository, categoryRepository, productImageService, productColorService, productSizeService) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.productImageService = productImageService;
        this.productColorService = productColorService;
        this.productSizeService = productSizeService;
    }
    async create(createProductDto, images) {
        const { colors, sizes } = createProductDto, data = __rest(createProductDto, ["colors", "sizes"]);
        const category = await this.categoryRepository.findOneBy({ id: createProductDto.category });
        if (category) {
            const prod = await this.productRepository.create(Object.assign(Object.assign({}, data), { category }));
            const obj = await this.productRepository.save(prod);
            for (let e of images) {
                await this.productImageService.create({ name: e.filename }, obj.id);
            }
            for (let e of JSON.parse(colors)) {
                await this.productColorService.create({ name: e }, obj.id);
            }
            for (let e of JSON.parse(sizes)) {
                await this.productSizeService.create(Object.assign({}, e), obj.id);
            }
            return "add new product";
        }
        else {
            throw new common_1.NotFoundException('category or user not found');
        }
    }
    async findAll() {
        const arr = await this.productRepository
            .createQueryBuilder("product")
            .select(["product.id", "product.name", "product.material", "product.priceForSimplePurchase"])
            .innerJoinAndSelect("product.images", 'product_image')
            .getMany();
        return arr.map(e => (Object.assign(Object.assign({}, e), { images: e.images[0].name })));
    }
    async filterBy({ page, categoryName, color, min_price, max_price, size, limit }) {
        const arr = await this.productRepository
            .createQueryBuilder("product")
            .innerJoinAndSelect("product.colors", "product_color")
            .innerJoinAndSelect("product.sizes", "product_size")
            .innerJoinAndSelect("product.category", "category")
            .where(color ? "product_color.name = :color" : "product_color.id>0", { color })
            .andWhere(size ? "product_size.size = :size" : "product_size.id>0", { size })
            .andWhere(categoryName ? "category.name = :categoryName" : "category.id>0", { categoryName })
            .andWhere(min_price ? "product.priceForSimplePurchase >= :min_price" : "product.priceForSimplePurchase>=0", { min_price })
            .andWhere(max_price ? "product.priceForSimplePurchase <= :max_price" : "product.id>0", { max_price })
            .select(["product.id", "product.name", "product.material", "product.priceForSimplePurchase"])
            .innerJoinAndSelect("product.images", 'product_image')
            .orderBy("product.id")
            .getMany();
        return {
            error: false,
            count: arr.length,
            page,
            rows: arr.map(e => { var _a; return (Object.assign(Object.assign({}, e), { images: (_a = e.images[0].name) !== null && _a !== void 0 ? _a : null })); }).slice(page * limit, page * limit + +limit)
        };
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: { id },
            relations: {
                category: true,
                images: true,
                colors: true,
                sizes: true
            },
        });
        const x = await this.productRepository
            .createQueryBuilder("product")
            .innerJoinAndSelect("product.category", "category")
            .where("category.id=:id", { id: product.category.id })
            .select(["product.id", "product.name", "product.material", "product.priceForSimplePurchase"])
            .innerJoinAndSelect("product.images", 'product_image')
            .limit(3)
            .getMany();
        if (product) {
            return Object.assign(Object.assign({}, product), { products: x.map(e => { var _a; return (Object.assign(Object.assign({}, e), { images: (_a = e.images[0].name) !== null && _a !== void 0 ? _a : null })); }) });
        }
        else {
            throw new common_1.NotFoundException('Product not found');
        }
    }
    async update(id, updateProductDto) {
        const product = await this.productRepository.findOneBy({ id });
        const category = await this.categoryRepository.findOneBy({ id: updateProductDto.category });
        if (!category) {
            throw new common_1.NotFoundException('product not found');
        }
        if (product) {
            const { colors, sizes } = updateProductDto, data = __rest(updateProductDto, ["colors", "sizes"]);
            await this.productRepository.update(id, Object.assign({}, data));
            for (let e of colors) {
                await this.productColorService.create({ name: e }, product.id);
            }
            for (let e of sizes) {
                await this.productSizeService.create(Object.assign({}, e), product.id);
            }
            return "update product - " + product.name;
        }
        else {
            throw new common_1.NotFoundException('product not found');
        }
    }
    async remove(id) {
        const prod = await this.productRepository.findOneBy({ id });
        if (prod) {
            await this.productImageService.removeByProductId(id);
            await this.productRepository.delete({ id });
            return "delete";
        }
        else {
            throw new common_1.NotFoundException('product not found');
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        product_images_service_1.ProductImagesService,
        product_color_service_1.ProductColorService,
        product_size_service_1.ProductSizeService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map