const express = require('express');
const noticeRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
noticeRouter.get("/:offset", async (request,response)=>{
    let data = parseInt(request.params.offset);
    let result = await db.connection('notice','noticeList', data);
    response.send(result);
  })

//등록 : post => body
noticeRouter.post("/", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection('notice','noticeInsert', data);
  response.send(result);
});


noticeRouter.get("/noticeCount", async (request,response)=>{
  let result = await db.connection('notice','noticeCount');
  response.send(result);
})
  module.exports = noticeRouter;
