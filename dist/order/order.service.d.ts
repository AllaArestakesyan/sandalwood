import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from './entities/order.entity';
import { ProductSize } from 'src/product_size/entities/product_size.entity';
export declare class OrderService {
    private productRepository;
    private userRepository;
    private cartRepository;
    private orderRepository;
    private productSizeRepository;
    constructor(productRepository: Repository<Product>, userRepository: Repository<User>, cartRepository: Repository<Cart>, orderRepository: Repository<Order>, productSizeRepository: Repository<ProductSize>);
    create(createOrderDto: CreateOrderDto, userId: number): Promise<string>;
    findOne(id: number): Promise<Order[]>;
}
