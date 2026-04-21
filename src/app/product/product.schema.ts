import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../common/entity/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { BaseSchema } from '../common/entity/base.schema';

@ObjectType()
@Schema({ collection: 'products', timestamps: true })
export class ProductDocument extends BaseSchema {
  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);
export type ProductDocumentType = HydratedDocument<ProductDocument>;
