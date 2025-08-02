import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductFilterDto } from '../dtos/requests/product-filter.dto';
import { CreateProductDto } from '../dtos/requests/create-product.dto';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
  ) { }

  async create(productDto: CreateProductDto) {
    const product = this.repo.create({
      ...productDto,
      ivaAliquot: { id: productDto.ivaAliquotId }
    });

    try {
      const { id } = await this.repo.save(product);
      return await this.findOne(id);
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail || '';

        if (detail.includes('(name)')) throw new ConflictException('Ya existe un producto con ese nombre');
        throw new ConflictException('Ya existe un registro con esos datos');
      }

      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async update(id: number, attr: Partial<Product>) {
    const product = await this.repo.findOneBy({ id });
    if (!product) throw new NotFoundException('Product not found');

    Object.assign(product, attr);
    try {
      const { id } = await this.repo.save(product);
      return await this.findOne(id);
    } catch (error) {
      if (error.code === '23505') {
        const detail = error.detail || '';

        if (detail.includes('(name)')) throw new ConflictException('Ya existe un producto con ese nombre');
        throw new ConflictException('Ya existe un registro con esos datos');
      }

      throw new InternalServerErrorException('Error al actualizar el producto');
    }
  }

  async find(filters: Partial<ProductFilterDto>, page = 1, limit = 10) {
    const query = this.repo.createQueryBuilder('product');

    query.leftJoinAndSelect('product.ivaAliquot', 'ivaAliquot');
    query.leftJoinAndSelect('product.variants', 'variants');

    if (filters.name) {
      const palabras = filters.name.trim().split(/\s+/);

      const condiciones: string[] = [];
      const parametros: Record<string, string> = {};

      palabras.forEach((palabra, idx) => {
        const param = `word${idx}`;
        if (palabra.startsWith('!')) {
          condiciones.push(`product.name NOT ILIKE :${param}`);
          parametros[param] = `%${palabra.slice(1)}%`;
        } else {
          condiciones.push(`product.name ILIKE :${param}`);
          parametros[param] = `%${palabra}%`;
        }
      });

      if (condiciones.length > 0) {
        query.andWhere(condiciones.join(' AND '), parametros);
      }
    }

    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();

    return { data, total };
  }

  findByName(name: string) {
    return this.repo.findOneBy({ name });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['ivaAliquot', 'variants'],
    });
    if (!product) throw new NotFoundException();

    return product;
  }
}
