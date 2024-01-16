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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("../product/entities/product.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const order_entity_1 = require("./entities/order.entity");
const product_size_entity_1 = require("../product_size/entities/product_size.entity");
let OrderService = class OrderService {
    constructor(productRepository, userRepository, cartRepository, orderRepository, productSizeRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.productSizeRepository = productSizeRepository;
    }
    async create(createOrderDto, userId) {
        const { cartId } = createOrderDto;
        const user = await this.userRepository.findOneBy({ id: userId });
        const cart = await this.cartRepository.findOne({
            where: { id: cartId },
            relations: {
                product: true,
                size: true,
                color: true,
                user: true,
            }
        });
        if (user && cart) {
            const product = await this.productRepository.findOne({
                where: { id: cart.product.id }
            });
            if (product && cart.user.id == user.id) {
                const order = this.orderRepository.create({
                    product,
                    user,
                    quantity: cart.quantity,
                    size: cart.size.size,
                    price: cart.price,
                    color: cart.color.name
                });
                await this.orderRepository.save(order);
                await this.productSizeRepository.update({ id: cart.size.id }, {
                    count: cart.size.count - cart.quantity
                });
                await this.cartRepository.delete({ id: cart.id });
                return "add order";
            }
            else {
                throw new common_1.NotFoundException('data is incorrect');
            }
        }
        else {
            throw new common_1.NotFoundException('user or cart not found');
        }
    }
    async findOne(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (user) {
            return await this.orderRepository.find({
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
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
    __param(3, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(4, (0, typeorm_1.InjectRepository)(product_size_entity_1.ProductSize)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map