import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity({ name: "users" })
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ nullable: false, default: "Parmesh" })
    name: string;

    @Field()
    @Column({ unique: true, nullable: false, default: "Parmesh" })
    email: string;

    @Field()
    @Column({ nullable: true })
    password: string;

    @Field()
    @Column({ nullable: true })
    salt: string;
}