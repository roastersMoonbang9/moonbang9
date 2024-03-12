//coupon.js
// 예시
//보유 쿠폰 목록 
// const possCouponList = 
// `SELECT p.poss_no,
//         p.cpn_no,
//         p.mem_no,
//         p.crt_dt,
//         p.poss_rsn,
//         p.end_dt,
//         p.status,
//         p.cpnused_dt,
//         c.cpn_name,
//         c.dc_pct,
//         c.dc_price,
//         c.cpn_dt
// FROM poss_coupon p 
// JOIN coupon c ON p.cpn_no = c.cpn_no 
// WHERE p.mem_no=? and p.status=? and p.end_dt >= now()`;


//쿠폰 상태변경
const couponMod = 
`UPDATE poss_coupon
SET ?
WHERE poss_no=?`

// 쿠폰 목록(관리자)
const couponList =
`SELECT 	cpn_no,
cpn_name,
dc_pct,
dc_price,
cpn_dt
FROM coupon
ORDER BY cpn_no DESC
LIMIT ?
OFFSET ?`;

// 쿠폰 수(관리자)
const couponCount = 
`SELECT COUNT(cpn_no) as count
FROM coupon`;

// 쿠폰 등록(관리자)
const couponInsert = 
`INSERT INTO coupon
SET ?`;

// 쿠폰 삭제(관리자)
const couponDelete =
`DELETE FROM coupon
WHERE cpn_no= ?`;

// 쿠폰 지급 목록(관리자)
const giveCouponList =
`SELECT 	p.poss_no,
p.mem_no,
c.cpn_name,
p.crt_dt,
p.poss_rsn,
p.end_dt,
p.status,
p.cpnused_dt
FROM poss_coupon p JOIN coupon c
ON p.cpn_no = c.cpn_no
ORDER BY p.poss_no DESC
LIMIT ?
OFFSET ?`;

// 쿠폰 지급 수(관리자)
const giveCouponCount = 
`SELECT COUNT(cpn_no) as count
FROM poss_coupon`;

// 쿠폰 지급 회원번호(관리자)
const checkMemNo =
`SELECT mem_no
FROM member
WHERE grd_no = ?`;

// 쿠폰 지급(관리자)
const possCouponInsert = 
`INSERT INTO poss_coupon
SET ?`;

// 보유쿠폰 목록
const possCouponList =
`SELECT 	p.poss_no,
c.cpn_name,
c.dc_pct,
c.dc_price,
p.mem_no,
p.crt_dt,
p.end_dt,
p.status,
p.cpnused_dt
FROM poss_coupon p JOIN coupon c
ON p.cpn_no = c.cpn_no
WHERE p.mem_no= ?
limit ? 
offset ?`

// 보유 쿠폰 수
const possCouponCount = 
`SELECT COUNT(poss_no) as count
FROM poss_coupon
WHERE mem_no = ?`;

module.exports = {
    possCouponList,
    couponMod,
    couponList,
    couponCount,
    couponInsert,
    couponDelete,
    giveCouponList,
    giveCouponCount,
    checkMemNo,
    possCouponInsert,
    possCouponCount
}
