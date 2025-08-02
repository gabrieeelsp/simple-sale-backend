import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('iva_aliquots')
export class IvaAliquot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  @Column({name: 'id_afip'})
  idAfip: string;
}
