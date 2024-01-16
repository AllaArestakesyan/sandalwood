import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Cart } from './entities/cart.entity';
import { ProductSize } from 'src/product_size/entities/product_size.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
export declare class CartService {
    private productRepository;
    private userRepository;
    private cartRepository;
    private productSizeRepository;
    private producrColortRepository;
    constructor(productRepository: Repository<Product>, userRepository: Repository<User>, cartRepository: Repository<Cart>, productSizeRepository: Repository<ProductSize>, producrColortRepository: Repository<ProductColor>);
    create(createCartDto: CreateCartDto, userId: number): Promise<Cart | import("typeorm").UpdateResult>;
    findOne(id: number): Promise<Cart[]>;
    update(id: number, updateCartDto: UpdateCartDto, userId: number): Promise<string>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
