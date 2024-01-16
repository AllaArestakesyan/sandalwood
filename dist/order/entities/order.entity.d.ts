import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Order {
    id: number;
    quantity: number;
    size: number;
    price: number;
    color: string;
    product: Product;
    user: User;
}
