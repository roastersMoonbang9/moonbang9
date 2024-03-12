const express = require('express');
const productQueryRouter = express.Router();
const db = require("../../db.js");

//예시
//상품문의 목록 출력 
productQueryRouter.post("/queryList", async (request,response)=>{
  let limit = parseInt(request.body.param.limit);
  let offset = parseInt(request.body.param.offset);
  let prdt_cd = request.body.param.prdt_cd;
  let data = [];
data.push(prdt_cd);
let where = " LIMIT ?"
data.push(limit);
where += " OFFSET ?"
data.push(offset);
  console.log('리스트'+data);
    let result = await db.connection('product_query','queryList' , data,where)
    .catch(err=>{console.log(err)})
    response.send(result);
    console.log('result :'+result);
  });

  //상품별 아닌 전체 문의 출력
  productQueryRouter.post("/querylistAll", async (request,response)=>{
    let limit = parseInt(request.body.param.limit);
    let offset = parseInt(request.body.param.offset);
     let getDate1 = request.body.param.getDate1;
     let getDate2 = request.body.param.getDate2;
     let checkDate = request.body.param.checkDate;
    let checkSt = parseInt(request.body.param.checkSt);
  
    let data = [];
    let where = " WHERE 1=1";

  // 문의일자 있는 경우
  if(getDate1 && getDate2){
    if(checkDate == "1"){
      where += " AND qst_dt BETWEEN ? AND ?"
      data.push(getDate1, getDate2);
    }
  }
  //답변상태 분류 있는 경우
  if(checkSt){
    where += " AND status = ? "
    data.push(checkSt);
  }
  
    // ORDER BY 절 추가
    where += " order by qst_no desc"
  
     // LIMIT / OFFSET 절 추가
     where += " LIMIT ?"
     data.push(limit);
  
     where += " OFFSET ?"
     data.push(offset);
  
      let result = await db.connection('product_query','queryListAll',data, where)
      //console.log('리절트:'+result);
      response.send(result);
    });


  //상품문의 단건조회 
  productQueryRouter.get("/query/:qno", async (request, response) => {
    let data = request.params.qno;
    let result = (await db.connection('product_query','queryInfo', data))[0];
    response.send(result);
  });
 //등록  : post => body
 productQueryRouter.post("/addQuery", async (request, response)=>{
  let data = request.body.param; // { param : { .. } }
  console.log('문의등록:'+request.body.param);
  let result = await db.connection('product_query','queryInsert', data).catch(err=>{
    console.log(err)
  });
  response.send(result);
});

//수정 (답변 등록) : put => body
productQueryRouter.put("/queryAns", async (request, response) => {
  console.log('넘어오는:',request.body.param)

  let qst_no = request.body.param.qst_no;
  console.log('문의호:',qst_no)
  let status = request.body.param.status;
  let answer = request.body.param.answer;
  let datas = { status, answer};
  let data = [datas, qst_no];
  let result = await db.connection('product_query','queryUpdate', data).catch(err=>{console.log(err)});
  response.send(result);
});
  //상품문의 삭제 
  productQueryRouter.delete("/queryDel/:qst_no", async (request,response)=>{
    let cd = request.params.qst_no;
    console.log('상품삭제:'+cd);
    let result = await db.connection('product_query','queryDel',cd);
    response.send(result);
  });

  productQueryRouter.get("/queryCount", async (request,response)=>{
    let result = await db.connection('product_query','queryCount');
    response.send(result);
  })

  module.exports = productQueryRouter;