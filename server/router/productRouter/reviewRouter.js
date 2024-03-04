const express = require('express');
const reviewRouter = express.Router();
const db = require("../../db.js");
// 사진 업로드 용 라이브러리
const multer = require('multer');
//이미지 업로드 공간 
const imageUpload = 'uploads/';

//예시
//쿼리형태로 받음
reviewRouter.get("/review", async (request,response)=>{
    let result = await db.connection('review','reviewList');
    response.send(result);
  })

  module.exports = reviewRouter;
// 이미지 출력 용 

	//파일저장경로
const storage = multer.diskStorage({
	destination(req, res, cb){
		cb(null, imageUpload) //서버 저장 path 기재해야함/ cb함수 통해 전송된 파일 저장 디렉터리 설정
	},
    //저장되는 파일이름 형식 커스텀 가능
    // 오늘 날짜 + file 오리지널 이름 (중복 방지)
	filename(req, res, cb){  //db 콜백함수 통해 전송된 파일 이름 설정
		cb(null, `${Date.now()}_${res.originalname}`) //저장되는 시간으로 파일이름
	},
  filefilter(req, res, cb){
    const ext = path.extname(res.originalname);
    if(ext !== ".jpeg" || ".png" || ".jpg"){
      return cb(null,false);
    }
    cb(null,true);
  },
  limits : {fileSize: 20* 1024 * 1024},
});
const upload = multer({storage : storage});

reviewRouter.post("/img",upload.array("photos",4),async (req, res,next) => {
  console.log("파일이름:" ,req.files); //photos 이름의 멀티파일
  // let urlArr = new Array();
  // for( let i = 0; i < req.files.length; i++){
  //   urlArr.push(`img/${req.files[i].filename}`);
  //   console.log(urlArr[i]);
  // }
  // let jsonUrl = JSON.stringify(urlArr);
  // res.json(jsonUrl);
});

