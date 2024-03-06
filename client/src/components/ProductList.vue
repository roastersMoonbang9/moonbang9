<template>
  <div class="row">

    <!-- PRODUCT-->
    <div v-for="(product,idx) in productList" v-bind:key="idx" class="col-lg-4 col-sm-6">
      <div class="product text-center">
        <div class="mb-3 position-relative">
          <div class="badge text-white bg-"></div>
            <img class="img-fluid w-100" :src="require(`@/assets/user/img/${product.image}`)" @click="goToProductInfo(product.prdt_cd)"> 
          <div class="product-overlay">
            <ul class="mb-0 list-inline">
              <li class="list-inline-item m-0 p-0">
                <a class="btn btn-sm btn-dark" href="cart.html">장바구니</a>
              </li>
              <li class="list-inline-item mr-0">
                <a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal">
                  <i class="fas fa-expand"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <h6><a class="reset-anchor" href="#" @click="goToProductInfo(product.prdt_cd)">{{ product.prdt_name }}</a></h6>
        <p class="small text-muted">{{ product.price }}</p>
        <p class="small text-muted">{{ product.sale_price }}</p>
      </div>
    </div>
    <!-- PRODUCT-->

  </div>
</template>
<script>
import axios from 'axios';
//./../assets/user/img/{{ product.image }}
  export default {

    data() {
      return {
        productList : []
      }
    },
    created() {
      let large_code = this.$route.query.large_code;
      let small_code = this.$route.query.small_code;
      console.log('created: ' + large_code);
      console.log('created: ' + small_code);
      this.getProductList(large_code, small_code);
    },
    mounted() {

    },
    methods : {
      // 카테고리별 상품 목록
      async getProductList(large, small){
          console.log(large, small);
          let result = await axios.get(`/api/product?large_code=${large}&small_code=${small}`);
          console.log(result);
          this.productList = result.data;
          // console.log(this.productList);
      },
      // 개별 상품 정보 페이지로 이동
      goToProductInfo(prdt_cd){
        this.$router.push({ path : 'productInfo', query : { 'prdt_cd' : prdt_cd }})
      }
    }
    
  }
</script>
