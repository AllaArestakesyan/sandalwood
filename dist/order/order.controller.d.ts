import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Response } from 'express';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto, req: any, res: Response): Promise<any>;
    findOne(req: any, res: Response): Promise<any>;
}
