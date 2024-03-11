const express = require('express');
const couponRouter = express.Router();
const db = require("../../db.js");

//예시
//회원의 쿠폰리스트 가져오기
couponRouter.get("/coupon/:mem_no/:state", async (request,response)=>{
    let no = [request.params.mem_no, request.params.state];
    // let couponState = request.params.state;
    let result = await db.connection('coupon','possCouponList',no);
    response.send(result);
  })

// 쿠폰목록(관리자)
couponRouter.get("/couponList/:offset/:limit", async (request,response)=>{
  let data = parseInt(request.params.limit);
  let data2 = parseInt(request.params.offset);
  let dataResult = [data, data2]
  let result = await db.connection('coupon','couponList', dataResult);
  response.send(result);
})

// 쿠폰 총 갯수(관리자)
couponRouter.get("/coupon", async (request,response)=>{
  let result = await db.connection('coupon','couponCount');
  response.send(result);
});

// 쿠폰등록(관리자)
couponRouter.post("/couponInsert", async (request, response)=>{
  let data = request.body.param;
  let result = await db.connection('coupon','couponInsert', data);
  response.send(result);
});

// 쿠폰삭제(관리자)
couponRouter.delete("/couponDelete/:cpn_no", async (request, response)=>{
  let data = parseInt(request.params.cpn_no);
  let result = await db.connection('coupon','couponDelete', data).catch(err=>{console.log(err)});
  response.send(result);
});

// 쿠폰지급목록(관리자)
couponRouter.get("/giveCouponList/:offset/:limit", async (request,response)=>{
  let data = parseInt(request.params.limit);
  let data2 = parseInt(request.params.offset);
  let dataResult = [data, data2]
  let result = await db.connection('coupon','giveCouponList', dataResult);
  response.send(result);
})

// 쿠폰 지급 총 갯수(관리자)
couponRouter.get("/giveCoupon", async (request,response)=>{
  let result = await db.connection('coupon','giveCouponCount');
  response.send(result);
});

// 쿠폰 지급(관리자)
couponRouter.post("/possCouponInsert", async (request, response)=>{
  console.log(request.body.param);
  let cpnNo = request.body.param.cpn_no;
  let grd_no = request.body.param.grd_no;
  let endDt = request.body.param.end_dt;
  let status1 = request.body.param.status;
  let result1 = await db.connection('coupon','checkMemNo', grd_no);
  for(no of result1){
    let data = {
      cpn_no : cpnNo,
      mem_no : no.mem_no,
      end_dt : endDt,
      status : status1
    }
    let result = await db.connection('coupon','possCouponInsert', data).catch(err=>{console.log(err)});
    console.log(result);
  }
  response.send(result1);
});


  module.exports = couponRouter;