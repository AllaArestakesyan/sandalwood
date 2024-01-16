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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const wishlist_entity_1 = require("./entities/wishlist.entity");
let WishlistService = class WishlistService {
    constructor(productRepository, userRepository, wishlistRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.wishlistRepository = wishlistRepository;
    }
    async create(createWishlistDto, userId) {
        const { productId } = createWishlistDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        const product = await this.productRepository.findOneBy({ id: productId });
        if (user && product) {
            const x = await this.wishlistRepository.findOneBy({
                product,
                user
            });
            if (!x) {
                const wish = this.wishlistRepository.create({
                    product,
                    user
                });
                return this.wishlistRepository.save(wish);
            }
            else {
                return { message: "You already liked this product" };
            }
        }
        else {
            throw new common_1.NotFoundException('user or product not found');
        }
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
            return await this.wishlistRepository.find({
                where: {
                    user
                },
                relations: {
                    product: true
                }
            });
        }
        else {
            throw new common_1.NotFoundException('user not found');
        }
    }
    async remove(id, userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (user) {
            const wish = await this.wishlistRepository.findOne({
                where: {
                    id
                },
                relations: {
                    user: true
                }
            });
            if (wish && wish.user.id == user.id) {
                return await this.wishlistRepository.delete({ id });
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
WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(wishlist_entity_1.Wishlist)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WishlistService);
exports.WishlistService = WishlistService;
//# sourceMappingURL=wishlist.service.js.map