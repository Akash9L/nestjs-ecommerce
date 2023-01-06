import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { CartStatus } from 'src/cart/enums/cart-status.dto';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateorderDto } from './dtos/update-order.dto';
import { OrderStatus } from './enums/order-status.enum';
import { PaymentStatus } from './enums/payment-status.enum';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private cartService: CartService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find();
    return orders;
  }

  async getAllOrdersForUser(userId: string): Promise<Order[]> {
    const orders = await this.orderModel.find({
      user: userId,
    });
    return orders;
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);
    return order;
  }

  async createOrder(
    createOrderDTO: CreateOrderDTO,
    userId: string,
  ): Promise<Order> {
    const cart = await this.cartService.updateCartStatus(
      createOrderDTO.cartId,
      CartStatus.LOCKED,
    );
    const newOrder = await this.orderModel.create({
      ...createOrderDTO,
      user: userId,
    });
    return newOrder.save();
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateorderDto,
  ): Promise<Order> {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      updateOrderDto,
      { new: true },
    );
    return updatedOrder;
  }
}
