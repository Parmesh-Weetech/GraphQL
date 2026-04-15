import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./types/user-role.type";
import { BaseEntity } from "../common/entity/base.entity";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
    @Field()
    @Column({ nullable: false, default: "Parmesh" })
    name: string;

    @Field()
    @Column({ unique: true, nullable: false, default: "Parmesh" })
    email: string;

    @Field()
    @Column({ nullable: false, enum: UserRole, type: 'enum', default: UserRole.USER })
    userRole: UserRole;

    @Field()
    @Column({ nullable: true })
    password: string;

    @Field()
    @Column({ nullable: true })
    salt: string;
}