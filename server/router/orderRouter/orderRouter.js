const express = require('express');
const orderRouter = express.Router();
const db = require("../../db.js");


//주문 등록시
orderRouter.post("/orderList",async (request,response)=>{
  let conn = null;
  let lastResult = [{ord_no : request.body.paymentList.ord_no}]
  try {
    //커넥션얻기
    conn = await db.getConnecttion();
    
    // 트랜지션 시작
    await db.excuteConnection(conn,"START TRANSACTION")

    // 주문내역 저장
    let data1 = request.body.OrderTable;
    let result1 = await db.trConnection(conn,'order','orderAdd',data1);
    lastResult.push(result1)
    console.log("result1 : ", result1)
    
    //주문상세내역 저장
    let result2s = [];
    let data2 = orderDetailNaming(request.body.paymentList.paymentLists, request.body.paymentList.ord_no);
    for(let i of data2) {
      let result2 = await db.trConnection(conn,'order_detail','orderDetailAdd',i);
      console.log("result2 : ",result2)
      result2s.push(result2)
    }
    lastResult.push(result2s)
    
    //주문한 리스트만 장바구니 삭제
    let result3s = [];
    let data3 = cartNaming(request.body.cartList.cart_cds);
    for(let i of data3) {
      let result3 = await db.trConnection(conn,'cart','cartDel',i.cart_cd);
      console.log("result3 : ",result3)
      result3s.push(result3)
    }
    lastResult.push(result3s)

    //회원 포인트 수정
    let data4 = [memberSelect(request.body.userPoint), request.body.userPoint.mem_no];
    let result4 = await db.trConnection(conn,'user','userUpdate',data4);
    console.log("result4 : ",result4)
    lastResult.push(result4)

    // 회원 토탈사용금액 갱신
    let data5 = [request.body.OrderTable.total_payment, request.body.OrderTable.mem_no];
    let result5 = await db.trConnection(conn,'user','usedPaymentUpdate',data5);
    console.log("result5 : ",result5)
    lastResult.push(result5)
    
    //회원 등급 수정
    let data6 = [request.body.usergrade.used_payment, request.body.usergrade.mem_no];
    let result6 = await db.trConnection(conn,'user','userGradeUpdate',data6);
    console.log("result6 : ",result6)
    lastResult.push(result6)

    // //보유쿠폰 수정
    let data7 = [couponSelect(request.body.usercoupon), request.body.usercoupon.poss_no];
    let result7 = await db.trConnection(conn,'coupon','couponMod',data7);
    console.log("result7 : ",result7)
    lastResult.push(result7)
    
    //배송정보 등록(보류)
    // let data7 = request.body.userUpdates;
    // let result7 = await db.trConnection(conn,'order','orderAdd',data1);

    //트랜지션 커밋
    await db.excuteConnection(conn,"COMMIT")

    //결과 판단후 마지막 결과 반환
    return response.json(lastResult)
  } catch (err) {
    //트랜지션 롤백
    console.log(err)
    await db.excuteConnection(conn,"ROLLBACK")
    return response.status(500).json(err)
  }finally{
    conn.release();
  }


})


// 주문 목록 출력(관리자)
orderRouter.post("/adOrderList", async (request, response) => {
  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;
  let checkSt = parseInt(request.body.param.checkSt);

  let data = [];
  let where = " WHERE 1=1";

    // 키워드(검색어) 있는 경우
    if(searched){
      if(checkSearch == "1"){
        where += " AND ord_no LIKE ? "
        data.push("%" + searched + "%");
      } else if(checkSearch == "2"){
        where += " AND name LIKE ? "
        data.push("%" + searched + "%");
      }
    }
  
    // 주문일자 있는 경우
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND ord_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }
  
    // 소분류(카테고리) 있는 경우
    if(checkSt){
      where += " AND status = ? "
      data.push(checkSt);
    }
  


    // ORDER BY 절 추가
    where += " order by ord_dt desc"
  
    // LIMIT / OFFSET 절 추가
    where += " LIMIT ?"
    data.push(limit);
  
    where += " OFFSET ?"
    data.push(offset);
    
    let result = await db.connection('order', 'adOrderList', data, where);
    response.send(result);
})

