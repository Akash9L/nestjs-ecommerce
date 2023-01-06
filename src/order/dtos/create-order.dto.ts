import { ApiProperty } from '@nestjs/swagger';
import { PaymentModes } from '../enums/payment-mode.enum';
import { PaymentStatus } from '../enums/payment-status.enum';

export class CreateOrderDTO {
  @ApiProperty()
  cartId: string;

  @ApiProperty({
    enum: PaymentModes,
  })
  paymentMode: PaymentModes;

  @ApiProperty()
  address: string;
}
