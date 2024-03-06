const express = require('express');
const reviewRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
reviewRouter.get("/review", async (request,response)=>{ ///:pno
  //let data = request.query.pno
    let result = await db.connection('review','reviewList') //,data
    .then(result => {response.send(result)})
                   .catch(err=>{console.log(err)});
  });

//리뷰 단건조회
reviewRouter.get("/review/:rno", async (request, response) => {
  let data = request.params.rno;
  let result = (await db.connection('review','reviewInfo', data))[0];
  response.send(result);
});


//등록 : post => body
reviewRouter.post("/review", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection('review','reviewInsert', data);
  response.send(result);
});

//수정 : put => body
reviewRouter.put("/boards/:rno", async (request, response) => {
  let data = [request.body.param, request.params.rno];
  let result = await db.connection('board','boardUpdate', data);
  response.send(result);
});
  module.exports = reviewRouter;

