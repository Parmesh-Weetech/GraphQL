import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from './types/user-role.type';

@Schema({ collection: 'users', timestamps: true })
export class UserDocument {
  @Prop({ type: 'string' })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    enum: {
      values: [UserRole.USER, UserRole.ADMIN],
      message: 'Invalid user role',
    },
    default: UserRole.USER,
  })
  userRole: UserRole;

  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop({ type: 'date' })
  createdAt: Date;

  @Prop({ type: 'date' })
  updatedAt: Date;

  @Prop({ type: 'date' })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
export type UserDocumentType = HydratedDocument<UserDocument>;
