// userRouter.js

const express = require('express');
const userRouter = express.Router();
const db = require("../../db.js");


//회원 전체 조회
userRouter.post("/userList", async (request, response) => {
  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  // let getDate1 = request.body.param.getDate1;
  // let getDate2 = request.body.param.getDate2;
  // let checkDate = request.body.param.checkDate;
  let checkLv = parseInt(request.body.param.checkLv);

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
    if(checkLv){
      where += " AND grade_no = ? "
      data.push(checkLv);
    }
  


    // ORDER BY 절 추가
    where += " order by mem_no desc"
  
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
userRouter.post("/userCount", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  // let getDate1 = request.body.param.getDate1;
  // let getDate2 = request.body.param.getDate2;
  // let checkDate = request.body.param.checkDate;
  let checkLv = parseInt(request.body.param.checkLv);

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
  
    // 회원등급 조건 존재할 경우
    if(checkLv){
      where += " AND grade_no = ? "
      data.push(checkLv);
    }

  let result = await db.connection('user','userCount', data, where);
  response.send(result);
})



module.exports = userRouter;