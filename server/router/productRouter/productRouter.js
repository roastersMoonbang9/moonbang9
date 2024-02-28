const express = require('express');
const productRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
productRouter.get("/", async (request,response)=>{
    let result = await db.connection('product','boardList');
    response.send(result);
  })

  module.exports = productRouter;


  //깃 시험중~