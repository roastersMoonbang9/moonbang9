const express = require('express');
const fileUploadRouter = express.Router();
const db = require("../../db.js");
const imageUpload = '../client/src/assets/user/img';
const multer = require('multer');

//파일저장경로
    const storage = multer.diskStorage({
        destination(req, file, cb){
            cb(null, imageUpload) //서버 저장 path 기재해야함/ cb함수 통해 전송된 파일 저장 디렉터리 설정
        },
        //저장되는 파일이름 형식 커스텀 가능
        // 오늘 날짜 + file 오리지널 이름 (중복 방지)
        filename(req, file, cb){  //db 콜백함수 통해 전송된 파일 이름 설정
          file.originalname = Buffer.from(file.originalname, "latin1").toString(
            "utf8"
          );
          let rename = `${Date.now()}_${file.originalname}`
    cb(null, rename); // 밀리초+파일이름으로 파일이름 재설정(파일 이름 충돌방지)
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
    const staticUrl = '/event';

fileUploadRouter.post("/", upload.array('photos',4), async (req,res)=>{
    let imgUrlList = [];
    for(let file of req.files){

      let imgUrl = `files${staticUrl}/${file.filename}`;
  
      // 문자열 잘라서 파일명만 담기
      let newfileName = file.filename.split('.');
      //console.log('파일명과 확장자 분리하기', newfileName[0], newfileName[1]);
  
      let data = {
          table_cd: "3", //0 = 상품 1= 리뷰 2= 1: 1 문의 3= 이벤트 4= 반품
          type_cd: 1, // 구분번호 <-- 이거 1로 고정시키면 안됨
          file_path: file.path, // 파일경로 ..\client\src\assets\user\img\1709702569457_1.png 저장됨
          file_name: newfileName[0], // 파일 이름
          file_extn: newfileName[1], // 확장자명
          ranks: 1, // 배치순서 -> 배열로 바꿔야함    
      }
      // DB insert 첨부파일 정보를 DB에 저장
      await db.connection('file','fileInsert',data)
      .then((result) => {
        if(result.affectedRows > 0) {
          res.send(result);
        }
      }).catch ((err) => {
        console.log(err);
        res.send('err');
      })
  
      imgUrlList.push(imgUrl);
      console.log(imgUrlList);
    }
  });

// 첨부파일 정보 전체조회
fileUploadRouter.get('/', async (req, res) => {
  let result = await db.connection('file','fileList');
  res.send(result);
})
  
  module.exports = fileUploadRouter;
// 이미지 출력 용 
