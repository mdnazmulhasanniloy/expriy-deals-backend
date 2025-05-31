import { Router } from 'express';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';
import { authRoutes } from '../modules/auth/auth.route';
import { notificationRoutes } from '../modules/notification/notificaiton.route';
import { contentsRoutes } from '../modules/contents/contents.route';
import { paymentsRoutes } from '../modules/payments/payments.route';
import { categoryRoutes } from '../modules/category/category.route';
import { productsRoutes } from '../modules/products/products.route';
import { orderRoutes } from '../modules/order/order.route';
import { bankDetailsRoutes } from '../modules/bankDetails/bankDetails.route';
import { withdrawRequestRoutes } from '../modules/withdrawRequest/withdrawRequest.route';
import { shopRoutes } from '../modules/shop/shop.route';
import { addToCardRoutes } from '../modules/addToCard/addToCard.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
   
  {
    path: '/otp',
    route: otpRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/products',
    route: productsRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/payments',
    route: paymentsRoutes,
  },
  {
    path: '/contents',
    route: contentsRoutes,
  },
  {
    path: '/bank-details',
    route: bankDetailsRoutes,
  },
  {
    path: '/withdraw-request',
    route: withdrawRequestRoutes,
  },
  {
    path: '/shop',
    route: shopRoutes,
  },
  {
    path: '/add-to-card',
    route: addToCardRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
