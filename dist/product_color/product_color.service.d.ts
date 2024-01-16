import { ProductColor } from './entities/product_color.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
export declare class ProductColorService {
    private colorRepository;
    private productRepository;
    constructor(colorRepository: Repository<ProductColor>, productRepository: Repository<Product>);
    create(createcolorProductDto: any, id: number): Promise<ProductColor[]>;
    remove(id: number): Promise<string>;
    removeByProductId(id: number): Promise<string>;
}
