const express = require('express');
const orderRouter = express.Router();
const db = require("../../db.js");


//주문 등록시
orderRouter.post("/orderList",async (request,response)=>{
  // try {
    
    // await conn.beginTransaction() // 트랜지션 시작
    // 주문내역 저장
    let data1 = request.body.OrderTable;
    let result = await db.connection('order','orderAdd',data1).then(res => console.log(res)).catch(err => console.log(err));
    
    //주문상세내역 저장
    // let data2 = request.body.paymentList;
    // let result2 = await db.connection('order','orderAdd',data1);
    
    // //배송정보 등록
    // let data6 = request.body.userUpdates;
    // let result6 = await db.connection('order','orderAdd',data1);
    
    // //주문한 리스트만 장바구니 삭제
    // let data3 = request.body.userUpdates;
    // let result3 = await db.connection('order','orderAdd',data1);
    
    // //회원 포인트/등급 수정
    // let data4 = request.body.userUpdates;
    // let result4 = await db.connection('order','orderAdd',data1);
    
    // //보유쿠폰 수정
    // let data5 = request.body.userUpdates;
    // let result5 = await db.connection('order','orderAdd',data1);
  //   await conn.commit()
  //   return response.json(result)

  // } catch (err) {
  //   await conn.rollback() //롤백
  //   return response.status(500).json(err)
  // }



    response.send(result);
})

module.exports = orderRouter;