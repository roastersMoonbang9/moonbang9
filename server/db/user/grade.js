//grade.js
// 예시
//등급 출력
const gradeList = 
`select * from grade`;


const gradeUpdate = 
`UPDATE grade 
SET rwd_pct = ?
WHERE grd_no = ?`;

module.exports = {
    gradeList,
    gradeUpdate
}