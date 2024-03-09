//notice.js
// 예시

const noticeCount = 
`SELECT COUNT(notice_no) as count
FROM notice`;

const noticeList = 
`SELECT
notice_no,
impor,
title,
notice_dt,
content 
FROM   notice 
ORDER BY notice_no DESC
LIMIT ?
OFFSET ?`;

const noticeInsert = 
`INSERT INTO notice
SET ?`;

const noticeDelete =
`DELETE FROM notice
WHERE notice_no= ?`;

const noticeDeleteImage =
`DELETE FROM file
WHERE type_cd= ? AND table_cd = 4`;

const noticeInfo =
`SELECT *
FROM notice
WHERE notice_no =  ?`;

const noitceInfoImage =
`SELECT file_path
FROM file
WHERE type_cd = ? AND table_cd = 4`;

module.exports = {
    noticeList,
    noticeInsert,
    noticeCount,
    noticeDelete,
    noticeDeleteImage,
    noticeInfo,
    noitceInfoImage
}