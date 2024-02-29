//product.js
// 예시

// 메인 페이지 - 인기상품 3개 목록
const mainPopularProductList =
`SELECT  p.prdt_cd,
         p.prdt_name,
         p.price,
         p.sale_price,
         p.dc_pct,
         p.image,
         d.sell
FROM  product p LEFT OUTER JOIN (SELECT COUNT(*) as sell, 
                                        prdt_cd
                                 FROM order_detail
                                 GROUP BY prdt_cd) d
                ON p.prdt_cd = d.prdt_cd
ORDER BY d.sell`;

// 메인 페이지 - 신상품 6개 목록
const mainNewProductList = 
`SELECT prdt_cd,
        prdt_name,
        price,
        sale_price,
        dc_pct,
        image,
        regis_dt
FROM  product
ORDER BY regis_dt DESC`;

// 상품목록페이지 - 인기상품순 정렬 목록
const popularProductList = 
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
                ON p.prdt_cd = d.prdt_cd
WHERE large_code = ?`;

// 상품목록페이지 - 신상품순/낮은가격순/높은가격순/할인율순 정렬 목록
const generalProductList = 
`SELECT prdt_cd,
        prdt_name,
        brand,
        large_code,
        small_code,
        price,
        sale_price,
        dc_pct,
        image,
        regis_dt
FROM  product
WHERE large_code = ?`;

// 상품상세 페이지 - (이미지 제외) 상품정보
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

// 상품상세 페이지 - 나머지 이미지들
const productInfoImages =
`SELECT p.prdt_cd
        , f.table_cd
        , f.type_cd
        , f.file_path
        , f.file_name
        , f.file_extn
        , f.ranks
FROM product p JOIN file f
               ON p.prdt_cd = f.type_cd
WHERE p.prdt_cd = ?
ORDER BY ranks`;

// 상품상세 페이지 - 상품의 옵션들 목록
const productInfoOptions =
`SELECT SUBSTR(o.opt_cd,8,2) as opt_number
        , o.opt_name
FROM product p JOIN options o
               ON p.prdt_cd = o.prdt_cd
WHERE p.prdt_cd = ?
ORDER BY opt_number`;



module.exports = {    
    mainPopularProductList,
    mainNewProductList,
    popularProductList,
    generalProductList,
    productInfo,
    productInfoImages,
    productInfoOptions
}