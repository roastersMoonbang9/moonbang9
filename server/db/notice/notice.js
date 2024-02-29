//notice.js
// 예시

const noticeCount = 
`SELECT count(notice_no) as count
FROM notice`;

const noticeList = 
`select * 
from notice 
order by notice_no desc
limit 5
offset ?`;

const noticeInsert = 
`INSERT INTO notice
SET ?`;

module.exports = {
    noticeList,
    noticeInsert,
    noticeCount
}