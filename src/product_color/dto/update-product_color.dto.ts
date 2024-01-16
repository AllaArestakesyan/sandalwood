import { PartialType } from '@nestjs/swagger';
import { CreateProductColorDto } from './create-product_color.dto';

export class UpdateProductColorDto extends PartialType(CreateProductColorDto) {}
