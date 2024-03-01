import DeliveryView from '../views/admin/TestingDelivery.vue'
import ProductReview from '../views/admin/TestingDelivery.vue'
import testView from '../views/admin/testjeonView.vue'
import adminView from '../views/admin/AdminMainView.vue'

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
        }
    ]
}