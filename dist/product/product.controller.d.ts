import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(createProductDto: CreateProductDto, images: Array<any>, req: any, res: Response): Promise<any>;
    findAll(res: Response): Promise<any>;
    filterBy(page: number, categoryName: string, color: string, min_price: number, max_price: number, size: number, limit: number, res: Response): Promise<any>;
    findOne(id: string, res: Response): Promise<any>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<string>;
    remove(id: string, res: Response): Promise<any>;
}
