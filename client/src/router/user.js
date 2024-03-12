import HomeView from '../views/user/HomeView.vue'
import MainView from '../views/user/MainView.vue'
import ProductList from '../views/user/product/ProductListView.vue';
import ProductInfo from '../views/user/product/ProductInfoView.vue';
import CartView from '../views/user/product/CartView.vue'
import PaymentView from '../views/user/product/PaymentView.vue'
import CompletePaymentView from '../views/user/product/CompletePaymentView.vue'
import loginView from '../views/user/login/loginView.vue'
import userJoinView from '../views/user/login/userJoinView.vue'
// import ProductReview from '../views/user/product/productReview.vue'
import Mypage from '../views/user/mypage/mypageMainView.vue'
import myOrders from '../views/user/mypage/myOrdersView.vue'
import myOrdersDetail from '../views/user/mypage/myOrdersDetailView.vue'
import myOrdersEditProfile from '../views/user/mypage/myOrdersEditProfileView.vue'
import myOrdersInquiry from '../views/user/mypage/myOrdersInquiryView.vue'
import noticeView from '../views/user/noticeView.vue'
import myCouponList from '../views/user/mypage/myCouponListView.vue'



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
                path: 'notice',
                name: 'notice',
                component: noticeView
            },
            {
                path: 'mypage/',
                name: 'mypage',
                component: Mypage,
                children: [
                    {
                        path: 'editProfile', // 정보수정
                        name: 'myOrdersEditProfile',
                        component: myOrdersEditProfile
                    },
                    {
                        path: 'inquiry', //1:1 문의
                        name: 'myOrdersInquiry',
                        component: myOrdersInquiry
                    },
                    {
                        path: 'myOrders', //주문내역
                        name: 'myOrders',
                        component: myOrders
                    },
                    {
                        path: 'myOrdersDetail', //주문내역 상세
                        name: 'myOrdersDetail',
                        component: myOrdersDetail
                    },
                    {
                        path: 'myCouponList', //주문내역 상세
                        name: 'myCouponList',
                        component: myCouponList
                    }
                ]
            }
        ]
}
