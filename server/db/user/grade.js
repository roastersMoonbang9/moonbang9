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

module.exports = {
    getGrade,
    gradeList,
    gradeUpdate
}