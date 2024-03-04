const express = require('express');
const deliveryRouter = express.Router();
const db = require("../../db.js");


//예시
//쿼리형태로 받음
// 전체 배송 목록 출력 
deliveryRouter.get("/delivery", async (request,response)=>{
    let result = db.connection('delivery','deliveryList')
                   .then(result => {response.send(result)})
                   .catch(err=>{console.log(err)});
  })
  //운송장조회 
  deliveryRouter.get("")
  // https://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=04&t_invoice=1234567890&t_key=KtscB1fMYANFKsVeIAXEkQ
  //API -> 운송장 번호 / 택배사 입력 시 배송상태 출력. 적용 HOW?? 

  //운송장 번호 수정 
  deliveryRouter.put("/delivery/:dno", async (request, response) => {
    let data = [request.body.param, request.params.dno];
    let result = await db.connection('delivery','updateShipNo', data);
    response.send(result);
  });


  module.exports = deliveryRouter;