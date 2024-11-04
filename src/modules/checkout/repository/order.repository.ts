import Order from '../domain/order.entity';
import CheckoutGateway from '../gateway/checkout.gateway';
import { OrderModel } from './order.model';

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id.id,
      client: {
        id: order.client.id.id,
        name: order.client.name,
        email: order.client.email,
        address: order.client.address,
      },
      products: order.products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
      })),
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });
  }

  async findOrder(id: string): Promise<Order | null> {
    throw new Error('Method not implemented.');
  }
}
