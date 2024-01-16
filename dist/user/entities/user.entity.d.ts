import { Role } from '../role/enum.role';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
export declare class User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    phone_number: string;
    role: Role;
    pic_url: string;
    emailToken: string;
    code: number;
    isVerified: number;
    wishlist: Wishlist[];
    cart: Cart[];
    order: Order[];
}
