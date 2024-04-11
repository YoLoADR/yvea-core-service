import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Plugin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    monthlyPrice: number;
}