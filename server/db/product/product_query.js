//product-query.js
// 예시
const queryList = 
`select * from product_question
where prdt_cd = ?`;

const queryInfo = 
`SELECT * FROM product_question  
WHERE prdt_cd = ?`;

const queryUpdate = 
`UPDATE product_question
SET ?`;
const queryInsert =
`INSERT INTO product_question
SET ?`;
const queryDel = 
`DELETE FROM product_question
WHERE qst_no= ?`; 


module.exports = {
    queryList,
    queryInfo,
    queryUpdate,
    queryInsert,
    queryDel


}