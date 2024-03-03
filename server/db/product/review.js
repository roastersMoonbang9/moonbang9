//review.js
// 예시
const reviewList = 
`select * from review`;

const reviewUpdate= 
`UPDATE event  
SET status= 1
WHERE event_cd = ?`;

// 이벤트 삭제 
const reviewDel = 
`DELETE FROM event
WHERE event_cd= ?`;

module.exports = {
    reviewList,
    reviewUpdate,
    reviewDel
}