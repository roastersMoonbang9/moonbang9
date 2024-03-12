<template>
  <div>
<head>
<link rel="stylesheet" href="vendor/swiper/swiper-bundle.min.css">
</head>


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
          
          <ProductInfo @send-detail="sendDetail"/>

<!-- DETAILS TABS-->

        </div>
          <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
        
          <li class="nav-item">
            <a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">상품 상세</a>
          </li>
            
          <li class="nav-item">
            <a class="nav-link text-uppercase" id="description-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="description" aria-selected="false">상품 후기</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-uppercase " id="reviews-tab" data-bs-toggle="tab" href="#query" role="tab" aria-controls="reviews" aria-selected="true">상품 관련 문의</a>
          </li>
        </ul>
        


        <div class="tab-content">



          <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
              <div class="p-4 p-lg-5 bg-white">
                <h6 class="text-uppercase">상품 설명</h6>
                <p class="text-muted text-sm mb-0" style="font-size: 13px;">{{this.p_detail}}</p>
              </div>
          </div>



          <div class="tab-pane show"  id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
            <ProductReview :prdt_cd="prdt_cd" />
          </div>
          <div class="tab-pane " id="query" role="tabpanel" aria-labelledby="query-tab">
            <ProductQuery :prdt_cd="prdt_cd" />
          </div>
        </div>
        </div>
        
        
        <!-- RELATED PRODUCTS-->
        <!-- <h2 class="h5 text-uppercase mb-4">카테고리 인기상품</h2>
        <div class="row"> -->

          <!-- PRODUCT-->
          <!-- <div class="col-lg-3 col-sm-6">
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
        </div> -->

     
      
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
      p_detail : '', // 상품 설명 받아오지 못할때 기본으로 뜨는 내용

      image1 : '',
      image2 : '',
      image3 : '',
      image4 : '',
      prdt_cd:'',

      show: 'A'
    }
  },
  created() {
    let cd = this.$route.query.prdt_cd;
    this.getImages(cd);
  },
  computed : {
    getRealDetail(){
      return this.p_detail;
    }
    // getRealImage1() {
    //   return this.image1; // image1 바뀐것 감지해서 사진 다시 로드
    // },  
    // getRealPath(){
    //   return this.imagePath;
    // }
  },
  methods: {
    sendDetail(data){
      this.p_detail = data;
      console.log('상세설명' , data);
    },
    // getImage1(data){
    //   console.log('자식으로부터 받은 상품 대표이미지 파일명 : '+ data);
    //   this.image1 = data; //ProductInfo.vue로부터 image1 파일명 받아오고 나면 감지해서 파일명 교체
    // },
    async getImages(cd) { //여기가 문제.....데이터를 제대로 못받아옴?
      console.log('코드 : ' + cd)
      let result = await axios.get("/api/product/productImages/" + cd);
      console.log(result.data);
      
      // this.image1 = '@/assets/user/img/CB00001_02_aibao.jpg'; // + result.data[0].file_path.substring(30)
      this.image1 = 'img/' + result.data[0].file_path.substring(21);
      this.image2 = 'img/' + result.data[1].file_path.substring(21);
      this.image3 = 'img/' + result.data[2].file_path.substring(21);
      this.image4 = 'img/' + result.data[3].file_path.substring(21);
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