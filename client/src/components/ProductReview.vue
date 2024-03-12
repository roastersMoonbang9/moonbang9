<template>
  <!-- 리뷰 컴포넌트-->
  
    <div class="p-4 p-lg-5 bg-white">
      <!-- 정렬 -->
      <div class="mb-3">
        <label for="sortSelect" class="form-label">정렬기준:</label>
        <select v-model="sortBy" @change="updateSort" class="form-select form-select-sm" id="sortSelect" >
          <option value="date">최근 등록순</option>
          <option value="rating">별점 높은순</option>
        </select>
      </div>
      <div class="row" :key="i" v-for="(review, i) in sortedReviewInfo">
        <div class="col-lg-8">
          <div class="d-flex mb-3">

          </div>
          <div class="d-flex">
            <div class="flex-shrink-0"><img class="rounded-circle" src="../assets/moon2.png" alt="" width="50" /></div>
            <div class="ms-3 flex-shrink-1" @click="goToDetail(review.rv_no)">
              <h6 class="mb-0 text-uppercase">{{ hideId(review.id) }}</h6>
              <p class="small text-muted mb-0 text-uppercase">{{ dateFomat(review.rv_dt) }}</p>
              <ul v-if="review.rating == 5" class="list-inline mb-1 text-xs" >
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning" ></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
              </ul>
              <ul v-else-if="review.rating == 4" class="list-inline mb-1 text-xs" >
                <li class="list-inline-item m-0" ><i class="fas fa-star text-warning" ></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
              </ul>
              <ul v-else-if="review.rating == 3" class="list-inline mb-1 text-xs" >
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning" ></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
              </ul>
              <ul v-else-if="review.rating == 2" class="list-inline mb-1 text-xs" >
                <li class="list-inline-item m-0" ><i class="fas fa-star text-warning" ></i></li>
                <li class="list-inline-item m-0"><i class="fas fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
              </ul>
              <ul v-else-if="review.rating == 1" class="list-inline mb-1 text-xs" >
                <li class="list-inline-item m-0" ><i class="fas fa-star text-warning" ></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
                <li class="list-inline-item m-0"><i class="far fa-star text-warning"></i></li>
              </ul>
              <p class="text-sm mb-0 text-muted">{{ review.content }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>
<script>
import axios from 'axios';
export default {
  props: {
    prdt_cd: {
      type: String,
      required: true,
    },
  },
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
    queryOpen : true,
    sortBy: 'date',
    sortDir: 'desc' //내림차순
};
},
created(){
let cd = this.$route.query.prdt_cd;
this.getReviewInfo(cd);
},
computed:{
sortedReviewInfo(){
  let sortedList = [...this.reviewInfo]; //리뷰목록 복사 새로운 배열 만들기

  if(this.sortBy === 'date'){
    sortedList.sort((a,b)=>
      this.sortDir === 'desc' ? new Date(b.rv_dt) - new Date(a.rv_dt) : new Date(a.rv_dt) - new Date(b.rv_dt) 
      );
  }else if(this.sortBy === 'rating'){
      sortedList.sort((a,b)=> (this.sortDir === 'desc' ? b.rating - a.rating : a.rating - b.rating));

      }
      return sortedList;
    },
    hideId(){
      return (id) => {
        if (id && id.length >= 3) {
          // 3개만 보여주고 나머지 가리기
          return id.substring(0, 3) + '***';
        } else {
          return id;
        }
      };
    },
  },
methods : {
  dateFomat(date){
                let date1 = new Date(date);
                const year = date1.getFullYear();
                const month = ('0' + (date1.getMonth() + 1)).slice(-2);
                const day = ('0' + date1.getDate()).slice(-2);
                const dateStr = `${year}-${month}-${day}`;
                return dateStr;
            },
async getReviewInfo(prdt_cd){
    let result = await axios.get('/api/product/reviewList/'+ prdt_cd)
                           .catch(err => console.log(err));
    this.reviewInfo = result.data;
    console.log(result);

},
goToDetail(){

}
//상세목록에서 출력해줘야할것
// goToDetail(pno){
//       this.$router.push({ path : '/boardInfo', query : { 'productNo' : pno}});
// }

},
}
</script>