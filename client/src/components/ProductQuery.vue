<template>
    
   

    <!--문의 목록-->
    
      <div class="p-4 p-lg-5 bg-white" >
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
        <button @click="clickQueryForm()" class="btn btn-outline-secondary mb-3 " >문의하기</button>
      </div>
      <div v-if="queryL">
        <table class="table table-hover">
          <tbody>
            <tr>
              <th>제목</th>
              <th>내용</th>
              <th>등록일</th>
              <th>아이디</th>
              <th></th>
            </tr>
            <tr :key="i" v-for="(query, i) in queryList">
              <td>{{ query.title }}</td>
              <td>{{ query.content }}</td>
              <td>{{ dateFomat(query.qst_dt) }}</td>
              <td>{{ hideId(query.id) }}</td>
              <!-- 아이디 동일할때만 삭세하거나 수정할 수 있도록 -->
              <td v-if="isCurrentUser(query.id)">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button @click="deleteQuery(query.qst_no)" class="btn btn-light btn-sm">삭제</button>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
         <!-- 문의 등록 -->
    <div v-if="queryForm">
      <form @submit.prevent="submitQuery()">
        <div class="mb-3">
          <label for="queryTitle" class="form-label">제목</label>
          <input v-model="newQuery.title" type="text" class="form-control" id="queryTitle" required>
        </div>
        <div class="mb-3">
          <label for="queryContent" class="form-label">내용</label>
          <textarea v-model="newQuery.content" class="form-control" id="queryContent" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-secondary mb-3">등록</button>
        <button type="button" @click="clickQueryForm()" class="btn btn-outline-secondary mb-3">취소</button>
      </form>
    </div>
        <Paging 
        :pagination="pagination"
        v-on:prevPage="prevPage"
        v-on:nextPage="nextPage"
        v-on:firstPage="firstPage"
        v-on:lastPaging="lastPaging"
        v-on:changeNowPage="changeNowPage"/>
      </div>
</template>
<script>
import axios from 'axios';
import Paging from '@/components/PagingComponent.vue';
export default {
  props: {
    prdt_cd: {
      type: String,
      required: true,
    },
  },
  components : {
            Paging
        },
  data() {
    return {
      queryList: [],
      queryForm: false,
      queryL: true,
      newQuery: {
        qst_no: '',
        title: '',
        content: '',
        id: '',
        qst_dt: '',
        status: '', //답변이 없기 때문에
        prdt_cd: '',
      },
        paging : [],
                pagination : {},
                allSize : 0,  // 모든 데이터 수
                pageSize : 5, // 한 페이지에서 보여줄 데이터 수
                navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
                lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
                curPage : 1,  // 현재 페이지
                startPage : 1,  // 페이지네이션 시작번호
                endPage : 1,  // 페이지네이션 끝번호

    };
  },
  created() {
    let cd = this.$route.query.prdt_cd;
    // this.getQueryList(cd);
  },
  // watch(){
  //   changeList(){
  //   this.refreshQuery = this.
  //   }
  // },
  methods: {
    dateFomat(date){
                let date1 = new Date(date);
                const year = date1.getFullYear();
                const month = ('0' + (date1.getMonth() + 1)).slice(-2);
                const day = ('0' + date1.getDate()).slice(-2);
                const dateStr = `${year}-${month}-${day}`;
                return dateStr;
            },
    async getQueryList(prdt_cd) {
      let result = await axios.get('/api/product/queryList/'+ prdt_cd)
        .catch(err => console.log(err));
      this.queryList = result.data; 
      console.log(result);

    },
    clickQueryForm() {
      this.queryForm = !this.queryForm; //false였던 문의글 등록 true
      this.queryL = ! this.queryL;
    },
    isCurrentUser(queryUserId) { //작성자와 같은 사람일경우 
      return this.$store.state.userStore.id === queryUserId;
    },
    async submitQuery() {
      let data = {
        param: {
          title: this.newQuery.title,
          content: this.newQuery.content,
          id: this.$store.state.userStore.id,
          status: 0,
          prdt_cd: this.$route.query.prdt_cd,
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
      this.queryForm = false; //저장 후 목록 이동
      //중간에 새로고침 해줘야함
      this.queryL = true;
      

      //새로 고침 안됨
    },
    async deleteQuery(qst_no){
      let result = await axios.delete('/api/product/queryDel/'+qst_no)
        .catch(err => console.log(err));
      console.log(result);
      if (result.data.affectedRows > 0) {
                Swal.fire('삭제되었습니다');
                }
      this.queryL = true;
      this.queryForm = false;
     
    }

  },
  computed: {
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
    }
  }
</script>