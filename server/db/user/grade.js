//grade.js

// 회원등급 조회
const getGrade = 
`SELECT * from grade
WHERE grd_no=?`;

//등급 출력
const gradeList = 
`select * from grade`;

//회원등급 수정
const gradeUpdate = 
`UPDATE grade 
SET ?
WHERE grd_no = ?`;

//회원등급 및 포인트 조회
const gradePoint = 
`SELECT m.point, g.grd_name 
FROM grade g
JOIN member m on m.grd_no = g.grd_no
WHERE mem_no=?`;

module.exports = {
    getGrade,
    gradeList,
    gradeUpdate,
    gradePoint
}