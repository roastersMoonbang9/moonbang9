const express = require('express');
const eventRouter = express.Router();
const db = require("../../db.js");

 //이벤트 배너 전체조회 
eventRouter.get("/event/:offset/:limit", async (request,response)=>{
  let data = parseInt(request.params.limit);
    let data2 = parseInt(request.params.offset);
    let dataResult = [data, data2]
    let result = await db.connection('event','eventList', dataResult)
    response.send(result);
})

//이벤트 배너 활성화 
eventRouter.put("/event/:eno", async (request, response) => {
  let data = [request.body.param, request.params.eno];
  let result = await db.connection('event','updateEvent', data);
  response.send(result);
});
//이벤트 삭제 


// 총 갯수
eventRouter.get("/event", async (request,response)=>{
  let result = await db.connection('event','eventCount');
  response.send(result);
})


  eventRouter.get("/event", async (request,response)=>{
    let result = await db.connection('event','eventCount');
    response.send(result);
  })
  module.exports = eventRouter;