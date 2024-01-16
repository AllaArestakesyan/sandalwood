import { ApiProperty } from "@nestjs/swagger";
class Size {
    size: string;
    count: number
}
export class CreateProductDto {
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

    @ApiProperty()
    sizes:Size[];
}
