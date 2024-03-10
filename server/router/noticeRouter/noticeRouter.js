const express = require('express');
const noticeRouter = express.Router();
const db = require("../../db.js");

// 전체조회
noticeRouter.get("/:offset/:limit", async (request,response)=>{
    let data = parseInt(request.params.limit);
    let data2 = parseInt(request.params.offset);
    let dataResult = [data, data2]
    let result = await db.connection('notice','noticeList', dataResult);
    response.send(result);
  })

// 등록
noticeRouter.post("/", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  let result = await db.connection('notice','noticeInsert', data);
  response.send(result);
});

// 총 갯수
noticeRouter.get("/", async (request,response)=>{
  let result = await db.connection('notice','noticeCount');
  response.send(result);
});

// 공지 삭제
noticeRouter.delete("/noticeDelete/:notice_no", async (request, response)=>{
  let data = parseInt(request.params.notice_no);
  let result2 = await db.connection('notice','noticeDeleteImage', data);
  console.log(result2);
  let result = await db.connection('notice','noticeDelete', data);
  response.send(result);
});

// 공지 단건조회
noticeRouter.get("/noticeInfo/:notice_no", async (request,response)=>{
  let data = parseInt(request.params.notice_no);
  console.log(data);
  let result = await db.connection('notice','noticeInfo', data);
  response.send(result);
});

// 공지 단건조회(이미지파일)
noticeRouter.get("/noitceInfoImage/:notice_no", async (request,response)=>{
  let data = parseInt(request.params.notice_no);
  let result = await db.connection('notice','noitceInfoImage', data);
  response.send(result);
});

module.exports = noticeRouter;
