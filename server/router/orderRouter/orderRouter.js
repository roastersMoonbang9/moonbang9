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
    let data2 = orderDetailNaming(request.body.paymentList);
    for(let i of data2) {
      let result2 = await db.connection('order_detail','orderDetailAdd',i);
      console.log(result2)
    }
    // //배송정보 등록(보류)
    // let data7 = request.body.userUpdates;
    // let result7 = await db.connection('order','orderAdd',data1);
    
    // //주문한 리스트만 장바구니 삭제
    let data3 = cartNaming(request.body.cart_cds);
    for(let i of data3) {
      let result3 = await db.connection('cart','cartDel',i.cart_cd);
      console.log(result3)
    }

    // //회원 포인트 수정
    let data4 = [memberSelect(request.body.userPoint), request.body.userPoint.mem_no];
    let result4 = await db.connection('user','userUpdate',data4);
    console.log(result4)
    
    // //회원 등급 수정
    let data5 = [memberSelect(request.body.usergrade), request.body.usergrade.mem_no];
    let result5 = await db.connection('grade','gradeUpdate',data5);
    console.log(result5)
    
    // //보유쿠폰 수정
    let data6 = [couponSelect(request.body.usercoupon), request.body.usercoupon.poss_no];
    let result6 = await db.connection('coupon','couponMod',data6);
    console.log(result6)
    
    // return response.json(result)
    // await conn.commit()
  // } catch (err) {
  //   await conn.rollback() //롤백
  //   return response.status(500).json(err)
  // }


    //결과 판단후 결과 갯수 반환
    response.send(result);
})

//주문 상세목록 칼럼명 변경
function orderDetailNaming(list) {
  let newArr = [];
  for(let i of list) {
      newArr.push( {
          ord_no: i.ord_no,
          detail_cnt: i.paymentLists.cart_qty,
          sum_price: i.paymentLists.total_price,
          price: i.paymentLists.sale_price,  
          dc_pct: i.paymentLists.dc_pct * 100,  
          prdt_cd: i.paymentLists.prdt_cd,  
          opt_cd: i.paymentLists.opt_cd
      }  );
  }
  return newArr;
};

//주문 상세목록 칼럼명 변경
function cartNaming(list) {
  let newArr = [];
  for(let i of list) {
      newArr.push( {
          cart_cd: i.cart_cd,
      }  );
  }
  return newArr;
};

// 회원정보 mem_no 제외한 데이터 조회
function memberSelect(obj){
  const {mem_no, ...newObj } = obj
  return newObj;
}

// 쿠폰정보 poss_no 제외한 데이터 조회
function couponSelect(obj){
  const {poss_no, ...newObj } = obj
  return newObj;
}

module.exports = orderRouter;