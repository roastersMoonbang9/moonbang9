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
          console.log(file);
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

 

fileUploadRouter.post("/", upload.array('dataFiles'), async (req,res)=>{
  let table_cd = req.body.table_cd;
  let table_name = '';
  let tableData = {};
  let opt_names = [];
  let optionData = {};
  if(table_cd == "4"){
    tableData = {
      title : req.body.title,
      content : req.body.content,
      impor : parseInt(req.body.impor)
    }
    let eventResult = await db.connection('notice','noticeInsert',tableData).catch(err => console.log(err));
    console.log(eventResult);
  } else if(table_cd == "3"){
    tableData = {
      event_name : req.body.event_name,
      path : req.body.path,
      status : parseInt(req.body.status)
    }
    let eventResult = await db.connection('event','eventInsert',tableData).catch(err => console.log(err));
    console.log(eventResult);
  } else if(table_cd == "0"){
    tableData = {
      prdt_cd : req.body.type_cd,
      prdt_name : req.body.prdt_name,
      brand : req.body.brand,
      large_code : req.body.large_code,
      small_code : req.body.small_code,
      price : req.body.price,
      dc_pct : req.body.dc_pct,
      sale_price : req.body.sale_price,
      prdt_detail : req.body.prdt_detail,
      image : req.body.image
    }
    let eventResult = await db.connection('product','productInsert',tableData).catch(err => console.log(err));
    console.log(eventResult);
    if(req.body.opt_name1 != ''){
      opt_names.push(req.body.opt_name1);
    }
    if(req.body.opt_name2 != ''){
      opt_names.push(req.body.opt_name2);
    }
    if(req.body.opt_name3 != ''){
      opt_names.push(req.body.opt_name3);
    }
    if(req.body.opt_name4 != ''){
      opt_names.push(req.body.opt_name4);
    }
    for(let i = 0; i < opt_names.length; i++){
      optionData = {
        opt_cd : req.body.type_cd + (i+1),
        opt_name : opt_names[i],
        prdt_cd : req.body.type_cd
      }
      console.log(optionData);
      let optionResult = await db.connection('product','optionsInsert',optionData).catch(err => console.log(err));
      console.log(optionResult);
    }
  }
  console.log('Received type_cd:', req.body.type_cd);
  console.log('Received Table Data:', tableData);
  console.log('Received option Data:', opt_names);
  let fileData = req.body.dataFiles; // 이미지파일 정보 
  console.log('Received File Data:', req.files);
    let imgUrlList = [];
    for(let file of req.files){

      let imgUrl = `files${staticUrl}/${file.filename}`;
  
      // 문자열 잘라서 파일명만 담기
      let newfileName = file.filename.split('.');
      //console.log('파일명과 확장자 분리하기', newfileName[0], newfileName[1]);
  
      let data = {
          table_cd: req.body.table_cd, //상품 = 0, 리뷰 = 1, 1:1문의 = 2, 이벤트 = 3, 공지 = 4
          type_cd: req.body.type_cd, // 구분번호 <-- 이거 1로 고정시키면 안됨
          file_path: file.path, // 파일경로 ..\client\src\assets\user\img\1709702569457_1.png 저장됨
          file_name: newfileName[0], // 파일 이름
          file_extn: newfileName[1], // 확장자명
          ranks: 1, // 배치순서 -> 배열로 바꿔야함    
      }
      console.log(data);
      // DB insert 첨부파일 정보를 DB에 저장
      let result = await db.connection('file','fileInsert',data).catch(err => console.log(err));
      console.log(result);
      
      imgUrlList.push(imgUrl);
      console.log(imgUrlList);

    }
    res.send("성공");
  });

// 첨부파일 정보 전체조회
fileUploadRouter.get('/', async (req, res) => {
  let result = await db.connection('file','fileList');
  res.send(result);
})
  
  module.exports = fileUploadRouter;
// 이미지 출력 용 
