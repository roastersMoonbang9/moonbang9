<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">공지사항</h1>
      <p>{{ this.allSize }}</p>
      <table class="table table-hover" style="font-size: 15px;">
        <thead>
          <tr class="table-primary">
            <th>No.</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(table, idx) in tableList" :key="idx">
            <td>{{ table.notice_no }}</td>
            <td>{{ table.title }}</td>
            <td>{{ table.content }}</td>
            <td>{{ table.notice_dt }}</td>
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
  </template>
  
  <script>
  import axios from 'axios'
  import Paging from '@/components/PagingComponent.vue';  
  
  export default {
    components : {
      Paging
    },
    data () {
      return {
        tableList : [],
        paging : [],
        pagination : {},
        allSize : 1,  // 모든 데이터 수
        pageSize : 5, // 한 페이지에서 보여줄 데이터 수
        navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
        lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
        curPage : 1,  // 현재 페이지
        startPage : 1,  // 페이지네이션 시작번호
        endPage : 1,  // 페이지네이션 끝번호
      }
    },
    created() {
      this.getTableCount();
    },
    mounted() {
      this.getTableList();    
    },
    methods : {
      async getTableList(curPage) {
        curPage = this.judgePage(curPage);
        if (!curPage || curPage <= 0) 
          curPage = this.startPage;
        let gap = curPage%this.navSize === 0 ?  this.navSize - 1 : curPage%this.navSize - 1;
        this.startPage = this.judgePage(curPage - gap);
        this.endPage = this.startPage + this.navSize - 1;
        await this.getTableCount(curPage);

        this.curPage = curPage;
        let result = await axios.get(`/api/notice/${(curPage - 1) * this.pageSize}/${this.pageSize}`)
                                .catch(err => console.log(err));
        this.tableList = result.data;
      },
      // 테이블 행 총 갯수 가져오기  /api/~~ 만 수정해서 사용.
      async getTableCount() {
        let result = await axios.get(`/api/notice`) 
                                .catch(err => console.log(err));
        this.allSize = result.data[0].count;
        this.lastPage = Math.ceil(this.allSize / this.pageSize);
        this.pagination = {
                          lastPage : this.lastPage, 
                          startPage : this.startPage, 
                          endPage : this.endPage, 
                          curPage : this.curPage
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
      prevPage(){
        this.getTableList(--this.curPage);
      },

      nextPage(){
        this.getTableList(++this.curPage);
      },

      firstPage(){
        this.curPage = 1;
        this.getTableList(this.curPage);
      },

      lastPaging(){
        this.curPage = this.lastPage;
        this.getTableList(this.curPage);
        
      },
      
      changeNowPage(page){
        this.curPage = page
        this.getTableList(this.curPage);
      }
    }
  }
  </script>
