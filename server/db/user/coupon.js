//coupon.js
// 예시
const possCouponList = 
`SELECT p.poss_no,
        p.cpn_no,
        p.mem_no,
        p.crt_dt,
        p.poss_rsn,
        p.end_dt,
        p.status,
        p.cpnused_dt,
        c.cpn_name,
        c.dc_pct,
        c.dc_price,
        c.cpn_dt
FROM poss_coupon p 
JOIN coupon c ON p.cpn_no = c.cpn_no 
WHERE p.mem_no=? and p.status=?`;


module.exports = {
    possCouponList
}
