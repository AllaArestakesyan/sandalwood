import { NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { ProductImage } from './entities/product-image.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
export declare class ProductImagesService {
    private imageRepository;
    private productRepository;
    constructor(imageRepository: Repository<ProductImage>, productRepository: Repository<Product>);
    create(createImageProductDto: CreateProductImageDto, id: number): Promise<ProductImage>;
    addImagesProduct(id: number, images: any): Promise<NotFoundException | "Updated">;
    remove(id: number): Promise<string>;
    removeByProductId(id: number): Promise<string>;
}
