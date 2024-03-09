const express = require('express');
const deliveryRouter = express.Router();
const db = require("../../db.js");


//예시
//쿼리형태로 받음
// 전체 배송 목록 출력 
deliveryRouter.post("/deliveryList", async (request,response)=>{
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
  // // 키워드(검색어) 있는 경우
  if(searched){
    if(checkSearch == "1"){
      where += " AND deli_no LIKE ? "
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
//배송상태 분류 있는 경우
if(checkSt){
  where += " AND d.status = ? "
  data.push(checkSt);
}

  // ORDER BY 절 추가
  where += " order by deli_no desc"

   // LIMIT / OFFSET 절 추가
   where += " LIMIT ?"
   data.push(limit);

   where += " OFFSET ?"
   data.push(offset);

    let result = await db.connection('delivery','deliveryList',data, where)
    //console.log('리절트:'+result);
    response.send(result);
  })
  //운송장조회 
  deliveryRouter.get("")
  // https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=04&t_invoice=1234567890&t_key=KtscB1fMYANFKsVeIAXEkQ
  //API -> 운송장 번호 / 택배사 입력 시 배송상태 출력. 적용 HOW?? 

  //운송장 번호 수정 
  deliveryRouter.put("/updateDelivery/:deli_no", async (request, response) => {
    let data = [request.body.param.status, request.params.deli_no];
    console.log('넘어가는 파라미터:'+request.body.param.status);
    let result = await db.connection('delivery','updateShipNo', data);
    response.send(result);
  });

  //배송 건 수
  deliveryRouter.post("/deliveryCount", async (request,response)=>{
    //let checkSearch = request.body.param.checkSearch;
    //let searched = request.body.param.searched;
    // let getDate1 = request.body.param.getDate1;
    // let getDate2 = request.body.param.getDate2;
    // let checkDate = request.body.param.checkDate;
    //let checkLv = parseInt(request.body.param.checkLv);
  
    let data = [];
    let where = " WHERE 1=1";
  
      // // 키워드(검색어) 있는 경우
      // if(searched){
      //   if(checkSearch == "1"){
      //     where += " AND id LIKE ? "
      //     data.push("%" + searched + "%");
      //   } else if(checkSearch == "2"){
      //     where += " AND name LIKE ? "
      //     data.push("%" + searched + "%");
      //   }
      // }
    
      // // 가입일자 / 탈퇴일자 있는 경우
      // // if(large_code){
      // //   where += " AND p.large_code = ? "
      // //   data.push(large_code);
      // // }
    
      // // 회원등급 조건 존재할 경우
      // if(checkLv){
      //   where += " AND grd_no = ? "
      //   data.push(checkLv);
      // }
  
    let result = await db.connection('delivery','deliveryCount', data, where);
    response.send(result);
  })


  module.exports = deliveryRouter;