// userRouter.js

const express = require('express');
const userRouter = express.Router();
const db = require("../../db.js");


//회원 전체 조회
userRouter.get("/userList", async (request, response) => {
  let result = await db.connection('user', 'userList');
  response.send(result);
})

// 회원 개별 조회
userRouter.get("/userInfo/:mem_no", async (request, response) => {
  let data = request.params.mem_no;
  let result = (await db.connection('user', 'userInfo', data))[0];
  response.send(result);
})

//회원 로그인 확인
userRouter.post("/userLogin", async (request, response) => {
  let data = [request.body.param.id, request.body.param.pwd];
  console.log(data)
  let result = (await db.connection('user', 'userLogin', data));
  response.send(result);
})

//회원 가입 : post => body
userRouter.post("/userJoin", async (request, response) => {
  let data = request.body.param;
  console.log(data);
  result = await db.connection('user', 'userJoin', data).then(rlt => {console.log(rlt)}).catch(err=>{console.log(err)});
  response.send(result);
});

//회원 정보 수정 : put => body를 요구
userRouter.put("/userUpdate/:mem_no", async (request, response) => {
  let data = [request.body.param, request.params.mem_no]; // [객체, 단일값]
  let result = await db.connection('user', 'userUpdate', data);
  response.send(result);
});
module.exports = userRouter;