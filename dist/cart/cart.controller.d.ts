import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Response } from 'express';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto, req: any, res: Response): Promise<any>;
    findOne(req: any, res: Response): Promise<any>;
    update(id: number, req: any, res: Response, updateCartDto: UpdateCartDto): Promise<any>;
    remove(id: number, req: any, res: Response): Promise<any>;
}
