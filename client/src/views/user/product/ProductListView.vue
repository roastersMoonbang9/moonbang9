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

      
      <div class="container">
        <!-- HERO SECTION-->
        <section class="py-5 bg-light">
          <div class="container">
            <div class="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div class="col-lg-6">
                <h1 class="h2 text-uppercase mb-0">상품</h1>
              </div>
              <div class="col-lg-6 text-lg-end">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb justify-content-lg-end mb-0 px-0 bg-light">
                    <li class="breadcrumb-item"><a class="text-dark" href="index.html">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Shop</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>
        <section class="py-5">
          <div class="container p-0">
            <div class="row">
              <!-- SHOP SIDEBAR-->
              <div class="col-lg-3 order-2 order-lg-1">
                <h5 class="text-uppercase mb-4">카테고리</h5>
                <!-- <div class="py-2 px-4 bg-dark text-white mb-3"><strong class="small text-uppercase fw-bold"><a class="reset-anchor" href="#!" @click="goToList('A')">다이어리</a></strong></div> -->
                <div class="py-2 px-4 bg-light mb-3"><strong class="small text-uppercase fw-bold"><a class="reset-anchor" href="#!" @click="goToList('A')">다이어리</a></strong></div>
                <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('A', 'A')">다이어리</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('A', 'B')">플래너</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('A', 'C')">달력</a></li>
                </ul>
                <div class="py-2 px-4 bg-light mb-3"><strong class="small text-uppercase fw-bold"><a class="reset-anchor" href="#!" @click="goToList('B')">노트</a></strong></div>
                <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal">
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('B', 'A')">베이직노트</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('B', 'B')">양장노트</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('B', 'C')">스프링노트</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('B', 'D')">수첩</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('B', 'E')">메모지</a></li>
                </ul>
                <div class="py-2 px-4 bg-light mb-3"><strong class="small text-uppercase fw-bold"><a class="reset-anchor" href="#!" @click="goToList('C')">필기류</a></strong></div>
                <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal mb-5">
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('C', 'A')">연필</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('C', 'B')">펜</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('C', 'C')">형광펜</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('C', 'D')">지우개</a></li>
                </ul>
                <div class="py-2 px-4 bg-light mb-3"><strong class="small text-uppercase fw-bold"><a class="reset-anchor" href="#!" @click="goToList('D')">사무용품</a></strong></div>
                <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal mb-5">
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('D', 'A')">복사용지</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('D', 'B')">필통</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('D', 'C')">가위</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('D', 'D')">계산기</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('D', 'E')">풀</a></li>
                </ul>
                <div class="py-2 px-4 bg-light mb-3"><strong class="small text-uppercase fw-bold"><a class="reset-anchor" href="#!" @click="goToList('E')">데코레이션</a></strong></div>
                <ul class="list-unstyled small text-muted ps-lg-4 font-weight-normal mb-5">
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('E', 'A')">스티커</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('E', 'B')">스탬프</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('E', 'C')">테이프</a></li>
                  <li class="mb-2"><a class="reset-anchor" href="#!" @click="goToList('E', 'D')">포스터</a></li>
                </ul>
                
              </div>
              <!-- SHOP LISTING-->
              

                <ProductList />

               
            </div>
          </div>
        </section>
      </div>
      </div>
</template>
<script>
import ProductList from '../../../components/ProductList.vue'

    export default{
      components: {
          ProductList
      },
      data() {
          return {
            sort : null //order기준 전달
            /* where : searched,large_code,small_code, 등록일, 수정일
               order : 신상품순,높은가격,낮은가격,할인율순,인기상품순(default) */
          };
      },
      methods : {
        goToList(large, small) {
        this.large_code = large;
        this.small_code = small;
        this.$router.push({ path : '/product', query : { 'large_code' : this.large_code , 'small_code' : this.small_code }})
      },
      }
    }
</script>