// 주문 수 조회(관리자)
orderRouter.post("/adOrderCount", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;
  let checkSt = parseInt(request.body.param.checkSt);

  let data = [];
  let where = " WHERE 1=1";

    // 키워드(검색어) 있는 경우
    if(searched){
      if(checkSearch == "1"){
        where += " AND ord_no LIKE ? "
        data.push("%" + searched + "%");
      } else if(checkSearch == "2"){
        where += " AND name LIKE ? "
        data.push("%" + searched + "%");
      }
    }
  
    // 주문일자 있는 경우
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND ord_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }
  
    // 소분류(카테고리) 있는 경우
    if(checkSt){
      where += " AND status = ? "
      data.push(checkSt);
    }

    let result = await db.connection('order','adOrderCount', data, where);
    response.send(result);
    
})

// 총 주문 금액 조회(관리자)
orderRouter.post("/adOrderTotalPayment", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;
  let checkSt = parseInt(request.body.param.checkSt);

  let data = [];
  let where = " WHERE 1=1";

    // 키워드(검색어) 있는 경우
    if(searched){
      if(checkSearch == "1"){
        where += " AND ord_no LIKE ? "
        data.push("%" + searched + "%");
      } else if(checkSearch == "2"){
        where += " AND name LIKE ? "
        data.push("%" + searched + "%");
      }
    }
  
    // 주문일자 있는 경우
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND ord_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }
  
    // 소분류(카테고리) 있는 경우
    if(checkSt){
      where += " AND status = ? "
      data.push(checkSt);
    }

    let result = await db.connection('order','adOrderTotalPayment', data, where);
    response.send(result);
    
})

// 주문 취소목록 출력(관리자)
orderRouter.post("/adCancleOrderList", async (request, response) => {
  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;

  let data = [];
  let where = " WHERE status = 5";

    // 키워드(검색어) 있는 경우
    if(searched){
      if(checkSearch == "1"){
        where += " AND ord_no LIKE ? "
        data.push("%" + searched + "%");
      } else if(checkSearch == "2"){
        where += " AND name LIKE ? "
        data.push("%" + searched + "%");
      }
    }
  
    // 주문일자 있는 경우
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND ord_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      } else if(checkDate == "2"){
        where += " AND cancel_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }
  
    // ORDER BY 절 추가
    where += " order by ord_no desc"
  
    // LIMIT / OFFSET 절 추가
    where += " LIMIT ?"
    data.push(limit);
  
    where += " OFFSET ?"
    data.push(offset);
    
    let result = await db.connection('order', 'adOrderList', data, where);
    response.send(result);
})

// 주문 수 조회(관리자)
orderRouter.post("/adCancleOrderCount", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;

  let data = [];
  let where = " WHERE status = 5";

    // 키워드(검색어) 있는 경우
    if(searched){
      if(checkSearch == "1"){
        where += " AND ord_no LIKE ? "
        data.push("%" + searched + "%");
      } else if(checkSearch == "2"){
        where += " AND name LIKE ? "
        data.push("%" + searched + "%");
      }
    }
  
    // 주문일자 있는 경우
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND ord_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      } else if(checkDate == "2"){
        where += " AND cancel_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }

    let result = await db.connection('order','adOrderCount', data, where);
    response.send(result);
    
})

// 총 주문 금액 조회(관리자)
orderRouter.post("/adCancleOrderTotalPayment", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;

  let data = [];
  let where = " WHERE status = 5";

    // 키워드(검색어) 있는 경우
    if(searched){
      if(checkSearch == "1"){
        where += " AND ord_no LIKE ? "
        data.push("%" + searched + "%");
      } else if(checkSearch == "2"){
        where += " AND name LIKE ? "
        data.push("%" + searched + "%");
      }
    }
  
    // 주문일자 있는 경우
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND ord_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      } else if(checkDate == "2"){
        where += " AND cancel_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }

    let result = await db.connection('order','adOrderTotalPayment', data, where);
    response.send(result);
})

// 주문내역 조회
orderRouter.get("/memOrderList/:cd", async (request,response)=>{
    let data = request.params.cd;
    let result = await db.connection('order','orderList', data);
    response.send(result);
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