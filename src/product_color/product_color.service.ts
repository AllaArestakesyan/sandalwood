import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductColorDto } from './dto/create-product_color.dto';
import { UpdateProductColorDto } from './dto/update-product_color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductColor } from './entities/product_color.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ProductColorService {
  constructor(
    @InjectRepository(ProductColor)
    private colorRepository: Repository<ProductColor>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async create(createcolorProductDto: any, id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (product) {
      const img = this.colorRepository.create({
        ...createcolorProductDto,
        product
      });
      return this.colorRepository.save(img);
    } else {
      throw new NotFoundException('product not found');
    }
  }
 
  // async findAll() {
  //   const data = await this.colorRepository.find()
  //   if (data) {
  //     return data
  //   } else {
  //     throw new NotFoundException('colorProduct not found')
  //   }
  // }

  // async findOne(id: number) {
  //   const ImageProduct = await this.colorRepository.findOne({
  //     where: { id },
  //   });
  //   if (ImageProduct) {
  //     return ImageProduct;
  //   } else {
  //     throw new NotFoundException('colorProduct not found');
  //   }
  // }

  async remove(id: number): Promise<string> {
    const color = await this.colorRepository.findOneBy({ id });
    if (color) {
      this.colorRepository.delete({ id })
      return "delete color by id "+id;
    } else {
      throw new NotFoundException('color not found');
    }
  }

  async removeByProductId(id: number): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });
    if(product){
      this.colorRepository.delete({ product })
    }
    return "delete color by product id "+id;
  }

}
