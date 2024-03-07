import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, UseInterceptors, UploadedFiles, Request, Res, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HasRoles } from 'src/user/role/roles.decorator';
import { Role } from 'src/user/role/enum.role';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/config';
import { Response } from 'express';

@ApiTags("Product*")
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    description: `
    size -> '[{"size":"41","count":4},{"size":"41","count":4}]'\n
    colors -> '["red","green","blue"]'\n
    հարկավոր  է փոխանցել JSON․stringify տարբերակով
    `
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: "string" },
        quantityResultsPurchases: { type: "number" },
        priceForSimplePurchase: { type: "number" },
        priceForWholesalePurchase: { type: "number" },
        quantityRresultPurchases: { type: "number" },
        description: { type: "string" },
        brand: { type: "string" },
        style: { type: "string" },
        weather: { type: "string" },
        material: { type: "string" },
        category: { type: "number" },
        sizes: { type: "body" },
        colors: { type: "body" },
        // sizes: { type: "array", items: { type: "object" } },
        // colors: { type: "array", items: { type: "object" } },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
      required: [
        "name", "quantityResultsPurchases", "priceForSimplePurchase", "priceForWholesalePurchase", "quantityRresultPurchases",
        "description", "brand", "style", "weather", "material", "category", "sizes", "colors", "images"
      ]
    },
  })
  @UseInterceptors(FilesInterceptor('images', null, multerOptions))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Array<any>,
    @Request() req,
    @Res() res: Response) {
    try {
      console.log("createProductDto", createProductDto);
      console.log("images", images);
      const data = await this.productService.create({ ...createProductDto }, images);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.productService.findAll();
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
    }
  }

  @HttpCode(HttpStatus.OK)
  @Get("/filter/by")
  async filterBy(
    @Query("page") page: number,
    @Query("categoryName") categoryName: string,
    @Query("color") color: string,
    @Query("min-price") min_price: number,
    @Query("max-price") max_price: number,
    @Query("size") size: number,
    @Query("limit") limit: number,
    @Res() res: Response) {
    try {
      const data = await this.productService.filterBy({ page, categoryName, color, min_price, max_price, size, limit });
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
    }
  }


  @HttpCode(HttpStatus.OK)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productService.findOne(+id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
    }
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @HttpCode(HttpStatus.OK)
  @HasRoles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productService.remove(+id);
      return res.status(HttpStatus.OK).json(data)
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message, error: true });
    }
  }
}
