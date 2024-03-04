//event.js
// 예시
const eventCount = 
`SELECT count(event_cd) as count
FROM event`;

const eventList = 
`select * 
from event 
order by event_cd desc
limit ?
offset ?`;

module.exports = {
   eventList,
   eventCount
}