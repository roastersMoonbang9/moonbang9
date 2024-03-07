require('dotenv').config({ path : './db/db.env'});
const express = require('express');
const app = express();
const port = 3000;

//라우팅방식 app 
const userRouter =require('./router/userRouter/userRouter.js');
const couponRouter =require('./router/userRouter/couponRouter.js');
const gradeRouter =require('./router/userRouter/gradeRouter.js');
const queryRouter =require('./router/userRouter/queryRouter.js');
const noticeRouter =require('./router/noticeRouter/noticeRouter.js');
const eventRouter =require('./router/noticeRouter/eventRouter.js');
const productRouter =require('./router/productRouter/productRouter.js');
const cartRouter =require('./router/productRouter/cartRouter.js');
const productQueryRouter =require('./router/productRouter/productQueryRouter.js');
const reviewRouter =require('./router/productRouter/reviewRouter.js');
const orderRouter =require('./router/orderRouter/orderRouter.js');
const orderDetailRouter =require('./router/orderRouter/orderDetailRouter.js');
const deliveryRouter =require('./router/orderRouter/deliveryRouter.js');
const returnRouter =require('./router/orderRouter/returnRouter.js');
const fileUploadRouter =require('./router/commonRouter/uploadRouter.js');


app.use(express.json());
app.use(express.json()).use(express.urlencoded({extended : false}));

//라우팅 분할해서 작성
app.use('/user',userRouter);
app.use('/user',couponRouter);
app.use('/user',gradeRouter);
app.use('/user',queryRouter);
app.use('/notice',noticeRouter);
app.use('/notice',eventRouter);
app.use('/product',productRouter);
app.use('/product',cartRouter);
app.use('/product',productQueryRouter);
app.use('/product',reviewRouter);
app.use('/order',orderRouter);
app.use('/order',orderDetailRouter);
app.use('/order',deliveryRouter);
app.use('/order',returnRouter);
app.use('/upload',fileUploadRouter);

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`)
})