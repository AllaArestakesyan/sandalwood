import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Request, Res } from '@nestjs/common';
import { ProductColorService } from './product_color.service';
import { CreateProductColorDto } from './dto/create-product_color.dto';
import { UpdateProductColorDto } from './dto/update-product_color.dto';
import { HasRoles } from 'src/user/role/roles.decorator';
import { Role } from 'src/user/role/enum.role';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Response } from 'express';


@ApiTags('Product-color*')
@Controller('product-color')
export class ProductColorController {
  constructor(private readonly productColorService: ProductColorService) { }

  @HttpCode(HttpStatus.OK)
  // @HasRoles(Role.ADMIN)
  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post(":productId")
  async create(@Body() createProductColorDto: CreateProductColorDto,
    @Request() req,
    @Param("productId") id: number,
    @Res() res: Response) {
    try {
      const data = await this.productColorService.create(createProductColorDto, id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  // @Get()
  // async findAll() {
  //   return this.productColorService.findAll();
  // }

  // @Get(':id')
  // async  findOne(@Param('id') id: string) {
  //   return this.productColorService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductColorDto: UpdateProductColorDto) {
  //   return this.productColorService.update(+id, updateProductColorDto);
  // }

  @HttpCode(HttpStatus.OK)
  // @HasRoles(Role.ADMIN)
  // @ApiBearerAuth('JWT-auth')
  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string,
    @Request() req,
    @Res() res: Response) {
    try {
      const data = await this.productColorService.remove(+id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}
