import { Product } from "src/products/entities/product.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn('uuid')
    providerId: string;
    @Column('text')
    providerName: string;
    @Column('text')
    providerEmail: string;
    @Column({
        type: 'text',
        nullable: true
    })
    providerPhoneNumber: string;

    @ManyToMany(() => Product ,(photo) => photo.provider )
            products: Product[]
}
