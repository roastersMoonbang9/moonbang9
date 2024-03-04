import DeliveryView from '../views/admin/TestingDelivery.vue'
import ProductReview from '../views/admin/TestingDelivery.vue'
import testView from '../views/admin/testjeonView.vue'
import adminView from '../views/admin/AdminMainViews.vue'
import orderListView from '../views/admin/OrderListView.vue'
import memberlistView from '../views/admin/MemberListView.vue'
import testlistView from '../views/admin/TestViewss.vue'

export default {
    path: '/admin',
    name: 'admin',
    component: adminView,
    children: [
        {
            path: 'delivery',
            name: 'delivery',
            component: DeliveryView
        },
        {
            path: 'review',
            name: 'review',
            component: ProductReview
        },
        {
            path: 'notice',
            name: 'notice',
            component: testView
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
            path: 'testlist',
            name: 'testlist',
            component: testlistView
        }
    ]
}