<template>
    <!-- DETAILS TABS-->
    <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
            <li class="nav-item"><a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">Description</a></li>
            <li class="nav-item"><a class="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">Reviews</a></li>
          </ul>
          <div class="tab-content mb-5" id="myTabContent">
            <div class="tab-pane fade show active" id="description" role="tabpanel" aria-labelledby="description-tab">
              <div class="p-4 p-lg-5 bg-white">
                <h6 class="text-uppercase">Product description </h6>
                <p class="text-muted text-sm mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
            </div>
            <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
              <div class="p-4 p-lg-5 bg-white">
                <div class="row">
                  <div class="col-lg-8">
                    <div class="d-flex mb-3">
                      <div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-1.png" alt="" width="50"/></div>
                      <div class="ms-3 flex-shrink-1">
                        <h6 class="mb-0 text-uppercase">Jason Doe</h6>
                        <p class="small text-muted mb-0 text-uppercase">20 May 2020</p>
                        <ul class="list-inline mb-1 text-xs">
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                        </ul>
                        <p class="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-2.png" alt="" width="50"/></div>
                      <div class="ms-3 flex-shrink-1">
                        <h6 class="mb-0 text-uppercase">Jane Doe</h6>
                        <p class="small text-muted mb-0 text-uppercase">20 May 2020</p>
                        <ul class="list-inline mb-1 text-xs">
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                          <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                        </ul>
                        <p class="text-sm mb-0 text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <!--해당 게시글이 댓글이 있다면-->
            <!-- 이거 수정해서 상품 리뷰목록 출력하기 -->
            <CommentList v-if="boardInfo.comment > 0" 
                v-bind:bno="boardInfo.no" /> <!--등록 후 컴포넌트로 등록해주면 됨-->
            <!--해당 게시글에 댓글이 존재하지 않는다면. v-if사이에는 아무런 태그 없어야함. 중간에 연결이 되지 않으면 에러남-->
            <div v-else class="card text-center">
                댓글 없음
            </div>
        </div>
</template>
<!-- <script>
import axios from 'axios'
   export default {
   data () {
     return {
       reviewList : [],
     }
   },
   created() {
     this.getReviewList(); // 비동기작업
   },
   methods : {
     async getReviewList() { // 동기작업
       let result = await axios.get('/api/product/review')
                               .catch(err => console.log(err));
       this.reviewList = result.data;
     }
   }
 }
 </script>-->
<script>
 import axios from 'axios'
 import CommentList from '../components/CommentList.vue';
 
 export default {
     data() {
         return {
             boardInfo: {
                 no : null,
                 title : '',
                 writer : '',
                 content : '',
                 created_date : null,
                 updated_date : null,
                 comment : 0
             }
         };
     },
     components: { //import 후 components에 등록 해줘야 인식됨 
         CommentList
     },
     created() {
         let searchNo = this.$route.query.boardNo;
         this.getBoardInfo(searchNo);
     },
     methods: {
         async getBoardInfo(no) {
              let result = await axios.get("/api/boards/" + no)
                                 .catch(err => console.log(err));
              this.boardInfo = result.data;      
         },
         getDateFormat(date) {
             let dateValue = date == null ? new Date() : new Date(date);
             let year = dateValue.getFullYear();
             let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
             let day = ('0' + dateValue.getDate()).slice(-2);
             return `${year}-${month}-${day}`;
         },
         goToUpdateForm(no) {
           this.$router.push({ path : '/boardForm', query : {'boardNo': no}});
         }
     }
 }
 </script>