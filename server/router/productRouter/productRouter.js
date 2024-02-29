const express = require('express');
const productRouter = express.Router();
const db = require("../../db.js");

//npm run nodemons

//예시
//쿼리형태로 받음

// 재활용 할지말지 생각중~~~!
// // 메인 페이지 - 인기상품 3개 목록
// productRouter.get("/mainPopular", async (request,response)=>{
//   let result = await db.connection('product','mainPopularProductList');
//   response.send(result);
// });

// // 메인 페이지 - 신상품 6개 목록
// productRouter.get("/mainNew", async (request,response)=>{
//   let result = await db.connection('product','mainNewProductList');
//   response.send(result);
// }); 


// 상품목록페이지 - 인기상품순 정렬 목록
productRouter.get("/popular/:large_code", async (request,response)=>{
  let data = request.params.large_code;
  let result = await db.connection('product','popularProductList', data);
  response.send(result);
});

// 상품목록페이지 - 신상품순/낮은가격순/높은가격순/할인율순 정렬 목록
productRouter.get("/general/:large_code", async (request,response)=>{
  let data = request.params.large_code;
  let result = await db.connection('product','generalProductList', data);
  response.send(result);
});


// 상품상세 페이지 - (이미지 제외) 상품정보
productRouter.get("/info/:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd;
  let result = await db.connection('product','productInfo', data)[0];
  response.send(result);
});

// 상품상세 페이지 - 나머지 이미지들
productRouter.get("/infoImages/:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd;
  let result = await db.connection('product','productInfoImages', data);
  response.send(result);
});

// 상품상세 페이지 - 상품의 옵션들 목록
productRouter.get("/infoOptions/:prdt_cd", async (request,response)=>{
  let data = request.params.prdt_cd;
  let result = await db.connection('product','productInfoOptions', data);
  response.send(result);
});







module.exports = productRouter;