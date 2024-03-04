const express = require('express');
const reviewRouter = express.Router();
const db = require("../../db.js");
// 사진 업로드 용 라이브러리
const multer = require('multer');
//이미지 업로드 공간 
const imageUpload = 'public/images/';

//예시
//쿼리형태로 받음
reviewRouter.get("/review", async (request,response)=>{
    let result = await db.connection('notice','boardList');
    response.send(result);
  })

  module.exports = reviewRouter;
// 이미지 출력 용 

const storage = multer.diskStorage({
	//파일저장경로
	destination(req, res, callback){
		callback(null, imageUpload) //서버 저장 path 기재해야함
	},
    //저장되는 파일이름 형식 커스텀 가능
    // 오늘 날짜 + file 오리지널 이름 (중복 방지)
	filename(req, res, callback){
		callback(null, `${Date.now()}_${res.originalname}`)
	},
  filefilter(req, res, callback){
    const ext = path.extname(res.originalname);
    if(ext !== ".jpeg" || ".png" || ".jpg"){
      return callback(null,false);
    }
    callback(null,true);
  },
  limits : {fileSize: 20* 1024 * 1024},
});

//사진 폴더에 저장 - 전달하고  미리보기 
// reviewRouter.post("/img",upload.array("img",4),async (req, res) => {
// 		console.log("파일이름:" ,req.files);
//     let urlArr = new Array();
//     for( let i = 0; i < req.files.length; i++){
//       urlArr.push(`img/${req.files[i].filename}`);
//       console.log(urlArr[i]);
//     }
//     let jsonUrl = JSON.stringify(urlArr);
//     res.json(jsonUrl);
//   });

const upload = multer({storage : storage});
