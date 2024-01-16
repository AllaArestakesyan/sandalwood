import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductSizeModule } from './product_size/product_size.module';
import { UserCardModule } from './user_card/user_card.module';
import { OrderModule } from './order/order.module';
import { User } from './user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { ProductSize } from './product_size/entities/product_size.entity';
import { ProductColor } from './product_color/entities/product_color.entity';
import { ProductColorModule } from './product_color/product_color.module';
import { ProductImagesModule } from './product-images/product-images.module';
import { ProductImage } from './product-images/entities/product-image.entity';
import { WishlistModule } from './wishlist/wishlist.module';
import { Wishlist } from './wishlist/entities/wishlist.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      // username:"xojwxtmy_Admin",
      // password:"admin2023sandalwood",
      // database:"xojwxtmy_db",
      username:"root",
      password:"",
      database:"test2",
      entities: [User, Product, ProductSize, ProductImage, ProductColor, Wishlist, Cart, Order],
      autoLoadEntities:true,
      synchronize: true,
    }),
    MailerModule.forRoot({
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
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    ProductSizeModule,
    ProductColorModule,
    ProductImagesModule,
    WishlistModule,
    UserCardModule,
    OrderModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
