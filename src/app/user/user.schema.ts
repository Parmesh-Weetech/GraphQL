import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from './types/user-role.type';
import { BaseSchema } from '../common/entity/base.schema';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Schema({ collection: 'users', timestamps: true })
export class UserDocument extends BaseSchema {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Field()
  @Prop({
    required: true,
    enum: {
      values: [UserRole.USER, UserRole.ADMIN],
      message: 'Invalid user role',
    },
    default: UserRole.USER,
  })
  userRole: UserRole;

  @Field()
  @Prop()
  password: string;

  @Field()
  @Prop()
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
export type UserDocumentType = HydratedDocument<UserDocument>;
