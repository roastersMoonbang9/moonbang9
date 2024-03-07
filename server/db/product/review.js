//review.js
// 해당 상품 리뷰 목록 출력
const reviewList = 
`SELECT       
r.rv_no
,r.content
,r.rating
,r.prdt_cd
,m.id
,r.rv_dt
,r.ord_no
FROM review r JOIN member m ON r.mem_no = m.mem_no`;

const reviewInfo = 
`SELECT * FROM review 
WHERE rv_no = ?`

const reviewUpdate= 
`UPDATE review
SET ?`;

const reviewInsert = 
`INSERT INTO review
SET ?`;

// 리뷰 삭제 
const reviewDel = 
`DELETE FROM event
WHERE event_cd= ?`;


module.exports = {
    reviewList,
    reviewInfo,
    reviewUpdate,
    reviewInsert,
    reviewDel
    
}