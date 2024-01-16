import { Module } from '@nestjs/common';
import { ProductColorService } from './product_color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductColor } from './entities/product_color.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductColorController } from './product-color.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductColor, Product])],
  providers: [ProductColorService],
  controllers:[ProductColorController],
  exports: [ProductColorService]
})
export class ProductColorModule {}
