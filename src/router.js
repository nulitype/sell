import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

export default [
  {
    path: '/sell/goods',
    component: goods,
  },
  {
    path: '/sell/ratings',
    component: ratings,
  },
  {
    path: '/sell/seller',
    component: seller,
  },
  {
    path: '/sell',
    redirect: '/sell/goods',
  },
];
