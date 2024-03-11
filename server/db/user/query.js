//query.js
// 예시


// 회원별 문의목록
const questionList = 
`SELECT 	
    qst_no,
    ctg,
    title,
    content, 
    qst_dt,
    status,
    answer,
    answer_dt
FROM general_question`;

// 회원별 문의수 확인
const questionListCount = 
`SELECT count(qst_no) as count
FROM general_question`;


module.exports = {
    questionList,
    questionListCount
}