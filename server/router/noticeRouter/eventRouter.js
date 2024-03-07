const express = require('express');
const eventRouter = express.Router();
const db = require("../../db.js");

 //이벤트 배너 전체조회 + 페이징
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



//이벤트 생성 및 파일 업로드 같이 시도

eventRouter.post("/event",async (req, res) => {
    let eventData = req.body.event; //배너 정보 
    let fileData = req.body.file; // 이미지파일 정보 
    console.log('Received Event Data:', eventData);
    console.log('Received File Data:', fileData);
    let eventResult = await db.connection('event', 'insertEvent', [eventData]); //배너 정보 넣어주고 

    let newfileName = file.filename.split('.');
   
      fileData.table_cd = "3"; //배너 관련은 3 
      fileData.type_cd = "1"; // 이건 어떻게 바꿔야하는지 모르겠음
      fileData.file_path = file.path; // Set based on your file upload logic
      fileData.file_name = newfileName[0]; // .앞의 이미지명
      fileData.file_extn = newfileName[1]; // .뒤의 확장자
    // Insert into the file upload table
    let fileResult = await db.connection('file', 'fileInsert', [fileData]);

    res.send({ eventResult, fileResult });
  });


// 총 갯수 - 페이징 용
eventRouter.get("/event", async (req,response)=>{
  let result = await db.connection('event','eventCount');
  response.send(result);
})

  module.exports = eventRouter;