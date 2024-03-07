"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const category_module_1 = require("./category/category.module");
const product_module_1 = require("./product/product.module");
const product_size_module_1 = require("./product_size/product_size.module");
const user_card_module_1 = require("./user_card/user_card.module");
const order_module_1 = require("./order/order.module");
const user_entity_1 = require("./user/entities/user.entity");
const product_entity_1 = require("./product/entities/product.entity");
const product_size_entity_1 = require("./product_size/entities/product_size.entity");
const product_color_entity_1 = require("./product_color/entities/product_color.entity");
const product_color_module_1 = require("./product_color/product_color.module");
const product_images_module_1 = require("./product-images/product-images.module");
const product_image_entity_1 = require("./product-images/entities/product-image.entity");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const wishlist_entity_1 = require("./wishlist/entities/wishlist.entity");
const cart_module_1 = require("./cart/cart.module");
const cart_entity_1 = require("./cart/entities/cart.entity");
const order_entity_1 = require("./order/entities/order.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.development.env',
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: "root",
                password: "",
                database: "test2",
                entities: [user_entity_1.User, product_entity_1.Product, product_size_entity_1.ProductSize, product_image_entity_1.ProductImage, product_color_entity_1.ProductColor, wishlist_entity_1.Wishlist, cart_entity_1.Cart, order_entity_1.Order],
                autoLoadEntities: true,
                synchronize: true,
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'sandalwoodstyle@gmail.com',
                        pass: 'qgrg lbux kluf qucz',
                    },
                },
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            product_size_module_1.ProductSizeModule,
            product_color_module_1.ProductColorModule,
            product_images_module_1.ProductImagesModule,
            wishlist_module_1.WishlistModule,
            user_card_module_1.UserCardModule,
            order_module_1.OrderModule,
            cart_module_1.CartModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map