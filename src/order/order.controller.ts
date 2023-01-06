import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateorderDto } from './dtos/update-order.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('/')
  async getOrders(@Request() req) {
    const userId = req.user.userId;
    const orders = await this.orderService.getAllOrdersForUser(userId);
    return orders;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Post('/')
  async creatOrder(@Request() req, @Body() createOrderDTO: CreateOrderDTO) {
    const user = req.user;
    const order = await this.orderService.createOrder(
      createOrderDTO,
      user.userId,
    );
    return order;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('/:id')
  async getOrder(@Param('id') id: string) {
    const order = await this.orderService.getOrder(id);
    if (!order) throw new NotFoundException('Order does not exist!');
    return order;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateorderDto: UpdateorderDto,
  ) {
    const order = await this.orderService.updateOrder(id, updateorderDto);
    if (!order) throw new NotFoundException('Order does not exist!');
    return order;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('/:id/details')
  async getOrderDetails(@Param('id') id: string) {
    const order = await this.orderService.getOrderDetails(id);
    if (!order) throw new NotFoundException('Order does not exist!');
    return order;
  }
}
