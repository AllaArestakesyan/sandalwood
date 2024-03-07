import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Response } from 'express';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    create(createWishlistDto: CreateWishlistDto, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: number, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
