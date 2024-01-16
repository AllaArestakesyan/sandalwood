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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const cart_entity_1 = require("./entities/cart.entity");
const product_size_entity_1 = require("../product_size/entities/product_size.entity");
const product_color_entity_1 = require("../product_color/entities/product_color.entity");
let CartService = class CartService {
    constructor(productRepository, userRepository, cartRepository, productSizeRepository, producrColortRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.productSizeRepository = productSizeRepository;
        this.producrColortRepository = producrColortRepository;
    }
    async create(createCartDto, userId) {
        const { productId, quantity, colorId, sizeId } = createCartDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        const product = await this.productRepository.findOneBy({ id: productId });
        if (user && product) {
            const productColor = await this.producrColortRepository.findOne({
                where: { id: colorId },
                relations: { product: true }
            });
            const productSize = await this.productSizeRepository.findOne({
                where: { id: sizeId },
                relations: { product: true }
            });
            if (productColor &&
                productSize &&
                productColor.product.id == product.id &&
                productSize.product.id == product.id &&
                productSize.count >= quantity) {
                const x = await this.cartRepository.findOneBy({
                    product,
                    user,
                });
                if (!x) {
                    const wish = this.cartRepository.create({
                        product,
                        user,
                        quantity,
                        size: productSize,
                        color: productColor,
                        price: product.priceForSimplePurchase
                    });
                    return this.cartRepository.save(wish);
                }
                else {
                    return await this.cartRepository.update({ id: x.id }, {
                        quantity: x.quantity + 1
                    });
                }
            }
            else {
                throw new common_1.NotFoundException('data is incorrect');
            }
        }
        else {
            throw new common_1.NotFoundException('user or product not found');
        }
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
            return await this.cartRepository.find({
                where: {
                    user
                },
                relations: {
                    product: true,
                    size: true,
                    color: true
                }
            });
        }
        else {
            throw new common_1.NotFoundException('user not found');
        }
    }
    async update(id, updateCartDto, userId) {
        const { quantity } = updateCartDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        if (user) {
            const wish = await this.cartRepository.findOne({
                where: {
                    id
                },
                relations: {
                    user: true,
                    product: true,
                    size: true
                }
            });
            if (wish && wish.user.id == user.id) {
                if (wish.size.count >= quantity) {
                    await this.cartRepository.update({ id }, { quantity });
                    return 'data update';
                }
                else {
                    throw new common_1.NotFoundException('data is incorrect');
                }
            }
            else {
                throw new common_1.NotFoundException("you don't have any access");
            }
        }
        else {
            throw new common_1.NotFoundException('user not found');
        }
    }
    async remove(id, userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (user) {
            const wish = await this.cartRepository.findOne({
                where: {
                    id
                },
                relations: {
                    user: true
                }
            });
            if (wish && wish.user.id == user.id) {
                return await this.cartRepository.delete({ id });
            }
            else {
                throw new common_1.NotFoundException("you don't have any access");
            }
        }
        else {
            throw new common_1.NotFoundException('user not found');
        }
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(3, (0, typeorm_1.InjectRepository)(product_size_entity_1.ProductSize)),
    __param(4, (0, typeorm_1.InjectRepository)(product_color_entity_1.ProductColor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map