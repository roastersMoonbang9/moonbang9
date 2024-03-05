const express = require('express');
const eventRouter = express.Router();
const db = require("../../db.js");

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

 //이벤트 배너 전체조회 
eventRouter.get("/event/:offset/:limit", async (request,response)=>{
  let data = parseInt(request.params.limit);
    let data2 = parseInt(request.params.offset);
    let dataResult = [data, data2]
    let result = await db.connection('event','eventList', dataResult)
    response.send(result);
})

//이벤트 배너 활성화 
eventRouter.put("/event/:eno", async (request, response) => {
  let data = [request.body.param, request.params.eno];
  let result = await db.connection('event','updateEvent', data);
  response.send(result);
});
//이벤트 삭제 


// 총 갯수
eventRouter.get("/event", async (req,response)=>{
  let result = await db.connection('event','eventCount');
  response.send(result);
})


  eventRouter.get("/event", async (req,response)=>{
    let result = await db.connection('event','eventCount');
    response.send(result);
  })

  //등록 : post => body
eventRouter.post("/event", upload.array('photos',4),async (req, response)=>{
  //이벤트 등록
  let result = db.connection('event','InsertBanner',data);
  let data = req.body;
    console.log(req.body);
    console.log(req.files);

    /* [Object: null prototype] { table_cd: '3', type_cd: '' }
[
  { 
    fieldname: 'photos',
    originalname: '1.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: '../client/src/assets/user/img',
    filename: '1709626742857_1.png',
    path: '..\\client\\src\\assets\\user\\img\\1709626742857_1.png',
    size: 21777
  }
]
*/
    //파일 정보 저장
  await db.connection('file','fileInsert',data).catch(err=>console.log(err));
  console.log(result);
  response.send(result);
});
  module.exports = eventRouter;