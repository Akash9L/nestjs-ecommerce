import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartService } from 'src/cart/cart.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateorderDto } from './dtos/update-order.dto';
import { Order, OrderDocument } from './schemas/order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    private cartService: CartService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find().populate('user', 'username');
    return orders;
  }

  async getAllOrdersForUser(userId: string): Promise<Order[]> {
    const orders = await this.orderModel
      .find({
        user: userId,
      })
      .populate('user', 'username');
    return orders;
  }

  async getOrder(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).catch((error) => {
      console.log(error);
      throw error;
    });
    return order;
  }

  async getOrderDetails(id: string): Promise<Order> {
    const order = await this.orderModel
      .findById(id)
      .populate('user', 'username');
    return order;
  }

  async createOrder(
    createOrderDTO: CreateOrderDTO,
    userId: string,
  ): Promise<Order> {
    const cart = await this.cartService.getCartById(createOrderDTO.cartId);
    delete createOrderDTO.cartId;
    const newOrder = await this.orderModel.create({
      ...createOrderDTO,
      user: userId,
      items: cart.items,
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
