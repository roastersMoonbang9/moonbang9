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

  module.exports = couponRouter;