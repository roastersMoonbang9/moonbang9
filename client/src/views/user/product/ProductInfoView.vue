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
              <!-- 캐러셀 -->
                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                  </div>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img :src="require('@/assets/user/img/' + getRealImage1)" class="d-block w-100" alt="...">
                    </div>
                    <div v-for="(path, idx) in imagePath" v-bind:key="idx" class="carousel-item" >
                      <img :src="getRealPath" class="d-block w-100" alt="...">
                    </div>
                    <!-- <div class="carousel-item">
                      <img src="img/product-detail-1.jpg" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                      <img src="img/product-detail-1.jpg" class="d-block w-100" alt="...">
                    </div> -->
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                  </button>
                </div>


              
            </div>
            
            <ProductInfo @send-image="getImage1" />

          </div>
          <ProductReview />
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
        </div>
      </section>

    </div>
    
</template>
<script>
import axios from 'axios';
import ProductInfo from '@/components/ProductInfo.vue';
import ProductReview from '@/components/ProductReview.vue';

export default  {
  components : {
    ProductInfo,
    ProductReview
  },
  data() {
    return {
      image1 : 'moonbang9_logo.png', //메인 사진 받아오지 못할때 기본으로 뜨는 로고 파일명
      // imageList : [],
      imagePath : []
    }
  },
  created() {
    let cd = this.$route.query.prdt_cd
    this.getImages(cd);
  },
  computed : {
    getRealImage1() {
      return this.image1; // image1 바뀐것 감지해서 사진 다시 로드
    },
    getRealPath(){
      return this.imagePath;
    }
  },
  methods: {
    getImage1(data){
      console.log('자식으로부터 받은 상품 대표이미지 파일명 : '+ data);
      this.image1 = data; //ProductInfo.vue로부터 image1 파일명 받아오고 나면 감지해서 파일명 교체
    },
    async getImages(cd) {
        let result = await axios.get("/api/product//productImages/" + cd);
        let imageList = [];
        imageList = result.data;
        
        imageList.forEach(ele => {
          console.log(ele.file_path);
          let path = ele.file_path + ele.file_name + '.' + ele.file_extn;
          console.log(path);
          this.imagePath.push(path);
        });
        console.log('imagePath : ' + this.imagePath)
        
      }
  },
}
</script>