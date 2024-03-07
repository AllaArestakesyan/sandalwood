import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Response } from 'express';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: number, req: any, res: Response, updateCartDto: UpdateCartDto): Promise<Response<any, Record<string, any>>>;
    remove(id: number, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
