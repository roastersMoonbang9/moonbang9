<template>
  <!-- DETAILS TABS-->
  <ul class="nav nav-tabs border-0" id="myTab" role="tablist">
    <li class="nav-item"><a class="nav-link text-uppercase active" id="description-tab" data-bs-toggle="tab" href="#description" role="tab" aria-controls="description" aria-selected="true">상품 상세</a></li>
    <li class="nav-item"><a class="nav-link text-uppercase" id="reviews-tab" data-bs-toggle="tab" href="#reviews" role="tab" aria-controls="reviews" aria-selected="false">상품 후기</a></li>
    <li class="nav-item"><a class="nav-link text-uppercase" id="query-tab" data-bs-toggle="tab" href="#query" role="tab" aria-controls="query" aria-selected="false">상품 문의</a></li>
  </ul>
  <div class="tab-content mb-5" id="myTabContent">
    <div class="tab-pane fade show active" id ="productQuery" role="tabpanel" aria-labelledby="description-tab" v-if="queryOpen">
      <div class="p-4 p-lg-5 bg-white" >
        <!-- 상품 문의 컴포넌트-->
        <h6 class="text-uppercase">상품문의(이지만 리뷰 테스트중) </h6>
        <table class="table table-hover">
    <tbody>
        <tr :key="i" v-for="(review, i) in reviewInfo"
                      @click="goToDetail(review.no)">
            <td>{{ review.rv_no }}</td>
            <td>{{ review.content }}</td>
            <td>{{ review.rv_dt }}</td>
            <td>{{ review.id }}</td>
        </tr>
    </tbody>
</table>
      </div>
    </div>
    <!-- 리뷰 컴포넌트-->
    <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab" v-if="reviewOpen">
      <div class="p-4 p-lg-5 bg-white">
                        <div class="row">
          <div class="col-lg-8">
            <div class="d-flex mb-3">
              
            </div>
            <div class="d-flex">
              <div class="flex-shrink-0"><img class="rounded-circle" src="img/customer-2.png" alt="" width="50"/></div>
              <div class="ms-3 flex-shrink-1" :key="i" v-for="(review, i) in reviewInfo"
                      @click="goToDetail(review.no)">
                <h6 class="mb-0 text-uppercase">{{ review.id }}</h6>
                <p class="small text-muted mb-0 text-uppercase">{{ review.rv_dt }}</p>
                <ul class="list-inline mb-1 text-xs">
                  <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                  <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                  <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                  <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                  <li class="list-inline-item m-0"><i class="fas fa-star-half-alt text-warning"></i></li>
                </ul>
                <p class="text-sm mb-0 text-muted">{{ review.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
data(){
return {
    reviewInfo : [],
        // rv_no: '',
        // content: '',
        // rating: '',
        // prdt_cd: '',
        // id: '',
        // ord_no: ''
    
    reviewOpen : true,
    queryOpen : true
};
},
created(){
//let cd = this.$route.query.prdt_cd;
//this.getProductOptions(cd);
this.getReviewInfo('CB00001');
},
methods : {
async getReviewInfo(cd){
  console.log(cd);
    let result = await axios.get('/api/product/review/'+ cd)
                           .catch(err => console.log(err));
    this.reviewInfo = result.data;
    console.log(result);

},
getDateFormat(date){
    let dateValue = new Date(date);
    let year = dateValue.getFullYear();
    let month = ('0' + (dateValue.getMonth() + 1)).slice(-2);
    let day = ('0' + dateValue.getDate()).slice(-2);
    return `${year}년${month}월${day}`;
},
//상세목록에서 출력해줘야할것
// goToDetail(pno){
//       this.$router.push({ path : '/boardInfo', query : { 'productNo' : pno}});
// }
reviewOpenTF(){
if(this.reviewOpen == true){
  this.queryOpen = false;
}
},
queryOpenTF(){
if(this.queryOpen == true){
  this.reviewOpen = false;
}
},
}
}
</script>