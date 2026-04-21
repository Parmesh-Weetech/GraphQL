import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
export class BaseSchema {
  @Field(() => ID)
  @Prop({ type: 'string' })
  id: string;

  @Field({ nullable: true })
  @Prop({ type: 'date', required: false })
  createdAt: Date;

  @Field({ nullable: true })
  @Prop({ type: 'date', required: false })
  updatedAt: Date;

  @Field({ nullable: true })
  @Prop({ type: 'date', required: false })
  deletedAt: Date;
}
