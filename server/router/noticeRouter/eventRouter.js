const express = require('express');
const eventRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
// eventRouter.get("/event", async (request,response)=>{
//     let result = await db.connection('notice','boardList');
//     response.send(result);
//   })

  eventRouter.get("/event/:offset/:limit", async (request,response)=>{
    let data = parseInt(request.params.limit);
    let data2 = parseInt(request.params.offset);
    let dataResult = [data, data2]
    let result = await db.connection('event','eventList', dataResult);
    response.send(result);
  })

  eventRouter.get("/event", async (request,response)=>{
    let result = await db.connection('event','eventCount');
    response.send(result);
  })
  module.exports = eventRouter;