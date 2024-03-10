//order_detail.js
// 상세 주문조회
const orderDetailList = 
`SELECT 
        p.prdt_name, 
        o.opt_name, 
        r.ord_dt, 
        d.detail_cnt, 
        d.sum_price,
        r.status
FROM order_detail d JOIN orders r ON d.ord_no = r.ord_no
                    JOIN options o ON d.opt_cd = o.opt_cd
                    JOIN product p ON d.prdt_cd = p.prdt_cd`;


// 상세주문 단건전체조회
const orderDetailLists =
`SELECT 
        r.deli_addr,
        r.deli_addrdt,
        r.deli_cost,
        r.ord_dt,
        r.rcv_name,
        r.rcv_email,
        r.rcv_phone,
        r.status,
        r.total_price,
        r.used_point,
        r.total_payment,
        r.payment_no,
        r.accu_pnt,
        r.cpn_disc,
        o.opt_name,
        d.price,
        d.detail_cnt,
        d.dc_pct,
        d.sum_price
FROM order_detail d JOIN orders r ON d.ord_no = r.ord_no
JOIN options o ON o.opt_cd = d.opt_cd
JOIN product p ON d.prdt_cd = p.prdt_cd
WHERE r.mem_no=?`

// 상세 주문등록
const orderDetailAdd = 
`INSERT INTO order_detail
SET ?`;



module.exports = {
    orderDetailList,
    orderDetailLists,
    orderDetailAdd
}