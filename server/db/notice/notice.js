//notice.js
// 예시
const noticeList = 
`select * 
from notice 
order by notice_no desc
limit ?, ?`;


module.exports = {
    noticeList
}