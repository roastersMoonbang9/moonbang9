const express = require('express');
const queryRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
queryRouter.get("/query/:mem_no", async (request,response)=>{
    let mem_no = request.params.mem_no;
    
    response.send(result);
  })

  // 문의 목록 출력
queryRouter.post("/queryList", async (request, response) => {
  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let checkSearch = request.body.param.checkSearch; // 1번 일 경우 mem_no
  let searched = request.body.param.searched;
  let data = [];
  let where = " WHERE 1=1";

    // 회원번호로 검색
    if(searched){
      if(checkSearch == "1"){
        where += " AND mem_no = ? "
        data.push(searched);
      }
    }

    // ORDER BY 절 추가
    where += " order by qst_no desc"
  
    // LIMIT / OFFSET 절 추가
    where += " LIMIT ?"
    data.push(limit);
  
    where += " OFFSET ?"
    data.push(offset);

    let result = await db.connection('query','questionList', data, where).catch(err => console.log(err));

    // let newResult = []
    // for(let i of result){
    //   let result2 = await db.connection('review','checkReview', [i.ord_no, i.prdt_cd]).catch(err => console.log(err));
    //   let result3 = {...i,...result2[0]}
    //   newResult.push(result3)
    // }
    // console.log(newResult)
    
    response.send(result);
})


// 문의 목록 수 조회
queryRouter.post("/queryListCount", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;

  let data = [];
  let where = " WHERE 1=1";

    // 주문번호, 회원번호로 검색
    if(searched){
      if(checkSearch == "1"){
        where += " AND mem_no = ? "
        data.push(searched);
      }
    }

    let result = await db.connection('query','questionListCount', data, where).catch((err) => console.log(err));
    response.send(result);
    
})

  module.exports = queryRouter;