import { Cart } from "src/cart/entities/cart.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductColor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Product, (product) => product.colors,
        { onDelete: "CASCADE", onUpdate: "CASCADE" })
    product: Product;
    
    @OneToMany(() => Cart, (cart) => cart.product, { cascade: true })
    cart: Cart[];
}
