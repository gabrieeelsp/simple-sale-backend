import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { IvaAliquot } from './iva-aliquot.entity';
import { Variant } from './variant.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cost: number;

  @Column({ name: 'is_stock_unitario_variable' })
  isStockUnitarioVariable: boolean;

  @Column({ name: 'stock_aproximado_unidad' })
  stockAproximadoUnidad: number;

  @Column({ name: 'is_enable' })
  isEnable: boolean;

  @Column({ name: 'is_enable_stock' })
  isEnableStock: boolean;

  @Column()
  stock: number;

  @ManyToOne(() => IvaAliquot, { nullable: false })
  @JoinColumn({ name: 'iva_aliquot_id', })
  ivaAliquot: IvaAliquot;

  @OneToMany(() => Variant, (variant) => variant.product)
  variants: Variant[];
}
