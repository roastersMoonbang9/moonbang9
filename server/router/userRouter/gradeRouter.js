const express = require('express');
const gradeRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음

//등급목록 출력
gradeRouter.get("/grade", async (request,response)=>{
    let result = await db.connection('grade','gradeList');
    response.send(result);
  })

  //등급적립률 수정
  gradeRouter.put("/grade/:gno", async (request, response) => {
    let data = [request.body.param, request.params.gno];
    let result = await db.connection('grade','gradeUpdate', data);
    response.send(result);
  });



  module.exports = gradeRouter;