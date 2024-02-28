//product.js
// 예시

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
FROM  product p JOIN (SELECT COUNT(*) as sell, prdt_cd
                      FROM order_detail
                      GROUP BY prdt_cd) d
                ON p.prdt_cd = d.prdt_cd
WHERE large_code = 'A'
AND small_code = 'A'
ORDER BY d.sell DESC;`


module.exports = {
    
    popularProductList
}