import { Product } from 'src/product/entities/product.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
import { ProductSize } from 'src/product_size/entities/product_size.entity';
import { User } from 'src/user/entities/user.entity';
export declare class Cart {
    id: number;
    quantity: number;
    price: number;
    product: Product;
    user: User;
    size: ProductSize;
    color: ProductColor;
}
