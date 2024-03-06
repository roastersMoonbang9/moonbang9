<template>
        <!-- PRODUCT DETAILS-->
            <div class="col-lg-6">
              <ul class="list-inline mb-2 text-sm">
                <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0 1"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0 2"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0 3"><i class="fas fa-star small text-warning"></i></li>
                <li class="list-inline-item m-0 4"><i class="fas fa-star small text-warning"></i></li>
              </ul>
              <h1>{{ productInfo.prdt_name }}</h1>

              <ul class="list-unstyled small d-inline-block">
                <li class="px-3 py-2 mb-1 bg-white"><strong class="text-uppercase">정상가:</strong><span class="ms-2 text-muted">{{ productInfo.price }}</span></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">판매가:</strong><a class="reset-anchor ms-2" href="#!">{{ productInfo.sale_price }}</a></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">할인율:</strong><a class="reset-anchor ms-2" href="#!">Innovation</a></li>
              </ul>

              <!-- <p class="text-muted lead">정상가 {{ productInfo.price }}</p>
              <p class="text-muted lead">할인가 {{ productInfo.sale_price }}</p> -->
              <!-- <p class="text-sm mb-4"> 상품설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p> -->
              
              <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option selected>상품을 선택해주세요</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>



              <div class="row align-items-stretch mb-4">
                <!-- <div class="col-sm-5 pr-sm-0">
                  <div class="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white"><span class="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                    <div class="quantity">
                      <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                      <input class="form-control border-0 shadow-0 p-0" type="text" value="1">
                      <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                    </div>
                  </div>
                </div> -->
                <div class="col-sm-3 pl-sm-0"><a class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0" href="cart.html">바로구매</a></div>
                <div class="col-sm-3 pl-sm-0"><a class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0" href="cart.html">장바구니</a></div>
              </div>
              
              <!-- <a class="text-dark p-0 mb-4 d-inline-block" href="#!"><i class="far fa-heart me-2"></i>Add to wish list</a><br> -->
              
              <!-- <ul class="list-unstyled small d-inline-block">
                <li class="px-3 py-2 mb-1 bg-white"><strong class="text-uppercase">SKU:</strong><span class="ms-2 text-muted">039</span></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Category:</strong><a class="reset-anchor ms-2" href="#!">Demo Products</a></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Tags:</strong><a class="reset-anchor ms-2" href="#!">Innovation</a></li>
              </ul> -->

            </div>
</template>
<script>
  import axios from "axios";

  export default {
    data() {
      return {
        productInfo : {
          prdt_cd : '',
          prdt_name : '',
          brand : '',
          large_code : '',
          small_code : '',
          price : '',
          sale_price : '',
          dc_pct : '',
          image : '',
          prdt_detail : ''
        }
      }
    },
    created() {
      let cd = this.$route.query.prdt_cd;
      this.getProductInfo(cd);
      this.getProductOptions(cd);
    },
    methods : {
      // 상품 정보
      async getProductInfo(cd){
        console.log(cd);
        let result = await axios.get('/api/product/productInfo/' + cd);
        this.productInfo = result.data;
        console.log(result);
      },
      // 상품 옵션 목록
      async getProductOptions(cd){
        console.log(cd);
        let result = await axios.get('/api/product/productOptions/' + cd);
        this.productInfo = result.data;
        console.log(result);
      }
    }
  }
</script>
