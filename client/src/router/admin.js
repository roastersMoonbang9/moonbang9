import DeliveryView from '../views/admin/DeliveryView.vue'
import noticeView from '../views/admin/noticeView.vue'
import EventView from '../views/admin/eventView.vue'
import adminView from '../views/admin/AdminMainViews.vue'
import orderListView from '../views/admin/OrderListView.vue'
import memberlistView from '../views/admin/MemberListView.vue'
import GradeView from '../views/admin/GradeList.vue'
import cancelOrderListView from '../views/admin/CancelOrderListView.vue'
import adminProductView from '../views/admin/AdminProductView.vue'
import CouponView from '../views/admin/CouponView.vue'
import PossCouponView from '../views/admin/PossCouponView.vue'
import ProductAddView from '../views/admin/ProductAddView.vue'
import store from '../store/index.js'
import ProductQueryAdminView from '@/views/admin/ProductQueryAdminView.vue'

export default {
    path: '/admin',
    name: 'admin',
    component: adminView,
    // beforeEnter: (to, from, next) => {
    //     let mem_status = store.state.userStore.mem_status;
    //     let isLogin =  store.state.userStore.isLogin;

    //     if(mem_status != '1' || !isLogin ){
    //       alert('관리자만 접근 가능한 페이지입니다.'),
    //       next('/');
    //     }
    //     else {
    //       next();
    //     }
    //   },
    children: [
        {
            path: 'delivery',
            name: 'delivery',
            component: DeliveryView
        },
        {
            path: 'notice',
            name: 'notice',
            component: noticeView
        },
        {

            path: 'orderlist',
            name: 'orderlist',
            component: orderListView
        },
        {
            path: 'memberlist',
            name: 'memberlist',
            component: memberlistView
        },
        {
            path: 'event',
            name: 'event',
            component: EventView

        },
        {
            path: 'grade',
            name: 'grade',
            component: GradeView

        },
        {
            path: 'coupon',
            name: 'coupon',
            component: CouponView
        },
        {
            path: 'cancelOrderList',
            name: 'cancelOrderList',
            component: cancelOrderListView
        },
        {
            path: 'adminProduct',
            name: 'adminProduct',
            component: adminProductView
        },
        {
            path: 'possCoupon',
            name: 'possCoupon',
            component: PossCouponView
        },
        {
            path: 'productAdd',
            name: 'productAdd',
            component: ProductAddView
        },
        {
            path: 'productQuery',
            name: 'productQuery',
            component: ProductQueryAdminView
        }
        
    ]
}