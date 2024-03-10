//product.js
// 예시

// 상품 목록 동적 쿼리 (WHERE 검색키워드/카테고리 + ORDER BY 인기순/신상품순/낮은가격순/높은가격순/할인율순 + LIMIT 갯수제한 )
const productList = 
`SELECT  p.prdt_cd,
         p.prdt_name,
         p.brand,
         p.large_code,
         p.small_code,
         p.price,
         p.sale_price,
         p.dc_pct,
         p.image,
         p.regis_dt,
         d.sell
FROM  product p LEFT OUTER JOIN (SELECT COUNT(*) as sell, 
                                        prdt_cd
                                 FROM order_detail
                                 GROUP BY prdt_cd) d
                ON p.prdt_cd = d.prdt_cd`;

// 회원수 확인(관리자)
const productCount = 
`SELECT count(p.prdt_cd) as count
FROM product p LEFT OUTER JOIN (SELECT COUNT(*) as sell, 
prdt_cd
FROM order_detail
GROUP BY prdt_cd) d
ON p.prdt_cd = d.prdt_cd`;

// 상품상세 페이지 내부 : 상품상세 컴포넌트 => (이미지 제외) 상품정보
const productInfo = 
`SELECT prdt_cd,
        prdt_name,
        brand,
        large_code,
        small_code,
        price,
        sale_price,
        dc_pct,
        image,
        prdt_detail
FROM  product
WHERE prdt_cd = ?`;

// 상품상세 페이지 내부 : 상품상세 컴포넌트 => 옵션 목록
const productOptions =
`SELECT SUBSTR(o.opt_cd,8,2) as opt_number
        , opt_cd
        , o.opt_name
FROM product p JOIN options o
               ON p.prdt_cd = o.prdt_cd
WHERE p.prdt_cd = ?
ORDER BY opt_number`;

// 상품상세 페이지 안 : 나머지 이미지들
const productImages =
`SELECT p.prdt_cd
, f.table_cd
, f.type_cd
, f.file_path
, f.file_name
, f.file_extn
, f.ranks
FROM product p JOIN file f
       ON p.prdt_cd = f.type_cd
WHERE p.prdt_cd = 'CB00001'
ORDER BY f.ranks;`;

// 상품상세 페이지에서 선택한 상품들 장바구니에 담기
const insertCart = 
// `INSERT INTO cart (
//                     mem_no,
//                     prdt_cd 
//                     opt_cd,
//                     cart_qty,
//                     ) 
// SET ?`;
`INSERT INTO cart
SET ?`;

module.exports = {    
    productList,
    productCount,
    productInfo,
    productOptions,
    productImages,
    insertCart
}