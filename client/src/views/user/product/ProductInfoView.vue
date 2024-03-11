<template>
  <div>
<head>
<link rel="stylesheet" href="vendor/swiper/swiper-bundle.min.css">
</head>
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

    <section class="py-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-6">



            <!-- PRODUCT SLIDER-->
            <div class="row m-sm-0">
                <div class="col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0 px-xl-2">
                  <div class="swiper product-slider-thumbs">
                    <div class="swiper-wrapper" style="flex-direction: column">
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3">
                        <!-- <img class="w-100" :src="require('@/assets/user/img/' + getRealImage1)" alt="..."> -->
                        <!-- <img class="w-100" :src="require('@/assets/user/img/' + getRealImage1)" alt="..."> -->
                      </div>

                      <!-- <div v-for="(idx, path) in imagePath" v-bind:key="idx" class="swiper-slide h-auto swiper-thumb-item mb-3">
                        <img class="w-100" :src="require(`${path.file_path}\${path.file_name}.\${file_extn}`)" alt="...">
                      </div> -->
                      <!-- <div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100" :src="require(imageTest.test)" alt="..."></div> -->
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3" @click="showImage('A')"><img class="w-100" v-bind:src="image1" alt="..."></div>
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3" @click="showImage('B')"><img class="w-100" v-bind:src="image2" alt="..."></div>
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3" @click="showImage('C')"><img class="w-100" v-bind:src="image3" alt="..."></div>
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3" @click="showImage('D')"><img class="w-100" v-bind:src="image4" alt="..."></div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-10 order-1 order-sm-2">
                  <div class="swiper product-slider">
                    <div class="swiper-wrapper" style="flex-direction: column">
                      <div class="swiper-slide h-auto" v-if="show=='A'"><a class="glightbox product-view" href="img/product-detail-2.jpg" data-gallery="gallery2" data-glightbox="Product item 2"><img class="img-fluid imgSize" v-bind:src="image1" alt="..."></a></div>
                      <div class="swiper-slide h-auto" v-else-if="show=='B'"><a class="glightbox product-view" href="img/product-detail-3.jpg" data-gallery="gallery2" data-glightbox="Product item 3"><img class="img-fluid imgSize" v-bind:src="image2" alt="..."></a></div>
                      <div class="swiper-slide h-auto" v-else-if="show=='C'"><a class="glightbox product-view" href="img/product-detail-4.jpg" data-gallery="gallery2" data-glightbox="Product item 4"><img class="img-fluid imgSize" v-bind:src="image3" alt="..."></a></div>
                      <div class="swiper-slide h-auto" v-else><a class="glightbox product-view" href="img/product-detail-4.jpg" data-gallery="gallery2" data-glightbox="Product item 4"><img class="img-fluid imgSize" v-bind:src="image4" alt="..."></a></div>
                    </div>
                  </div>
                </div>
              </div>


            
          </div>
          
          <ProductInfo />

        </div>
          <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link text-uppercase" id="description-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="description" aria-selected="false">상품 후기</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-uppercase " id="reviews-tab" data-bs-toggle="tab" href="#query" role="tab" aria-controls="reviews" aria-selected="true">상품 관련 문의</a>
          </li>
        </ul>
        
        <div class="tab-content">
          <div class="tab-pane show"  id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
            <ProductReview :prdt_cd="prdt_cd" />
          </div>
          <div class="tab-pane " id="query" role="tabpanel" aria-labelledby="query-tab">
            <ProductQuery :prdt_cd="prdt_cd" />
          </div>
        </div>
        </div>
        <!-- RELATED PRODUCTS-->
        <h2 class="h5 text-uppercase mb-4">카테고리 인기상품</h2>
        <div class="row">

          <!-- PRODUCT-->
          <div class="col-lg-3 col-sm-6">
            <div class="product text-center skel-loader">
              <div class="d-block mb-3 position-relative"><a class="d-block" href="detail.html"><img class="img-fluid w-100" src="img/product-1.jpg" alt="..."></a>
                <div class="product-overlay">
                  <ul class="mb-0 list-inline">
                    <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-outline-dark" href="#!"><i class="far fa-heart"></i></a></li>
                    <li class="list-inline-item m-0 p-0"><a class="btn btn-sm btn-dark" href="#!">Add to cart</a></li>
                    <li class="list-inline-item mr-0"><a class="btn btn-sm btn-outline-dark" href="#productView" data-bs-toggle="modal"><i class="fas fa-expand"></i></a></li>
                  </ul>
                </div>
              </div>
              <h6> <a class="reset-anchor" href="detail.html">Kui Ye Chen’s AirPods</a></h6>
              <p class="small text-muted">$250</p>
            </div>
          </div>
        </div>

     
      
    </section>

  </div>
  
</template>
<script>
import axios from 'axios';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductReview from '@/components/ProductReview.vue';
import ProductQuery from '@/components/ProductQuery.vue';

export default  {
  components : {
    ProductInfo,
    ProductReview,
    ProductQuery
  },
  data() {
    return {
      // image1 : 'moonbang9_logo.png', //메인 사진 받아오지 못할때 기본으로 뜨는 로고 파일명
      image1 : '',
      image2 : '',
      image3 : '',
      image4 : '',

      show: 'A'
    }
  },
  created() {
    let cd = this.$route.query.prdt_cd
    this.getImages(cd);
  },
  // computed : {
  //   getRealImage1() {
  //     return this.image1; // image1 바뀐것 감지해서 사진 다시 로드
  //   },  
  //   getRealPath(){
  //     return this.imagePath;
  //   }
  // },
  methods: {
    // getImage1(data){
    //   console.log('자식으로부터 받은 상품 대표이미지 파일명 : '+ data);
    //   this.image1 = data; //ProductInfo.vue로부터 image1 파일명 받아오고 나면 감지해서 파일명 교체
    // },
    async getImages(cd) { //여기가 문제.....데이터를 제대로 못받아옴?
      console.log('코드 : ' + cd)
      let result = await axios.get("/api/product/productImages/" + cd);
      console.log(result.data);
      
      // this.image1 = '@/assets/user/img/CB00001_02_aibao.jpg'; // + result.data[0].file_path.substring(30)
      this.image1 = 'img/' + result.data[0].file_path.substring(30);
      this.image2 = 'img/' + result.data[1].file_path.substring(30);
      this.image3 = 'img/' + result.data[2].file_path.substring(30);
      this.image4 = 'img/' + result.data[3].file_path.substring(30);
      console.log('사진1 : ' + this.image1);
      
        // this.imagePath = result.data;
        // console.log('이미지패스리스트 : ' + this.imagePath);
        
        // imageList.forEach(ele => {
        //   console.log(ele.file_path);
        //   let path = ele.file_path + ele.file_name + '.' + ele.file_extn;
        //   console.log(path);
        //   let realPath = {path};
        //   this.imagePath.splice(this.imagePath.length, 0, realPath);
        //   console.log(realPath);
        // });
        // console.log('나머지 사진주소 : ' + this.imagePath)
        
      },
      showImage(show){
        this.show = show;
      }
  }
}
</script>

<style>
.imgSize {
  width : 500px;
  height : 500px;
  object-fit: cover;
}
</style>