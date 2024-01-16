import { ApiProperty } from "@nestjs/swagger";

export class CreateProductSizeDto {
    @ApiProperty()
    size: number;

    @ApiProperty()
    count: number;
}

