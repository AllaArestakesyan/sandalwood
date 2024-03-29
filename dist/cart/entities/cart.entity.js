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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const product_entity_1 = require("../../product/entities/product.entity");
const product_color_entity_1 = require("../../product_color/entities/product_color.entity");
const product_size_entity_1 = require("../../product_size/entities/product_size.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let Cart = class Cart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Cart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Cart.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.cart, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", product_entity_1.Product)
], Cart.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cart, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", user_entity_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_size_entity_1.ProductSize, (size) => size.cart, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", product_size_entity_1.ProductSize)
], Cart.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_color_entity_1.ProductColor, (color) => color.cart, { onDelete: "CASCADE", onUpdate: "CASCADE" }),
    __metadata("design:type", product_color_entity_1.ProductColor)
], Cart.prototype, "color", void 0);
Cart = __decorate([
    (0, typeorm_1.Entity)()
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=cart.entity.js.map