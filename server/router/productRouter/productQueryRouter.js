const express = require('express');
const productQueryRouter = express.Router();
const db = require("../../db.js");

//예시
//상품문의 목록 출력 
productQueryRouter.get("/queryList:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd;
    let result = await db.connection('query','queryList' , data);
    response.send(result);
    console.log('result :'+result);
  })

  //상품문의 단건조회 
  productQueryRouter.get("/query/:qno", async (request, response) => {
    let data = request.params.qno;
    let result = (await db.connection('query','queryInfo', data))[0];
    response.send(result);
  });
 //등록 : post => body
 productQueryRouter.post("/addQuery", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection('query','queryInsert', data);
  response.send(result);
});

//수정 : put => body
productQueryRouter.put("/query/:qno", async (request, response) => {
  let data = [request.body.param, request.params.qno];
  let result = await db.connection('query','queryUpdate', data);
  response.send(result);
});
  //상품문의 삭제 
  productQueryRouter.delete("/query/:cd", async (request,response)=>{
    let cd = request.params.cd;
    let result = await db.connection('query','queryDel',cd);
    response.send(result);
  })

  module.exports = productQueryRouter;