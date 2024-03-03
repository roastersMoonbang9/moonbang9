const express = require('express');
const noticeRouter = express.Router();
const db = require("../../db.js");

// 전체조회
noticeRouter.get("/:offset/:limit", async (request,response)=>{
    let data = parseInt(request.params.limit);
    let data2 = parseInt(request.params.offset);
    let dataResult = [data, data2]
    let result = await db.connection('notice','noticeList', dataResult);
    response.send(result);
  })

// 등록
noticeRouter.post("/", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection('notice','noticeInsert', data);
  response.send(result);
});

// 총 갯수
noticeRouter.get("/", async (request,response)=>{
  let result = await db.connection('notice','noticeCount');
  response.send(result);
})
  module.exports = noticeRouter;
