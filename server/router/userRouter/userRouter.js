const express = require('express');
const userRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
userRouter.get("/", async (request,response)=>{
    let result = await db.connection('user','boardList');
    response.send(result);
  })

  module.exports = userRouter;