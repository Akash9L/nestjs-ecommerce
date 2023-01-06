import { ApiProperty } from '@nestjs/swagger';

export class ItemDTO {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  quantity: number;
}
