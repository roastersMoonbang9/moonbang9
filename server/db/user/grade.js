//grade.js

// 등급별 할인율 조회
const getGrade = 
`SELECT rwd_pct from grade
WHERE grd_no=?`;
// 예시
//등급 출력
const gradeList = 
`select * from grade`;


const gradeUpdate = 
`UPDATE grade 
SET rwd_pct = ?
WHERE grd_no = ?`;

module.exports = {
    getGrade,
    gradeList,
    gradeUpdate
}