import { Cart } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { ProductImage } from 'src/product-images/entities/product-image.entity';
import { ProductColor } from 'src/product_color/entities/product_color.entity';
import { ProductSize } from 'src/product_size/entities/product_size.entity';
import { User } from 'src/user/entities/user.entity';
import { Wishlist } from 'src/wishlist/entities/wishlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quantityResultsPurchases: number;

    @Column()
    priceForSimplePurchase: number;

    @Column()
    priceForWholesalePurchase: number;

    @Column()
    description: string;
    
    @Column()
    brand: string;

    @Column()
    style: number;

    @Column()
    weather: string;

    @Column()
    material: string;

    @ManyToOne(() => Category, (category) => category.products,
        { onDelete: "CASCADE", onUpdate: "CASCADE" })
    category: Category;

    @OneToMany(() => ProductSize, (size) => size.product, { cascade: true })
    sizes: ProductSize[];

    @OneToMany(() => ProductColor, (color) => color.product, { cascade: true })
    colors: ProductColor[];

    @OneToMany(() => ProductImage, (imageProduct) => imageProduct.product, { cascade: true })
    images: ProductImage[];

    @OneToMany(() => Wishlist, (wish) => wish.product, { cascade: true })
    wishlist: Wishlist[];

    @OneToMany(() => Cart, (cart) => cart.product, { cascade: true })
    cart: Cart[];

    @OneToMany(() => Order, (order) => order.product, { cascade: true })
    order: Order[];

}