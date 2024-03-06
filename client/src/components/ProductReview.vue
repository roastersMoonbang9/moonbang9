<template>
  <div class="container">
    <!-- DETAILS TABS-->
    <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
            <li class="nav-item"><a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a></li>
            <li class="nav-item"><a class="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a></li>
          </ul>
          <div class="tab-content mb-5" id="myTabContent">
            <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
              <div class="p-4 p-lg-5 bg-white">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="d-flex" v-for="(review,idx) in reviewList" :key="idx">
                      <div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-2.png" alt="" width="50"/></div>
                      <div class="ms-3 flex-shrink-1">
                        <h6 class="mb-0 text-uppercase">{{review.mem_no}}</h6>
                        <p class="small text-muted mb-0 text-uppercase">{{review.prdt_cd}}</p>
                        <ul class="list-inline mb-1 text-xs">
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                        </ul>
                        <p class="text-sm mb-0 text-muted">{{review.content}}</p>
                        <form action="http://localhost:3000/file" method="post" enctype="multipart/form-data">
                                <input type="file" name="photos" />
                                <input type="submit" value="업로드" /> 
                            </form>  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <!--해당 게시글이 댓글이 있다면-->
            <!-- 이거 수정해서 상품 리뷰목록에서 출력하기 -->
            <reviewList v-if="productInfo.review > 0" 
                v-bind:rno="reviewInfo.no" /> <!--등록 후 컴포넌트로 등록해주면 됨-->
            <!--해당 게시글에 댓글이 존재하지 않는다면. v-if사이에는 아무런 태그 없어야함. 중간에 연결이 되지 않으면 에러남-->
            <div v-else class="card text-center">
                댓글 없음
            </div>
        </div>
      </div>
</template>
 <script>
 //ProductReview.vue
 import axios from 'axios';
 
 export default {
   props : ['rno'], //부모가 넘겨준 데이터를 받기 위해 존재. props는 readonly 수정불가함 수정필요하면 emmit 
   data(){
     return {
       reviewList : []
     }
   },
   created(){
     this.getReviewList();
   },
   methods : {
     async getReviewList() { // 동기작업
       let result = await axios.get(`/api/product/review=${this.rno}`)
                               .catch(err => console.log(err));
       this.reviewList = result.data;
     }
   }
 }
 </script>
 