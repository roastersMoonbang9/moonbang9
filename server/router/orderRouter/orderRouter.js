const express = require('express');
const orderRouter = express.Router();
const db = require("../../db.js");


//예시
//쿼리형태로 받음
orderRouter.get("/",async(request,response)=>{
    let data = request.query.bno;
    let result = await db.connection('order','commentList',data);
    response.send(result);
  })

  module.exports = orderRouter;