//review.js
// 해당 상품 리뷰 목록 출력
const reviewList = 
`SELECT       
r.rv_no
,r.content
,r.rating
,o.prdt_cd
,o.opt_cd
,m.id
,r.rv_dt
,r.ord_no
FROM review r join order_detail o on r.ord_no = o.ord_no JOIN member m ON  m.mem_no = r.mem_no 
WHERE o.prdt_cd =?`;

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