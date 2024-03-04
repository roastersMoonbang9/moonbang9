import DeliveryView from '../views/admin/DeliveryView.vue'
import testView from '../views/admin/testjeonView.vue'
import EventView from '../views/admin/eventView.vue'
import adminView from '../views/admin/AdminMainViews.vue'

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
            path: 'event',
            name: 'event',
            component: EventView
        }
    ]
}