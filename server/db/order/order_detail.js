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

// 마이페이지 상세 주문조회
const usOrderDetailList = 
`SELECT 
        d.detail_no,
        d.detail_cnt,
        d.ord_no,
        d.sum_price,
        d.price,
        d.dc_pct,
        p.prdt_cd,
        o.opt_cd,
        r.deli_addr,
        r.deli_addrdt,
        r.deli_cost,
        r.ord_dt,
        r.rcv_name,
        r.rcv_phone,
        r.rcv_email,
        r.status,
        r.total_price,
        r.used_point,
        r.total_payment,
        r.mem_no,
        r.payment_no,
        r.accu_pnt,
        r.cpn_no,
        r.cpn_disc,
        r.rcv_postcode,
        r.cancel_dt,
        o.opt_name,
        p.prdt_name,
        p.brand,
        p.large_code,
        p.small_code,
        p.sale_price,
        p.image,
        p.regis_dt,
        p.modify_dt,
        p.prdt_detail
FROM order_detail d JOIN orders r ON d.ord_no = r.ord_no
                    JOIN options o ON d.opt_cd = o.opt_cd
                    JOIN product p ON d.prdt_cd = p.prdt_cd`;

// 주문수 확인(유저)
const usOrderDetailCount = 
`SELECT count(d.ord_no) as count
FROM order_detail d JOIN orders r 
ON d.ord_no = r.ord_no`;



module.exports = {
    orderDetailList,
    orderDetailLists,
    orderDetailAdd,
    usOrderDetailList,
    usOrderDetailCount
}