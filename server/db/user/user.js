//user.js

// 회원 전체 조회(관리자)
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
        grd_no,
        used_payment,
        join_dt,
        unjoin_dt
FROM    member`;

// 회원 개별 조회
const userInfo = 
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
        grd_no,
        (select rwd_pct from grade where grd_no = member.grd_no) as rwd_pct,
        used_payment
FROM    member
WHERE mem_no = ?`;


// 회원 로그인
const userLogin = 
`SELECT 
        COUNT(*) AS loginCheck ,
        mem_no,
        name,
        mem_status
FROM    member 
WHERE   id = ? 
AND     pwd = ?`;

//카카오 아이디 확인
const checkKakaoId = 
`SELECT mem_no,
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
        grd_no,
        (select rwd_pct from grade where grd_no = member.grd_no) as rwd_pct,
        used_payment 
FROM member
WHERE id=?`;

// 카카오 아이디로 회원 가입
const registerWithKakaoAccount = 
`INSERT INTO member 
 SET ?`;

// 카카오 아이디로 로그인 조회
const loginWithKakaoId = 
`SELECT id        
FROM    member 
WHERE   id = ?`;

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
const userQuit =
`UPDATE member 
 SET mem_status = 0
 WHERE mem_no = ?`;

 //const userDelete = 
 
 // 보유 포인트 확인
 const userPoint = 
`SELECT * 
 FROM   member 
 WHERE mem_no = ?`;

 // 회원수 확인(관리자)
 const userCount = 
`SELECT count(mem_no) as count
FROM member`;

//회원 등급수정
const userGradeUpdate = 
`UPDATE member 
SET grd_no = (select grd_no from grade where grd_level <= ? order by grd_no desc limit 1)
WHERE mem_no = ?`;

// 회원 토탈사용금액 갱신
const usedPaymentUpdate = 
`UPDATE member 
SET used_payment = used_payment + ?
WHERE mem_no = ?`;

 module.exports = {
    userList,
    userInfo,
    userJoin,
    userUpdate,
    userLogin,
    userPoint,
    userCount,
    userGradeUpdate,
    usedPaymentUpdate,
    registerWithKakaoAccount,
    loginWithKakaoId,
    checkKakaoId,
    userQuit
}