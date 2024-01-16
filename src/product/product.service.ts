import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { ProductImagesService } from 'src/product-images/product-images.service';
import { ProductColorService } from 'src/product_color/product_color.service';
import { ProductSizeService } from 'src/product_size/product_size.service';
import { ProductImage } from 'src/product-images/entities/product-image.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private productImageService: ProductImagesService,
    private productColorService: ProductColorService,
    private productSizeService: ProductSizeService,
  ) { }

  async create(createProductDto: CreateProductDto, images: any) {
    const { colors, sizes, ...data }: any = createProductDto;
    const category = await this.categoryRepository.findOneBy({ id: createProductDto.category });
    if (category) {
      const prod = await this.productRepository.create({
        ...data,
        category
      });
      const obj: any = await this.productRepository.save(prod)
      // console.log(images, colors, sizes);
      for (let e of images) {
        await this.productImageService.create({ name: e.filename }, obj.id)
      }
      for (let e of JSON.parse(colors)) {
        await this.productColorService.create({ name: e }, obj.id)
      }
      for (let e of JSON.parse(sizes)) {
        await this.productSizeService.create({ ...e }, obj.id)
      }
      // return { createProductDto, images, sizes, colors };
      return "add new product"
    } else {
      throw new NotFoundException('category or user not found');

    }
  }

  async findAll() {
    const arr = await this.productRepository
      .createQueryBuilder("product")
      .select(["product.id", "product.name", "product.material", "product.priceForSimplePurchase"])
      .innerJoinAndSelect("product.images", 'product_image')
      .getMany()
    return arr.map(e => ({ ...e, images: e.images[0].name }))
  }
  async filterBy({ page, categoryName, color, min_price, max_price, size, limit }:
    { page: number, categoryName: string, color: string, min_price: number, max_price: number, size: number, limit: number }) {

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
      .getMany()
    return {
      error: false,
      count: arr.length,
      page,
      rows: arr.map(e => ({ ...e, images: e.images[0].name ?? null })).slice(page * limit, page * limit + +limit)
    }
  }

  async findOne(id: number) {
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
    .where("category.id=:id", {id:product.category.id})
    .select(["product.id", "product.name", "product.material", "product.priceForSimplePurchase"])
    .innerJoinAndSelect("product.images", 'product_image')
    .limit(3)
    .getMany()
    if (product) {
      return {...product, products:x.map(e => ({ ...e, images: e.images[0].name ?? null }))};
    } else {
      throw new NotFoundException('Product not found');
    }
  }


  async update(id: number, updateProductDto: UpdateProductDto): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });
    const category = await this.categoryRepository.findOneBy({ id: updateProductDto.category });
    if (!category) {
      throw new NotFoundException('product not found');
    }
    if (product) {
      const { colors, sizes, ...data }: any = updateProductDto;
      await this.productRepository.update(id, { ...data })
      for (let e of colors) {
        await this.productColorService.create({ name: e }, product.id)
      }
      for (let e of sizes) {
        await this.productSizeService.create({ ...e }, product.id)
      }
      return "update product - " + product.name;
    } else {
      throw new NotFoundException('product not found');
    }
  }

  async remove(id: number): Promise<string> {
    const prod = await this.productRepository.findOneBy({ id });
    if (prod) {
      await this.productImageService.removeByProductId(id)
      await this.productRepository.delete({ id })
      return "delete";
    } else {
      throw new NotFoundException('product not found');
    }
  }
}
