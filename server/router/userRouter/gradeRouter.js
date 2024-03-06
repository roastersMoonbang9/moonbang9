const express = require('express');
const gradeRouter = express.Router();
const db = require("../../db.js");

//예시
//회원별 등급조회
gradeRouter.get("/grade/:no", async (request,response)=>{
    let no = request.params.no;
    let result = await db.connection('grade','getGrade',no);
      response.send(result);
})
//쿼리형태로 받음

//등급목록 출력
gradeRouter.get("/grade", async (request,response)=>{
    let result = await db.connection('grade','gradeList');
    response.send(result);
  })

  module.exports = gradeRouter;