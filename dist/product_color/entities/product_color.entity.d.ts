import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
export declare class ProductColor {
    id: number;
    name: string;
    product: Product;
    cart: Cart[];
}
