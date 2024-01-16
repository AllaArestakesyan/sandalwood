import { ProductSizeService } from './product_size.service';
import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';
import { Response } from 'express';
export declare class ProductSizeController {
    private readonly productSizeService;
    constructor(productSizeService: ProductSizeService);
    create(createProductSizeDto: CreateProductSizeDto, req: any, id: number, res: Response): Promise<any>;
    update(id: string, updateProductSizeDto: UpdateProductSizeDto, req: any, res: Response): Promise<any>;
    remove(id: string, req: any, res: Response): Promise<any>;
}
