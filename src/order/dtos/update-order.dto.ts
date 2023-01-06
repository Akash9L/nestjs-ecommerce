import { PartialType } from '@nestjs/swagger';
import { CreateOrderDTO } from './create-order.dto';

export class UpdateorderDto extends PartialType(CreateOrderDTO) {}
