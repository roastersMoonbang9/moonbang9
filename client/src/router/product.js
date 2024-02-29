import ProductList from '../views/ProductListView.vue';
import ProductInfo from '../views/ProductInfoView.vue';

export default [
      {
        path: '/product/list',
        name: 'productList',
        component: ProductList
      },
      {
        path: '/product/info',
        name: 'productInfo',
        component: ProductInfo
      }
    ];