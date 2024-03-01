import HomeView from '../views/user/HomeView.vue'
import ProductList from '../views/user/product/ProductListView.vue';
import ProductInfo from '../views/user/product/ProductInfoView.vue';
import CartView from '../views/user/product/CartView.vue'
import loginView from '../views/user/login/loginView.vue'
import userJoinView from '../views/user/login/userJoinView.vue'

export default {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: 'about',
                name: 'about',
                component: () => import(/* webpackChunkName: "about" */ '../views/user/AboutView.vue')
            },
            {
                path: 'cart',
                name: 'cart',
                component: CartView
            },
            {
                path: 'login',
                name: 'login',
                component: loginView
            },
            {
                path: 'userJoin',
                name: 'userJoin',
                component: userJoinView
            },
            {
                path: 'product/list',
                name: 'productList',
                component: ProductList
            },
            {
                path: 'product/info',
                name: 'productInfo',
                component: ProductInfo
            }
        ]
}
