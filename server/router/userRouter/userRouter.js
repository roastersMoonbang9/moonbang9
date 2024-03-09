// userRouter.js

const express = require('express');
const userRouter = express.Router();
const db = require("../../db.js");


//회원 전체 조회(관리자)
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
      where += " AND grd_no = ? "
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
  result = await db.connection('user', 'userJoin', data).catch(err=>{console.log(err)});
  response.send(result);
});

//회원탈퇴 userQuit
userRouter.put("/userQuit/:mem_no", async (request, response) => {
  let mem_no = request.params.mem_no;
  result = await db.connection('user', 'userQuit', mem_no).catch(err=>{console.log(err)});
  response.send(result);
});


// 카카오 아이디 체크 및 회원 가입
userRouter.post("/checkKakao", async (request, response) => {
  console.log(request.body,'=====================================')
  let kakao_id = request.body.id;
  console.log(kakao_id)
  // 데이터베이스에서 카카오 아이디 확인
  const userExists = await db.connection('user', 'checkKakaoId', [kakao_id]);
  
  if (userExists.length > 0) {
    // 이미 등록된 카카오 아이디인 경우
    const result = await db.connection('user', 'checkKakaoId', [kakao_id]);

    response.send(result);
  } else {
    // 회원가입이 되지 않았을 경우
    // 회원가입 처리
    const result2 = await db.connection('user', 'userJoin', [request.body]);
    console.log(result2)
    //가입한 카카오톡 회원조회
    const result3 = await db.connection('user', 'checkKakaoId', [kakao_id]);
    response.send(result3);
  }
});

/*
// 카카오 아이디로 회원 가입
userRouter.post("/registerWithKakaoAccount", async (request, response) => {
  let userData = request.body.param;

  // 데이터베이스에 회원 정보 추가
  const result = await db.connection('user', 'userJoin', userData);

  // 회원 가입 결과 전송
  response.send(result);
});

// 카카오 아이디로 로그인
userRouter.post("/loginWithKakaoId", async (request, response) => {
  let kakao_id = request.body.id;

  // 카카오 아이디로 로그인 처리
  const result = await db.connection('user', 'loginWithKakaoId', [kakao_id]);

  // 로그인 결과 전송
  response.send(result);
});
*/


//회원 정보 수정 : put => body를 요구
userRouter.put("/userUpdate/:mem_no", async (request, response) => {
  let data = [request.body.param, request.params.mem_no]; // [객체, 단일값]
  let result = await db.connection('user', 'userUpdate', data);
  response.send(result);
});

// 회원 수 조회(관리자)
userRouter.post("/userCount", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  // let getDate1 = request.body.param.getDate1;
  // let getDate2 = request.body.param.getDate2;
  // let checkDate = request.body.param.checkDate;
  let checkLv = parseInt(request.body.param.checkLv);

  let data = [];
  let where = " WHERE 1=1";

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
      where += " AND grd_no = ? "
      data.push(checkLv);
    }

  let result = await db.connection('user','userCount', data, where);
  response.send(result);
})



module.exports = userRouter;