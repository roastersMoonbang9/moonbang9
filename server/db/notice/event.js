//event.js
// 예시

// 페이징 용 카운트
const eventCount = 
`SELECT count(event_cd) as count
FROM event`;

// 이벤트 목록 출력
const eventList = 
`SELECT * 
FROM event
order by event_cd desc
limit ? 
offset ?`;

// 이벤트 배너 활성화 
const updateEvent = 
`UPDATE event  
SET status= 1
WHERE event_cd = ?`

// 이벤트 삭제

  const delEvent = 
`DELETE FROM event
WHERE event_cd= ?`

//배너 추가 
const eventInsert = 
`INSERT INTO event 
SET ?`

module.exports = {
   eventCount,
   eventList,
   updateEvent,
   delEvent,
   eventInsert

}