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
            <tr :key="i" v-for="(table, i) in tableList">
              <td>{{ table.title }}</td>
              <td>{{ table.content }}</td>
              <td>{{ dateFomat(table.qst_dt) }}</td>
              <td>{{ hideId(table.id) }}</td>
              <!-- 아이디 동일할때만 삭세하거나 수정할 수 있도록 -->
              <td v-if="isCurrentUser(table.id)">
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button @click="deleteQuery(table.qst_no)" class="btn btn-light btn-sm">삭제</button>
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
      tableList: [],
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
    this.getTableList(1);
  },
  // watch(){
  //   changeList(){
  //   this.refreshQuery = this.
  //   }
  // },
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
    }
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
             //4) 전체를 가져와서 
        async getTableList(curPage) {
            curPage = this.judgePage(curPage);
            if (!curPage || curPage <= 0)
                curPage = this.startPage;
            let gap = curPage % this.navSize === 0 ? this.navSize - 1 : curPage % this.navSize - 1;
            this.startPage = this.judgePage(curPage - gap);
            this.endPage = this.startPage + this.navSize - 1;
            await this.getTableCount(curPage);
            this.curPage = curPage;
            
            let data = {
                param: {
                    limit: this.pageSize,
                    offset: (curPage - 1) * this.pageSize,
                    prdt_cd:this.$route.query.prdt_cd
                }
            }
            console.log('데이타', data);
            console.log('데이타2', curPage, this.pageSize, this.curPage);
            let result = await axios.post('/api/product/queryList/', data)
                .catch(err => console.log(err));
            console.log("쿼리리스트",result);
            this.tableList = result.data;
        },
    
    async getTableCount() {
            let result = await axios.get(`/api/product/queryCount1/`+this.$route.query.prdt_cd) //쿼리문에 count문이 있어야함
                .catch(err => console.log(err));
            this.allSize = result.data[0].count;
            this.lastPage = Math.ceil(this.allSize / this.pageSize);
            this.pagination = {
                lastPage: this.lastPage,
                startPage: this.startPage,
                endPage: this.endPage,
                curPage: this.curPage
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
        prevPage() {
            this.getTableList(--this.curPage);
        },

        nextPage() {
            this.getTableList(++this.curPage);
        },

        firstPage() {
            this.curPage = 1;
            this.getTableList(this.curPage);
        },

        lastPaging() {
            this.curPage = this.lastPage;
            this.getTableList(this.curPage);

        },

        changeNowPage(page) {
            this.curPage = page
            this.getTableList(this.curPage);
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
        let newQueryData = result.data;
      // this.queryList.unshift(newQueryData);
      console.log(result);
      if(result){
        Swal.fire('등록되었습니다');
        this.$router.go(this.$router.currentRoute);
      }
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
                this.$router.go(this.$router.currentRoute);
                }
      this.queryL = true;
      this.queryForm = false;
     
    }

  }
 
}
</script>