import HomeView from '../views/user/HomeView.vue'
import MainView from '../views/user/MainView.vue'
import ProductList from '../views/user/product/ProductListView.vue';
import ProductInfo from '../views/user/product/ProductInfoView.vue';
import CartView from '../views/user/product/CartView.vue'
import PaymentView from '../views/user/product/PaymentView.vue'
import CompletePaymentView from '../views/user/product/CompletePaymentView.vue'
import loginView from '../views/user/login/loginView.vue'
import userJoinView from '../views/user/login/userJoinView.vue'
import myPageView from '../views/user/login/myPageView.vue'
import ProductReview from '../views/user/product/productReview.vue'

export default {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '',
                name: 'main',
                component: MainView
            },
            {
                path: 'cart',
                name: 'cart',
                component: CartView
            },
            {
                path: 'payment',
                name: 'payment',
                component: PaymentView
            },
            {
                path: 'completePayment',
                name: 'completePayment',
                component: CompletePaymentView
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
                path: 'myPage',
                name: 'myPage',
                component: myPageView
            },
            {
                path: 'product',
                name: 'productList',
                component: ProductList
            },
            {
                path: 'productInfo',
                name: 'productInfo',
                component: ProductInfo
            },
            {
                path: 'productReview',
                name: 'productReview',
                component: ProductReview
            }
        ]
}
