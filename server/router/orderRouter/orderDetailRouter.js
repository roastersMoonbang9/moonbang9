const express = require('express');
const orderDetailRouter = express.Router();
const db = require("../../db.js");

//예시
//쿼리형태로 받음
orderDetailRouter.get("/orderDetail", async (request,response)=>{
    let result = await db.connection('notice','boardList');
    response.send(result);
  })

// 주문 상세 목록 출력(유저)
orderDetailRouter.post("/usOrderDetailList", async (request, response) => {
  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let checkSearch = request.body.param.checkSearch; // 1번 일 경우 ord_no
  let searched = request.body.param.searched;
  console.log('limit :' + limit + ', offset : ' + offset + ', searched : ' + searched )
  let data = [];
  let where = " WHERE 1=1";

    // 주문번호, 회원번호로 검색
    if(searched){
      if(checkSearch == "1"){
        where += " AND d.ord_no = ? "
        data.push(searched);
      }
    }

    // ORDER BY 절 추가
    where += " order by ord_dt desc"
  
    // LIMIT / OFFSET 절 추가
    where += " LIMIT ?"
    data.push(limit);
  
    where += " OFFSET ?"
    data.push(offset);
    
    let result = await db.connection('order_detail', 'usOrderDetailList', data, where).catch(err => console.log(err));
    let newResult = []
    for(let i of result){
      let result2 = await db.connection('review','checkReview', [i.ord_no, i.prdt_cd]).catch(err => console.log(err));
      let result3 = {...i,...result2[0]}
      newResult.push(result3)
    }
    console.log(newResult)
    
    response.send(newResult);
})


// 상세주문 수 조회(유저)
orderDetailRouter.post("/usOrderDetailCount", async (request,response)=>{
  let checkSearch = request.body.param.checkSearch;
  let searched = request.body.param.searched;

  let data = [];
  let where = " WHERE 1=1";

    // 주문번호, 회원번호로 검색
    if(searched){
      if(checkSearch == "1"){
        where += " AND d.ord_no = ? "
        data.push(searched);
      }
    }

    let result = await db.connection('order_detail','usOrderDetailCount', data, where).catch((err) => console.log(err));
    response.send(result);
    
})

  module.exports = orderDetailRouter;