import { PartialType } from '@nestjs/swagger';
import { Order } from '../schemas/order.schema';

export class UpdateorderDto extends PartialType(Order) {}
