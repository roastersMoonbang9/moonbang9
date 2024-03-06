const express = require('express');
const gradeRouter = express.Router();
const db = require("../../db.js");

//예시
//등급별 할인조회
gradeRouter.get("/grade/:no", async (request,response)=>{
    let no = request.params.no;
    let result = await db.connection('grade','getGrade',no);
    response.send(result);
  })

  module.exports = gradeRouter;