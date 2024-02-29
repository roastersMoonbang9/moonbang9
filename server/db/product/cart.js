//cart.js
// 장바구니 목록
const cartList = 
`SELECT 
        p.prdt_cd,
        p.prdt_name,
        p.brand,
        p.large_code,
        p.small_code,
        p.price, 
        p.sale_price,
        p.dc_pct,
        p.image,
        c.cart_cd,
        c.cart_qty,
        o.opt_cd, 
        o.opt_name,
        (p.sale_price * c.cart_qty) as total_price
FROM product p  join cart c on p.prdt_cd = c.prdt_cd
        join options o on o.opt_cd = c.opt_cd
WHERE c.mem_no=?`;

//장바구니 수량 수정
const cartUpdate = 
`UPDATE cart
SET ?
WHERE cart_cd=?`;

//장바구니 선택항목삭제(루프 필요)
const cartDel = 
`DELETE FROM cart
WHERE cart_cd=?`;


module.exports = {
    cartList,
    cartUpdate,
    cartDel
}