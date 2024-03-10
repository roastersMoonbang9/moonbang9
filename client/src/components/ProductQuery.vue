<template>
        <div class="tab-pane fade show active" id ="productQuery" role="tabpanel" aria-labelledby="description-tab" v-if="queryOpen">
      <div class="p-4 p-lg-5 bg-white" >
        <!-- 상품 문의 컴포넌트-->
        <h6 class="text-uppercase">상품문의 </h6>
        <table class="table table-hover">
    <tbody>
        <tr :key="i" v-for="(query, i) in queryList">
            <td>{{ query.title }}</td>
            <td>{{ query.content }}</td>
            <td>{{ query.qst_dt }}</td>
            <td>{{ query.id }}</td>
        </tr>
    </tbody>
</table>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
data(){
return {
    queryList : [],

};
},
created(){
this.getQueryList();
},
methods : {
async getQueryList(){
  console.log(cd);
    let result = await axios.get('/api/product/query/' +qst_no)
                           .catch(err => console.log(err));
    this.queryList = result.data;
    console.log(result);

},
//상세목록에서 출력해줘야할것
// goToDetail(pno){
//       this.$router.push({ path : '/boardInfo', query : { 'productNo' : pno}});
// }

},
}
</script>