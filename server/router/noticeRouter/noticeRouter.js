const express = require('express');
const noticeRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
noticeRouter.get("/", async (request,response)=>{
    let data = [request.params.start, request.params.cnt];
    let result = await db.connection('notice','noticeList', data);
    response.send(result);
  })

  module.exports = noticeRouter;