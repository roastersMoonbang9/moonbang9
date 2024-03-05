//user.js

// 회원 전체 조회
const userList = 
`SELECT
        mem_no,
        id,
        name,
        pwd,
        phone,
        birth_dt,
        gen,
        email,
        post_cd,
        addr,
        addrdt,
        point,
        token,
        mem_status,
        grade_no
FROM    member
ORDER BY mem_no`;

// 회원 개별 조회
const userInfo = 
`SELECT
        id,
        name,
        pwd,
        phone,
        birth_dt,
        gen,
        email,
        post_cd,
        addr,
        addrdt,
        point,
        post_cd
FROM    member
WHERE mem_no = ?`;


// 회원 로그인
const userLogin = 
`SELECT 
        COUNT(*) AS loginCheck ,
        mem_no,
        name
FROM    member 
WHERE   id = ? 
AND     pwd = ?`;

// 회원 가입
const userJoin = 
`INSERT INTO member 
SET ?`;

// 회원 정보 수정
const userUpdate = 
`UPDATE member 
 SET ?
 WHERE mem_no = ?`;

 //회원탈퇴
//const userQuit =


 //const userDelete = 
 
 // 보유 포인트 확인
 const userPoint = 
`SELECT * 
 FROM   member 
 WHERE mem_no = ?`;

 module.exports = {
    userList,
    userInfo,
    userJoin,
    userUpdate,
    userLogin,
    userPoint
}