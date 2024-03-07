import DeliveryView from '../views/admin/DeliveryView.vue'
import testView from '../views/admin/testjeonView.vue'
import EventView from '../views/admin/eventView.vue'
import adminView from '../views/admin/AdminMainViews.vue'
import orderListView from '../views/admin/OrderListView.vue'
import memberlistView from '../views/admin/MemberListView.vue'
import GradeView from '../views/admin/GradeList.vue'

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
            path: 'event',
            name: 'event',
            component: EventView

        },
        {
            path: 'grade',
            name: 'grade',
            component: GradeView

        }
    ]
}