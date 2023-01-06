import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Item } from './item.schema';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  userId: string;

  @Prop()
  items: Item[];

  @Prop()
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
