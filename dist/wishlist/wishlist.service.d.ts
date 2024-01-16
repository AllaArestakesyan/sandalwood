import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Wishlist } from './entities/wishlist.entity';
export declare class WishlistService {
    private productRepository;
    private userRepository;
    private wishlistRepository;
    constructor(productRepository: Repository<Product>, userRepository: Repository<User>, wishlistRepository: Repository<Wishlist>);
    create(createWishlistDto: CreateWishlistDto, userId: number): Promise<Wishlist | {
        message: string;
    }>;
    findOne(id: number): Promise<Wishlist[]>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
