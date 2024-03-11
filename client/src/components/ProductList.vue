<template>
  <div class="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
                <div class="row mb-3 align-items-center">
                  <div class="col-lg-6 mb-2 mb-lg-0">
                    <p class="text-sm text-muted mb-0">Showing 1–12 of 53 results</p>
                  </div>
                  <div class="col-lg-6">
                    <ul class="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                      <li class="list-inline-item text-muted me-3"><a class="reset-anchor p-0" href="#!"><i class="fas fa-th-large"></i></a></li>
                      <li class="list-inline-item text-muted me-3"><a class="reset-anchor p-0" href="#!"><i class="fas fa-th"></i></a></li>
                      <li class="list-inline-item">

                        <select @change="changeList()" v-model="sort" class="selectpicker" data-customclass="form-control form-control-sm">
                          <option value="regis_dt">신상품순</option>
                          <option value="popular" selected>인기상품순</option>
                          <option value="low_price">낮은가격순</option>
                          <option value="high_price">높은가격순</option>
                          <option value="dc_pct">할인율순</option>
                        </select>

                      </li>
                    </ul>
                  </div>
                </div>
  <div class="row">

    <!-- PRODUCT-->
    <div v-for="(product,idx) in productList" v-bind:key="idx" class="col-lg-4 col-sm-6">
      <div class="product text-center">
        <div class="mb-3 position-relative">
          <div class="badge text-white bg-"></div>
            <img class="img-fluid w-100" v-bind:src="`img/${product.image}`" @click="goToProductInfo(product.prdt_cd)"> 
          <div class="product-overlay">
            <ul class="mb-0 list-inline">
              <li class="list-inline-item m-0 p-0">
                <a class="btn btn-sm btn-dark" href="cart.html">미리보기</a>
              </li>
            </ul>
          </div>
        </div>
        <h6><a class="reset-anchor" href="#" @click="goToProductInfo(product.prdt_cd)">{{ product.prdt_name }}</a></h6>
        <p class="small text-muted">{{ product.price }} 원</p>
        <p class="small text-muted">{{ product.sale_price }}</p>
      </div>
    </div>
    <Paging 
        :pagination="pagination"
        v-on:prevPage="prevPage"
        v-on:nextPage="nextPage"
        v-on:firstPage="firstPage"
        v-on:lastPaging="lastPaging"
        v-on:changeNowPage="changeNowPage"/>
    
    <!-- PRODUCT-->

  </div>
  
</div>
</template>
<script>
import axios from 'axios';
import Paging from '@/components/PagingComponent.vue';
//./../assets/user/img/{{ product.image }}
  export default {
    components : {
      Paging
    },
    data() {
      return {
        productList : [],
        sort: 'popular', //null할지 ''할지 다시 생각

        paging : [],
        pagination : {},
        allSize : 0,  // 모든 데이터 수
        pageSize : 12, // 한 페이지에서 보여줄 데이터 수
        navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
        lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
        curPage : 1,  // 현재 페이지
        startPage : 1,  // 페이지네이션 시작번호
        endPage : 1,  // 페이지네이션 끝번호
      }
    },
    created() {
      let large_code = this.$route.query.large_code;
      let small_code = this.$route.query.small_code;
      console.log('created: ' + large_code);
      console.log('created: ' + small_code);
      this.getTableList(this.curPage, large_code, small_code, this.sort);
      
    },
    computed : {

    },

    methods : {
    
      // 카테고리별 상품 목록
      // async getProductList(large, small){
      //     console.log(large, small);
      //     let result = await axios.get(`/api/product?large_code=${large}&small_code=${small}`);
      //     console.log(result);
      //     this.productList = result.data;
      //     // console.log(this.productList);
      // },
      // 개별 상품 정보 페이지로 이동
      goToProductInfo(prdt_cd){
        this.$router.push({ path : 'productInfo', query : { 'prdt_cd' : prdt_cd }})
      },
    
      changeList(){
        this.getTableList(this.curPage, this.$route.query.large_code, this.$route.query.small_code, this.sort);
      },
    
      async getTableList(curPage, large, small, order) {
                curPage = this.judgePage(curPage);
                if (!curPage || curPage <= 0) 
                curPage = this.startPage;
                let gap = curPage%this.navSize === 0 ?  this.navSize - 1 : curPage%this.navSize - 1;
                this.startPage = this.judgePage(curPage - gap);
                this.endPage = this.startPage + this.navSize - 1;
                await this.getTableCount(large, small);

                this.curPage = curPage;
                let data = {
                    param : {
                        limit : this.pageSize,
                        offset : (curPage - 1) * this.pageSize,
                        
                       
   
                        large_code : large,
                        small_code : small,
                        order : order
                    }
                }
                let result = await axios.post("/api/product", data)
                                        .catch(err => console.log(err));
                console.log(result);
                this.productList = result.data;
                console.log(this.productList[0].image);
            },
      async getTableCount(large, small) {
          let data = {
              param : {
                large_code : large,
                  small_code : small
              }
          }
          let result = await axios.post(`/api/product/productCount`, data) 
                                  .catch(err => console.log(err));
          this.allSize = result.data[0].count;
          this.lastPage = Math.ceil(this.allSize / this.pageSize);
          this.pagination = {
                          lastPage : this.lastPage, 
                          startPage : this.startPage, 
                          endPage : this.endPage, 
                          curPage : this.curPage
                          }
      },
      judgePage(page) {
          if (!page || page <= 0) 
          page = 1
          else if (page > this.lastPage) 
          page = this.lastPage
          return page
      },

      // 페이징
      prevPage(){
          this.getTableList(--this.curPage);
      },

      nextPage(){
          this.getTableList(++this.curPage);
      },

      firstPage(){
          this.curPage = 1;
          this.getTableList(this.curPage);
      },

      lastPaging(){
          this.curPage = this.lastPage;
          this.getTableList(this.curPage);
          
      },
      
      changeNowPage(page){
          this.curPage = page
          this.getTableList(this.curPage);
      }
    }    
  }
</script>
