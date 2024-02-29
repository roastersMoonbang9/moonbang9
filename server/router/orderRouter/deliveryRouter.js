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

  //운송장 번호 수정 
  deliveryRouter.put("/delivery/:dno", async (request, response) => {
    let data = [request.body.param, request.params.dno];
    let result = await db.connection('delivery','updateShipNo', data);
    response.send(result);
  });


  module.exports = deliveryRouter;