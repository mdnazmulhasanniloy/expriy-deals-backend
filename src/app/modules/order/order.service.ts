import httpStatus from 'http-status';
import { IOrder } from './order.interface';
import Order from './order.models';
import AppError from '../../error/AppError';
import QueryBuilder from '../../class/builder/QueryBuilder';
import Products from '../products/products.models';
import { IProducts } from '../products/products.interface';

const createOrder = async (payload: IOrder) => {
  const product: IProducts | null = await Products.findById(payload?.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not found!');
  }

  payload.author = product?.author;
  payload.totalPrice =
    product?.price *
    (1 - Number(product?.discount ?? 0) / 100) *
    payload?.quantity;

  payload.discount = Number(product?.discount);
  const result = await Order.create(payload);
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create order');
  }
  return result;
};

const getAllOrder = async (query: Record<string, any>) => {
  const orderModel = new QueryBuilder(
    Order.find({ isDeleted: false }).populate([
      { path: 'product' },
      { path: 'author', select: 'name email phoneNumber profile' },
      { path: 'user', select: 'name email phoneNumber profile' },
    ]),
    query,
  )
    .search([''])
    .filter()
    .paginate()
    .sort()
    .fields();

  const data = await orderModel.modelQuery;
  const meta = await orderModel.countTotal();

  return {
    data,
    meta,
  };
};

const getOrderById = async (id: string) => {
  const result = await Order.findById(id).populate([
    { path: 'product' },
    { path: 'author', select: 'name email phoneNumber profile' },
  ]);
  if (!result || result?.isDeleted) {
    throw new Error('Order not found!');
  }
  return result;
};

const updateOrder = async (id: string, payload: Partial<IOrder>) => {
  const result = await Order.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new Error('Failed to update Order');
  }
  return result;
};

const deleteOrder = async (id: string) => {
  const result = await Order.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete order');
  }
  return result;
};

export const orderService = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
