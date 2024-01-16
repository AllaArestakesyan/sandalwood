import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductSize } from 'src/product_size/entities/product_size.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product, ProductSize, ProductColor])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
