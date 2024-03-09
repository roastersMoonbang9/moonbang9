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
  gradeRouter.put("/grade/:grd_no", async (request, response) => {
    let data = [request.body.param, request.params.grd_no];
    //console.log('받아오는 파라미터:'+request.body.param);
    //console.log('받아오는 grd_no: '+ request.body.params);
    let result = await db.connection('grade','gradeUpdate', data);
    response.send(result);
  });


  module.exports = gradeRouter;