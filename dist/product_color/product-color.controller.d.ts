import { ProductColorService } from './product_color.service';
import { CreateProductColorDto } from './dto/create-product_color.dto';
import { Response } from 'express';
export declare class ProductColorController {
    private readonly productColorService;
    constructor(productColorService: ProductColorService);
    create(createProductColorDto: CreateProductColorDto, req: any, id: number, res: Response): Promise<any>;
    remove(id: string, req: any, res: Response): Promise<any>;
}
