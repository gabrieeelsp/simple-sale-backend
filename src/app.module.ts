import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { CatalogModule } from './modules/catalog/catalog.module';
import { Product } from './modules/catalog/entities/product.entity';
import { IvaAliquot } from './modules/catalog/entities/iva-aliquot.entity';
import { Variant } from './modules/catalog/entities/variant.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Product, IvaAliquot, Variant],
      synchronize: false,   // 👈 NO tocar la base (porque la estás creando a mano)
    }),
    UsersModule,
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
