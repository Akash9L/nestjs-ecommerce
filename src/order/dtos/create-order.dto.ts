import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../enums/payment-status.enum';

export class CreateOrderDTO {
  @ApiProperty()
  cartId: string;

  @ApiProperty()
  paymentMode: PaymentStatus;

  @ApiProperty()
  address: string;
}
