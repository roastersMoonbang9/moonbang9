//order.js
// 주문 목록추가
const orderAdd = 
`INSERT INTO orders
            (ord_no, 
            mem_no, 
            payment_no, 
            deli_addr, 
            deli_addrdt, 
            deli_cost, 
            ord_dt, 
            rcv_name, 
            rcv_phone, 
            rcv_email, 
            status, 
            total_price, 
            used_point, 
            total_payment, 
            accu_pnt,
            cpn_no, 
            cpn_disc) 
SET ?`;

//주문 결제 조회
const orderList = 
`
`;


//예시
const test = 
`select * from grade`;


module.exports = {
    orderAdd,
    orderList,
    test
}