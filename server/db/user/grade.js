//grade.js

// 등급별 할인율 조회
const getGrade = 
`SELECT rwd_pct from grade
WHERE grd_no=?`;


module.exports = {
    getGrade
}