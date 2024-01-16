import { Cart } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
import { ProductSize } from 'src/product_size/entities/product_size.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
export declare class Product {
    id: number;
    name: string;
    quantityResultsPurchases: number;
    priceForSimplePurchase: number;
    priceForWholesalePurchase: number;
    description: string;
    brand: string;
    style: number;
    weather: string;
    material: string;
    category: Category;
    sizes: ProductSize[];
    colors: ProductColor[];
    images: ProductImage[];
    wishlist: Wishlist[];
    cart: Cart[];
    order: Order[];
}
