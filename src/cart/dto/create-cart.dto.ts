import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty()
    productId:number
    @ApiProperty()
    quantity:number
    @ApiProperty()
    colorId:number
    @ApiProperty()
    sizeId:number
}
