import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Wishlist {
    id: number;
    product: Product;
    user: User;
}
