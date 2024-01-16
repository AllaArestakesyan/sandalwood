import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
export declare class ProductSize {
    id: number;
    size: number;
    count: number;
    product: Product;
    cart: Cart[];
}
