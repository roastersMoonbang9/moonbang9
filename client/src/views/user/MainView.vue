<template>
    <div>
        <!-- navbar-->

      <!--  Modal -->
      <div class="modal fade" id="productView" tabindex="-1">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content overflow-hidden border-0">
            <button class="btn-close p-4 position-absolute top-0 end-0 z-index-20 shadow-0" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body p-0">
              <div class="row align-items-stretch">
                <div class="col-lg-6 p-lg-0"><a class="glightbox product-view d-block h-100 bg-cover bg-center" style="background: url(img/product-5.jpg)" href="img/product-5.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a class="glightbox d-none" href="img/product-5-alt-1.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a><a class="glightbox d-none" href="img/product-5-alt-2.jpg" data-gallery="gallery1" data-glightbox="Red digital smartwatch"></a></div>
                <div class="col-lg-6">
                  <div class="p-4 my-md-4">
                    <ul class="list-inline mb-2">
                      <li class="list-inline-item m-0"><i class="fas fa-star small text-warning"></i></li>
                      <li class="list-inline-item m-0 1"><i class="fas fa-star small text-warning"></i></li>
                      <li class="list-inline-item m-0 2"><i class="fas fa-star small text-warning"></i></li>
                      <li class="list-inline-item m-0 3"><i class="fas fa-star small text-warning"></i></li>
                      <li class="list-inline-item m-0 4"><i class="fas fa-star small text-warning"></i></li>
                    </ul>
                    <h2 class="h4">Red digital smartwatch</h2>
                    <p class="text-muted">$250</p>
                    <p class="text-sm mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p>
                    <div class="row align-items-stretch mb-4 gx-0">
                      <div class="col-sm-7">
                        <div class="border d-flex align-items-center justify-content-between py-1 px-3"><span class="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                          <div class="quantity">
                            <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                            <input class="form-control border-0 shadow-0 p-0" type="text" value="1">
                            <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-5"><a class="btn btn-dark btn-sm w-100 h-100 d-flex align-items-center justify-content-center px-0" href="cart.html">Add to cart</a></div>
                    </div><a class="btn btn-link text-dark text-decoration-none p-0" href="#!"><i class="far fa-heart me-2"></i>Add to wish list</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- HERO SECTION-->
      <div class="container">
        <section class="hero pb-3 bg-cover bg-center d-flex align-items-center" style="background: url(img/mainbanner.png)">
          <div class="container py-5">
            <div class="row px-4 px-lg-5">
              <div class="col-lg-6">
                <!-- <img v-bind:src="'../img/moon2.png'" alt=""> -->
                <p class="text-muted small text-uppercase mb-2">MOONBANG9 2024</p>
                <h1 class="h2 text-uppercase mb-3"></h1><a class="btn btn-dark" href="#" @click="goToList()">전체 상품 보기</a>
              </div>
            </div>
          </div>
        </section>
        <!-- CATEGORIES SECTION-->
        <section class="pt-5">
          <header class="text-center">
            <p class="small text-muted small text-uppercase mb-1">Carefully created collections</p>
            <h2 class="h5 text-uppercase mb-4">Browse our categories</h2>
          </header>
          <div class="row">
            <div class="col-md-4"><a class="category-item leftRightImage" href="#" @click="goToList('A')"><img class="img-fluid" src="img/main1.jpg" alt=""/><strong class="category-item-title">다이어리</strong></a>
            </div>
            <div class="col-md-4" style="padding-right: 0;"><a class="category-item mb-4 middleImage" href="#" @click="goToList('B')"><img class="img-fluid middleImage" src="img/main2.jpg" alt=""/><strong class="category-item-title">노트</strong></a><a class="category-item" href="#" @click="goToList('C')"><img class="img-fluid middleImage" src="img/main3.jpg" alt=""/><strong class="category-item-title">필기류</strong></a>
            </div>
            <div class="col-md-4" style="padding-left: 0;"><a class="category-item leftRightImage" href="#" @click="goToList('D')" style="position: relative;right: 11px;"><img class="img-fluid" src="img/main4.jpg" alt=""/><strong class="category-item-title">데코레이션</strong></a>
            </div>
          </div>
        </section>

        <!-- TRENDING PRODUCTS-->
        <section class="py-5">
          <header>
            <p class="small text-muted small text-uppercase mb-1">Made the hard way</p>
            <h2 class="h5 text-uppercase mb-4">인기상품</h2>
          </header>
          <div class="row">
            <!-- PRODUCT-->
            <div v-for="(product,idx) in popularList" v-bind:key="idx" class="col-xl-3 col-lg-4 col-sm-6">
              <div class="product text-center">
                <div class="position-relative mb-3">
                  <div class="badge text-white bg-"></div><a class="d-block" href="#" @click="goToProductInfo(product.prdt_cd)"><img class="img-fluid w-100" v-bind:src="`img/${product.image.substring(21)}`" alt="..."></a>
                  <div class="product-overlay">
                    <ul class="mb-0 list-inline">
                      <!-- <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a></li> -->
                      <!-- <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="cart.html">Add to cart</a></li> -->
                      <!-- <li class="list-inline-item me-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li> -->
                    </ul>
                  </div>
                </div>
                <h6> <a class="reset-anchor" href="detail.html">{{ product.prdt_name }}</a></h6>
                <p class="small text-muted">{{product.sale_price}} 원</p>
              </div>
            </div>

          </div>
        </section>

        <!-- SERVICES-->
        <section class="py-5 bg-light">
          <div class="container">
            <div class="row text-center gy-3">
              <div class="col-lg-4">
                <div class="d-inline-block">
                  <div class="d-flex align-items-end">
                    <svg class="svg-icon svg-icon-big svg-icon-light">
                      <use xlink:href="#delivery-time-1"> </use>
                    </svg>
                    <div class="text-start ms-3">
                      <h6 class="text-uppercase mb-1">Free shipping</h6>
                      <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="d-inline-block">
                  <div class="d-flex align-items-end">
                    <svg class="svg-icon svg-icon-big svg-icon-light">
                      <use xlink:href="#helpline-24h-1"> </use>
                    </svg>
                    <div class="text-start ms-3">
                      <h6 class="text-uppercase mb-1">24 x 7 service</h6>
                      <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="d-inline-block">
                  <div class="d-flex align-items-end">
                    <svg class="svg-icon svg-icon-big svg-icon-light">
                      <use xlink:href="#label-tag-1"> </use>
                    </svg>
                    <div class="text-start ms-3">
                      <h6 class="text-uppercase mb-1">Yedam offers</h6>
                      <p class="text-sm mb-0 text-muted">Free shipping worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            popularList : [],
            large_code : null
        }
    },
    created() {
      let large_code = this.$route.query.large_code;
      console.log('created: ' , large_code);
      this.getPopularProduct(8);
    },
    methods : {
      goToList(large) {
        this.large_code = large;
        this.$router.push({ path : '/product', query : { 'large_code' : this.large_code }})
      },
      async getPopularProduct(limit){
        let data = {
          param : {
              limit : limit
          }
        }
          console.log(limit);
          let result = await axios.post(`/api/product`, data);
          console.log(result);
          this.popularList = result.data;

          console.log('이미지는 ' , this.popularList);
      },
      goToProductInfo(prdt_cd){
        this.$router.push({ path : 'productInfo', query : { 'prdt_cd' : prdt_cd }})
      }
    }
}
</script>
<style>
.leftRightImage {
  width : 413px;
  height: 578px;
  object-fit: cover;
}
.middleImage {
  width : 390px;
  height: 195px;
  object-fit: cover;
}
</style>