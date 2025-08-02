import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from '../services/products.service';

import { UpdateProductDto } from '../dtos/requests/update-product.dto';
import { ProductFilterDto } from '../dtos/requests/product-filter.dto';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from '../dtos/responses/product.dto';
import { CreateProductDto } from '../dtos/requests/create-product.dto';
import { ApiPaginatedResponse } from 'src/common/dto/response/api-paginated-response.dto';
import { Auth } from 'src/modules/users/guards/auth.guard';
import { UserRole } from 'src/modules/users/entities/user-role';

@Controller('products')
export class ProductsController {

  constructor(
    private readonly productsService: ProductsService,
  ) { };

  @Post()
  @Auth(UserRole.ADMIN, UserRole.OPERATOR)
  createProduct(@Body() body: CreateProductDto) {
    const product = this.productsService.create(body);

    const productDto = plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });

    return productDto;
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductDto) {
    const product = await this.productsService.update(id, body);

    const productDto = plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });

    return productDto;
  }

  @Get()
  async getProducts(@Query() filters: ProductFilterDto) {
    const { page, limit, ...criteria } = filters;

    const { data: products, total } = await this.productsService.find(criteria, page, limit);

    const productsDto = plainToInstance(ProductDto, products, {
      excludeExtraneousValues: true,
    });

    return new ApiPaginatedResponse(
      productsDto,
      page,
      limit,
      total,
    );
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number) {
    const product = this.productsService.findOne(id);

    return plainToInstance(ProductDto, product, {
      excludeExtraneousValues: true,
    });
  }
}
