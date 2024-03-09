<template>
    <div>

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
                    <div class="swiper-wrapper">
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100" :src="getImage1(data)" alt="..."></div>
                      <!-- <div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100" src="img/product-detail-1.jpg" alt="..."></div> -->
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100" src="img/product-detail-2.jpg" alt="..."></div>
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100" src="img/product-detail-3.jpg" alt="..."></div>
                      <div class="swiper-slide h-auto swiper-thumb-item mb-3"><img class="w-100" src="img/product-detail-4.jpg" alt="..."></div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-10 order-1 order-sm-2">
                  <div class="swiper product-slider">
                    <div class="swiper-wrapper">
                      <div class="swiper-slide h-auto"><a class="glightbox product-view" href="img/product-detail-1.jpg" data-gallery="gallery2" data-glightbox="Product item 1"><img class="img-fluid" src="img/product-detail-1.jpg" alt="..."></a></div>
                      <div class="swiper-slide h-auto"><a class="glightbox product-view" href="img/product-detail-2.jpg" data-gallery="gallery2" data-glightbox="Product item 2"><img class="img-fluid" src="img/product-detail-2.jpg" alt="..."></a></div>
                      <div class="swiper-slide h-auto"><a class="glightbox product-view" href="img/product-detail-3.jpg" data-gallery="gallery2" data-glightbox="Product item 3"><img class="img-fluid" src="img/product-detail-3.jpg" alt="..."></a></div>
                      <div class="swiper-slide h-auto"><a class="glightbox product-view" href="img/product-detail-4.jpg" data-gallery="gallery2" data-glightbox="Product item 4"><img class="img-fluid" src="img/product-detail-4.jpg" alt="..."></a></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ProductInfo />
            <ProductInfo @send-image="getImage1" />

          </div>
          <!-- DETAILS TABS-->
  <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
    <li class="nav-item"><a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">상품 상세</a></li>
    <li class="nav-item"><a class="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">상품 후기</a></li>
    <li class="nav-item"><a class="nav-link text-uppercase" id="query-tab" data-bs-toggle="tab" href="#query" role="tab" aria-controls="query" aria-selected="false">상품 문의</a></li>
  </ul>
  <div class="tab-content mb-5" id="myTabContent">
          <ProductReview />
          <ProductQuery />
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
        </div>
      </section>

    </div>
    
</template>
<script>
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
      image1 : null,
    }
  },
  // created() {
  //   this.getImage1();
  // },
  watch : {
    
  }, 
  methods: {
    getImage1(data) {
      console.log('자식으로부터 받은 상품 대표이미지 파일명 : '+ data);
      this.image1 = data;
      console.log(this.image1);
      try {
        return require('@/assets/user/img/' + image1);
      } catch (error) {
        return require('@/assets/logo.png');
      }
    },

    // getSrcPath(key) {
    //   const normalizedKey = key.trim().toLowerCase().replaceAll(' ', '');
    //   try {
    //     return require('@/assets/img/main/contextmenu-' + normalizedKey + '.svg');
    //   } catch (error) {
    //     return require('@/assets/img/main/placeholder.svg');
    //   }
    // },
    handleImageError(event) {
      event.target.src = require('@/assets/logo.png');
    },
  }
}
</script>
