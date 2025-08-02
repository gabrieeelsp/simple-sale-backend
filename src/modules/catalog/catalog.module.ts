import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { IsProductNameUniqueConstraint } from './validators/is-product-name-unique.validator';
import { ExistsInDbConstraint } from 'src/common/validators/exists-in-db.decorator';
import { IvaAliquot } from './entities/iva-aliquot.entity';
import { UsersModule } from '../users/users.module';
import { Variant } from './entities/variant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, IvaAliquot, Variant]),
    UsersModule,
  ],
  controllers: [
    ProductsController,
  ],
  providers: [
    ProductsService,
    IsProductNameUniqueConstraint,
    ExistsInDbConstraint,
  ]
})
export class CatalogModule { }
