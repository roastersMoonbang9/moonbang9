import DeliveryView from '../views/admin/DeliveryView.vue'
import testView from '../views/admin/testjeonView.vue'
import EventView from '../views/admin/eventView.vue'
import adminView from '../views/admin/AdminMainViews.vue'
import orderListView from '../views/admin/OrderListView.vue'
import memberlistView from '../views/admin/MemberListView.vue'
import GradeView from '../views/admin/GradeList.vue'
import cancleOrderListView from '../views/admin/CancleOrderListView.vue'
import store from '../store/index.js'

export default {
    path: '/admin',
    name: 'admin',
    component: adminView,
    // beforeEnter: (to, from, next) => {
    //     // let member_type = store.state.memberStore.memberInfo.member_type;
    //     // let loginStatus =  store.state.memberStore.loginStatus;
    //     // console.log(member_type, ', ', loginStatus);

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

        },
        {
            path: 'cancleOrderList',
            name: 'cancleOrderList',
            component: cancleOrderListView
        }
    ]
}