import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../common/entity/base.entity";

@ObjectType()
@Entity({ name: 'products' })
export class Product extends BaseEntity {
    @Field()
    @Column({ nullable: false })
    name: string;

    @Field()
    @Column({ nullable: false, type: 'numeric' })
    price: number;
}