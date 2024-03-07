import { ProductImagesService } from './product-images.service';
import { Response } from 'express';
export declare class ProductImagesController {
    private readonly productImagesService;
    constructor(productImagesService: ProductImagesService);
    update(obj: any, res: Response, images: Array<any>, req: any): Promise<Response<any, Record<string, any>>>;
    remove(id: string, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
