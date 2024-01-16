import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

class Size {
    @ApiProperty()
    size: string;
    @ApiProperty()
    count: number
}
export class UpdateProductDto  {
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantityResultsPurchases: number;

    @ApiProperty()
    priceForSimplePurchase: number;

    @ApiProperty()
    priceForWholesalePurchase: number;
    
    @ApiProperty()
    quantityRresultPurchases: number;

    @ApiProperty()
    description: string;

    @ApiProperty()
    brand: string;

    @ApiProperty()
    style: string;

    @ApiProperty()
    weather: string;

    @ApiProperty()
    material: string;
    
    @ApiProperty()
    category: number;

    @ApiProperty()
    colors: string[];

    @ApiProperty({type:[Size]})
    sizes: Size[];
}