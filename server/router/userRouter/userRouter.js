// userRouter.js

const express = require('express');
const userRouter = express.Router();
const db = require("../../db.js");


//회원 전체 조회
userRouter.get("/userList/:offset/:limit", async (request, response) => {
  let limit = parseInt(request.params.limit);
  let offset = parseInt(request.params.offset);
  let checkSearch = request.params.checkSearch;
  let searched = request.params.searched
  // let getDate1 = request.params.getDate1
  // let getDate2 = request.params.getDate2
  let checkDate = request.params.checkDate
  let checkLv = request.params.checkLv

  let data = [];
  let where = " WHERE 1=1";
  // var queryData = url.parse(request.url, true).query;
  // let large_code = queryData.large_code;

    // 키워드(검색어) 있는 경우
    if(searched){
      if(checkSearch == "1"){
        where += " AND id LIKE ? "
        data.push("%" + searched + "%");
      } else if(checkSearch == "2"){
        where += " AND name LIKE ? "
        data.push("%" + searched + "%");
      }
    }
  
    // 가입일자 / 탈퇴일자 있는 경우
    // if(large_code){
    //   where += " AND p.large_code = ? "
    //   data.push(large_code);
    // }
  
    // 소분류(카테고리) 있는 경우
    if(grade_no){
      where += " AND grade_no = ? "
      data.push(grade_no);
    }
  


    // ORDER BY 절 추가
    where += "order by mem_no desc"
  
    // LIMIT / OFFSET 절 추가
    where += " LIMIT ?"
    data.push(limit);
  
    where += " OFFSET ?"
    data.push(offset);
    
  
  let result = await db.connection('user', 'userList', data, where);
  response.send(result);
})

// 회원 개별 조회
userRouter.get("/userInfo/:mem_no", async (request, response) => {
  let data = request.params.mem_no;
  let result = (await db.connection('user', 'userInfo', data))[0];
  console.log(result)
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

// 회원 수 조회
userRouter.get("/userCount", async (request,response)=>{
  let result = await db.connection('user','userCount');
  response.send(result);
})



module.exports = userRouter;