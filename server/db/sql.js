const user = require('./user/user.js');
const coupon = require('./user/coupon.js');
const grade = require('./user/grade.js');
const query = require('./user/query.js');
const notice = require('./notice/notice.js');
const event = require('./notice/event.js');
const product = require('./product/product.js');
const cart = require('./product/cart.js');
const product_query = require('./product/product_query.js');
const review = require('./product/review.js');
const order = require('./order/order.js');
const delivery = require('./order/delivery.js');
const order_detail = require('./order/order_detail.js');
const returns = require('./order/returns.js');
const file = require('./common/common.js');


module.exports = {
        user,
        coupon,
        grade,
        query,
        event,
        cart,
        notice,
        product,
        order,
        product_query,
        review,
        delivery,
        order_detail,
        returns,
        file
}