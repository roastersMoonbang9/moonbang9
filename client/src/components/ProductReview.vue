<template>
    <!-- 리뷰 컴포넌트-->
    <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab" >
      <div class="p-4 p-lg-5 bg-white">
                        <div class="row" :key="i" v-for="(review, i) in reviewInfo">
          <div class="col-lg-8">
            <div class="d-flex mb-3">
              
            </div>
            <div class="d-flex">
              <div class="flex-shrink-0"><img class="rounded-circle" src="../assets/moon2.png" alt="" width="50"/></div>
              <div class="ms-3 flex-shrink-1" 
                      @click="goToDetail(review.rv_no)">
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
this.getReviewInfo(this.$route.query.prdt_cd);
},
methods : {
async getReviewInfo(){
    let result = await axios.get('/api/product/review/'+ this.reviewInfo.rv_no)
                           .catch(err => console.log(err));
    this.reviewInfo = result.data;
    console.log(result);

}
//상세목록에서 출력해줘야할것
// goToDetail(pno){
//       this.$router.push({ path : '/boardInfo', query : { 'productNo' : pno}});
// }

},
}
</script>