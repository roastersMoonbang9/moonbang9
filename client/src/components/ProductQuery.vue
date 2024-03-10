<template>
  <div>
  <button @click="clickQueryForm" class="btn btn-primary mb-3">문의하기</button>
       <!-- 문의 등록 -->
    <div v-if="queryFormShow">
      <form @submit.prevent="submitQuery">
        <div class="mb-3">
          <label for="queryTitle" class="form-label">제목</label>
          <input v-model="newQuery.title" type="text" class="form-control" id="queryTitle" required>
        </div>
        <div class="mb-3">
          <label for="queryContent" class="form-label">내용</label>
          <textarea v-model="newQuery.content" class="form-control" id="queryContent" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">등록</button>
        <button type="button" @click="cancelQuery" class="btn btn-danger">취소</button>
      </form>
    </div>
    
  <!--문의 목록-->
  <div class="tab-pane fade show active" id ="productQuery" role="tabpanel" aria-labelledby="description-tab" v-if="queryOpen">
      <div class="p-4 p-lg-5 bg-white" >
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
    queryList : [],
    queryForm: false,
    newQuery: {
      qst_no:'',
      title: '',
      content:'',
      id:'',
      qst_dt: '',
      status: '', //답변이 없기 때문에
      prdt_cd: ''

    }

};
},
created(){
this.getQueryList();
},
methods : {
async getQueryList(){
    let result = await axios.get('/api/product/queryList/' +this.prdt_cd)
                           .catch(err => console.log(err));
    this.queryList = result.data;
    console.log(result);

},
clickQueryForm(){
  this.queryFormShow = ! this.queryFormShow;
},
async submitQuery(){
  let data = {
    param:{
  qst_cd : this.queryList[0].qst_cd +1,
  title : this.newQuery.title,
  content : this.newQuery.content,
  id : this.$store.state.userStore.id,
  status : 0,
  prdt_cd : this.prdt_cd,
    }
  }
  let result = await axios.post('/api/product/addQuery/',data)
                           .catch(err => console.log(err));
    this.newQuery = result.data;
    console.log(result);

    this.newQuery = {
  title: '',
  content: '',
};
this.queryFormShow = false; //저장 후 목록 이동
},

//상세목록에서 출력해줘야할것
// goToDetail(pno){
//       this.$router.push({ path : '/boardInfo', query : { 'productNo' : pno}});
// }

},
}
</script>