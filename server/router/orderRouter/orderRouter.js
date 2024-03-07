const express = require('express');
const orderRouter = express.Router();
const db = require("../../db.js");


//주문 등록시
orderRouter.post("/orderList",async (request,response)=>{
  try {
    
    // 트랜지션 시작
    await db.excuteConnection("START TRANSACTION")
    
    // 주문내역 저장
    let data1 = request.body.OrderTable;
    let result1 = await db.connection('order','orderAdd',data1);
    console.log(result1,"11111111111111111111")
    
    //주문상세내역 저장
    let data2 = orderDetailNaming(request.body.paymentList.paymentLists, request.body.paymentList.ord_no);
    console.log(data2)
    for(let i of data2) {
      let result2 = await db.connection('order_detail','orderDetailAdd',i);
      console.log(result2,"2222222222222222222")
    }
    
    //주문한 리스트만 장바구니 삭제
    /*let data3 = cartNaming(request.body.cart_cds);
    for(let i of data3) {
      let result3 = await db.connection('cart','cartDel',i.cart_cd).then(res => console.log(res)).catch(err => console.log(err));
      console.log(result3)
    }
    
    //회원 포인트 수정
    let data4 = [memberSelect(request.body.userPoint), request.body.userPoint.mem_no];
    let result4 = await db.connection('user','userUpdate',data4).then(res => console.log(res)).catch(err => console.log(err));
    console.log(result4)
    
    // 회원 토탈사용금액 갱신
    let data5 = [request.body.OrderTable.total_payment, request.body.OrderTable.mem_no];
    let result5 = await db.connection('user','usedPaymentUpdate',data6).then(res => console.log(res)).catch(err => console.log(err));
    console.log(result5)
    
    //회원 등급 수정
    let data6 = [request.body.usergrade.used_payment, request.body.usergrade.mem_no];
    let result6 = await db.connection('user','userGradeUpdate',data5).then(res => console.log(res)).catch(err => console.log(err));
    console.log(result6)

    // //보유쿠폰 수정
    let data7 = [couponSelect(request.body.usercoupon), request.body.usercoupon.poss_no];
    let result7 = await db.connection('coupon','couponMod',data7).then(res => console.log(res)).catch(err => console.log(err));
    console.log(result7)*/
    
    //배송정보 등록(보류)
    // let data7 = request.body.userUpdates;
    // let result7 = await db.connection('order','orderAdd',data1);

    //트랜지션 커밋
    await db.excuteConnection("COMMIT")

    //결과 판단후 마지막 결과 반환
    return response.json(result1)
  } catch (err) {
    //트랜지션 롤백
    console.log(err)
    await db.excuteConnection("ROLLBACK")
    return response.status(500).json(err)
  }


})

//주문 상세목록 칼럼명 변경
function orderDetailNaming(list,ord) {
  let newArr = [];
  for(let i of list) {
      newArr.push( {
          ord_no : ord,
          detail_cnt : i.cart_qty,
          sum_price : i.total_price,
          price : i.sale_price,  
          dc_pct : i.dc_pct * 100,  
          prdt_cd : i.prdt_cd,  
          opt_cd : i.opt_cd
       } );
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