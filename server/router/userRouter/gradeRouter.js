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

  //적립률 수정
  gradeRouter.put("/grade/:gno", async (request, response) => {
    let data = [request.body.param, request.params.gno];
    let result = await db.connection('grade','gradeUpdate', data);
    response.send(result);
  });
  
  // 회원 등급 및 포인트 조회
  gradeRouter.get("/gradePoint/:mno", async (request, response) => {
    let mno = request.params.mno;
    let result = await db.connection('grade','gradePoint', mno);
    response.send(result);
  });

  module.exports = gradeRouter;