<template>
                <div class="row">
                  <!-- PRODUCT-->
                  <div v-for="product in productList" v-bind:key="product.prdt_cd" class="col-lg-4 col-sm-6">
                    <div class="product text-center">
                      <div class="mb-3 position-relative">
                        <div class="badge text-white bg-"></div><a class="d-block" href="detail.html"><img class="img-fluid w-100" src="img/product-1.jpg" alt="..."></a>
                        <div class="product-overlay">
                          <ul class="mb-0 list-inline">
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a></li>
                            <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="cart.html">Add to cart</a></li>
                            <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                          </ul>
                        </div>
                      </div>
                      <h6> <a class="reset-anchor" href="detail.html">{{ product.prdt_cd }}</a></h6>
                      <p class="small text-muted">{{ product.price }}</p>
                      <p class="small text-muted">{{ product.sale_price }}</p>
                    </div>
                  </div>
                  <!-- PRODUCT-->
                </div>
</template>
<script>
import axios from 'axios';

  export default {

    data() {
      productList : [];
    },
    created() {
      let cate = this.$route.query.category;
      console.log(cate);
      this.getProductList(cate);
      },
    mounted() {

    },
    methods : {
        async getProductList(cate){
            console.log(cate);
            let result = await axios.get('/api/product/popular/'+cate)
                                    .catch(err => console.log(err));
            console.log(result);
            this.productList = result.data;
        }
    }        
    
  }
</script>
