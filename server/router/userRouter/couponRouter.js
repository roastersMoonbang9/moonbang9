const express = require('express');
const couponRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
couponRouter.get("/coupon/:mem_no/:state", async (request,response)=>{
    let no = [request.params.mem_no, request.params.state];
    // let couponState = request.params.state;
    let result = await db.connection('coupon','possCouponList',no);
    response.send(result);
  })

  module.exports = couponRouter;