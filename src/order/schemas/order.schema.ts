import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Cart } from 'src/cart/schemas/cart.schema';
import { User } from 'src/user/schemas/user.schema';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentModes } from '../enums/payment-mode.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  user: User;

  @Prop({ type: SchemaTypes.ObjectId, ref: Cart.name })
  cartId: Cart;

  @Prop({ default: OrderStatus.CREATED })
  orderStatus: OrderStatus;

  @Prop({ default: PaymentModes.CASHONDELIVERY })
  paymentMode: PaymentModes;

  @Prop({ default: PaymentStatus.UNPAID })
  paymentStatus: PaymentStatus;

  @Prop()
  address: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
