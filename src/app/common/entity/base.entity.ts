import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@ObjectType()
export class BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: "updatedAt" })
    updatedAt: Date;

    @Field()
    @DeleteDateColumn({ name: "deletedAt" })
    deletedAt: Date;
}