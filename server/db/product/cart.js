//cart.js
// 장바구니 목록
const cartList = 
`SELECT 
        prdt_cd p,
        prdt_name p, 
        price p, 
        opt_name o,
        cart_qty c, 
        (sale_price p * cart_qty c) as total_price 
FROM product p  join cart c on p.prdt_cd = c.prdt_cd
                join options o on o.opt_cd = c.opt_cd
WHERE c.mem_no=?`;

//장바구니 수량 수정
const cartMod = 
`UPDATE cart
SET cart_qty = ?
WHERE mem_no=? and prdt_name =? and opt_name=?`;

//장바구니 선택항목삭제(루프 필요)
const cartDel = 
`DELETE FROM cart
WHERE mem_no=? and prdt_name =? and opt_name=?`;

module.exports = {
    cartList,
    cartMod,
    cartDel
}