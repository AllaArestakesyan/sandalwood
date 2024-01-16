import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';
import { ProductSize } from './entities/product_size.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
export declare class ProductSizeService {
    private sizeRepository;
    private productRepository;
    constructor(sizeRepository: Repository<ProductSize>, productRepository: Repository<Product>);
    create(createsizeProductDto: CreateProductSizeDto, id: number): Promise<string>;
    remove(id: number): Promise<string>;
    removeByProductId(id: number): Promise<string>;
    update(id: number, updateProductSizeDto: UpdateProductSizeDto): Promise<string>;
}
