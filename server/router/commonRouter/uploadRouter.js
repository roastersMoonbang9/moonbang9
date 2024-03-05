const express = require('express');
const fileUploadRouter = express.Router();
const db = require("../../db.js");
//이미지 업로드 공간 
const imageUpload = '../client/src/assets/user/img';
// 사진 업로드 용 라이브러리
const multer = require('multer');
//파일저장경로
    const storage = multer.diskStorage({
        destination(req, file, cb){
            cb(null, imageUpload) //서버 저장 path 기재해야함/ cb함수 통해 전송된 파일 저장 디렉터리 설정
        },
        //저장되는 파일이름 형식 커스텀 가능
        // 오늘 날짜 + file 오리지널 이름 (중복 방지)
        filename(req, file, cb){  //db 콜백함수 통해 전송된 파일 이름 설정
            cb(null, `${Date.now()}_${file.originalname}`) //저장되는 시간으로 파일이름
        },
      filefilter(req, file, cb){
        const ext = path.extname(file.originalname);
        if(ext !== ".jpeg" || ".png" || ".jpg"){
          return cb(null,false);
        }
        cb(null,true);
      },
      limits : {fileSize: 20* 1024 * 1024},
    });
    const upload = multer({storage : storage});


fileUploadRouter.post("/", upload.array('photos',4), async (req,res)=>{
    let data = req.body;
    console.log(req.body);
    console.log(req.files);
    let result = await db.connection('file','fileInsert',data).catch(err=>console.log(err));
    res.send(result);
  });

  
  module.exports = fileUploadRouter;
// 이미지 출력 용 
