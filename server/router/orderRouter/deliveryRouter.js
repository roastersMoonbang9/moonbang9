const express = require('express');
const deliveryRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
deliveryRouter.get("/delivery", async (request,response)=>{
    let result = await db.connection('notice','boardList');
    response.send(result);
  })

  module.exports = deliveryRouter;