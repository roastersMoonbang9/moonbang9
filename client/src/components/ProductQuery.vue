<template>
  <div>
    <button @click="clickQueryForm()" class="btn btn-primary mb-3">문의하기</button>
    <!-- 문의 등록 -->
    <div v-if="queryFormShow">
      <form @submit.prevent="submitQuery()">
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
    <div id="productQuery" role="tabpanel" aria-labelledby="description-tab" v-if="queryOpen">
      <div class="p-4 p-lg-5 bg-white">
        <h6 class="text-uppercase">상품문의 </h6>
        <table class="table table-hover">
          <tbody>
            <tr :key="i" v-for="(query, i) in queryList">
              <td>{{ query.title }}</td>
              <td>{{ query.content }}</td>
              <td>{{ dateFomat(query.qst_dt) }}</td>
              <td>{{ hideId(query.id) }}</td>
              <!-- 아이디 동일할때만 삭세하거나 수정할 수 있도록 -->
              <td v-if="isCurrentUser(query.id)">
                <button @click="deleteQuery(query.qst_no)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Paging 
        :pagination="pagination"
        v-on:prevPage="prevPage"
        v-on:nextPage="nextPage"
        v-on:firstPage="firstPage"
        v-on:lastPaging="lastPaging"
        v-on:changeNowPage="changeNowPage"/>
      </div>
    </div>
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
    this.getQueryList(cd);
  },
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
      this.queryList = result.data; //여기있는 data를 못읽어옴....
      console.log(result);

    },
    clickQueryForm() {
      this.queryFormShow = !this.queryFormShow; //false였던 문의글 등록 true
    },
    isCurrentUser(queryUserId) { //작성자와 같은 사람일경우 
      return this.$store.state.userStore.id === queryUserId;
    },
    async submitQuery() {
      let data = {
        param: {
          qst_cd: this.queryList[0].qst_cd + 1,
          title: this.newQuery.title,
          content: this.newQuery.content,
          id: this.$store.state.userStore.id,
          status: 0,
          prdt_cd: prdt_cd,
        }
      }
      let result = await axios.post('/api/product/addQuery/',data) //등록 안됨....
        .catch(err => console.log(err));
      this.newQuery = result.data;
      console.log(result);

      this.newQuery = {
        title: '',
        content: '',
      };
      this.queryFormShow = false; //저장 후 목록 이동
    },
    async deleteQuery(qst_no){
      let result = await axios.delete(`/api/product/queryDel/${qst_no}`)
        .catch(err => console.log(err));
      this.queryList = result.data; //여기있는 data를 못읽어옴....
      console.log(result);
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