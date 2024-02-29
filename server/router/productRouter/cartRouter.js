const express = require('express');
const cartRouter = express.Router();
const db = require("../../db.js");
//async await
// 회원정보 기준 장바구니 리스트 목록
cartRouter.get("/cart/:mem_no", async (request,response)=>{
  let no = request.params.mem_no;
  let result = await db.connection('cart','cartList',no);
  response.send(result);
})

// 회원정보 기준 장바구니 리스트 삭제
cartRouter.delete("/cart/:cart_cd", async (request,response)=>{
  let cd = request.params.cart_cd;
  let result = await db.connection('cart','cartDel',cd);
  response.send(result);
})

// 회원정보 기준 장바구니 수량수정
cartRouter.put("/cart/:cart_cd", async (request,response)=>{
  let data = request.body.param;
  let data2 = request.params.cart_cd;
  let dataResult = [data, data2]
  console.log(data2)
  console.log(data)
  let result = await db.connection('cart','cartUpdate',dataResult).then(res =>{console.log(res)}).catch(err=>{console.log(err)});
  response.send(result);
})


  module.exports = cartRouter;