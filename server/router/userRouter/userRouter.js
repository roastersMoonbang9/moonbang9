// userRouter.js

const express = require('express');
const userRouter = express.Router();
const db = require("../../db.js");
const nodemailer = require('nodemailer');

//회원 전체 조회(관리자)
userRouter.post("/userList", async (request, response) => {
  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;
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
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND join_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      } else if(checkDate == "2"){
        where += " AND unjoin_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }
  
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

// 이메일을 통해 아이디 찾기
userRouter.post("/forgotUsername", async (request, response) => {
  const userEmail = request.body.email; // 사용자가 입력한 이메일 주소

  try {
    // 이메일을 통해 사용자 정보를 데이터베이스에서 조회합니다.
    const userData = await db.findUserByEmail(userEmail);

    if (userData) {
      // 조회된 사용자 정보에서 아이디를 가져옵니다.
      const username = userData.username;

      // 이메일로 아이디를 발송하는 로직을 구현합니다.
      // (이 부분은 이미 작성된 sendUsernameByEmail 함수를 사용하거나 직접 작성해야 합니다.)

      response.status(200).json({ success: true, message: '이메일로 아이디를 발송했습니다.' });
    } else {
      // 해당 이메일로 가입된 사용자가 없는 경우
      response.status(404).json({ success: false, message: '가입된 사용자를 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('아이디 찾기 오류:', error);
    response.status(500).json({ success: false, message: '서버 오류로 인해 아이디를 찾을 수 없습니다.' });
  }
});

// 이메일을 통해 아이디 찾기
async function findUsernameByEmail(email) {
  // 이메일을 통해 사용자 정보를 데이터베이스에서 조회하는 로직을 구현해야 합니다.
  // 여기서는 가정적으로 사용자 정보를 가져오는 함수를 호출하는 것으로 대체합니다.
  const userData = await db.findUserByUsername(email); // 가입한 이메일과 일치하는 아이디를 가져옴
  return userData;
}

// 이메일로 아이디 발송
async function sendUsernameByEmail(email, username) {
  // SMTP 전송을 위한 transporter 생성
  let transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // 이메일 호스트
    port: 587, // 포트
    secure: false, // 보안 연결 사용 여부
    auth: {
      user: 'your_email@example.com', // 보내는 이메일 계정
      pass: 'your_password', // 계정 비밀번호
    },
  });

  // 발송할 이메일 내용
  let mailOptions = {
    from: 'your_email@example.com', // 발신자 이메일
    to: email, // 수신자 이메일
    subject: '아이디 찾기 결과', // 이메일 제목
    text: `귀하의 아이디는 ${username}입니다.`, // 이메일 내용
  };

  // 이메일 발송
  await transporter.sendMail(mailOptions);
}




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
userRouter.post("/userUpdate/:mem_no", async (request, response) => {
  let data = [request.body.param, request.params.mem_no]; // [객체, 단일값]
  let result = await db.connection('user', 'userUpdate', data);
  response.send(result);
});

// 회원 수 조회(관리자)
userRouter.post("/userCount", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;
  let getDate1 = request.body.param.getDate1;
  let getDate2 = request.body.param.getDate2;
  let checkDate = request.body.param.checkDate;
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
    if(getDate1 && getDate2){
      if(checkDate == "1"){
        where += " AND join_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      } else if(checkDate == "2"){
        where += " AND unjoin_dt BETWEEN ? AND ?"
        data.push(getDate1, getDate2);
      }
    }
  
    // 회원등급 조건 존재할 경우
    if(checkLv){
      where += " AND grd_no = ? "
      data.push(checkLv);
    }

  let result = await db.connection('user','userCount', data, where);
  response.send(result);
})


userRouter.get("/checkUser/:id", async (request, response) => {
  let data = request.params.id;
  let result = (await db.connection('user', 'checkUser', data))[0];
  console.log(result)
  response.send(result);
})


module.exports = userRouter;