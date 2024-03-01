<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">공지사항</h1>
      <table class="table" style="font-size: 15px;">
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(notice, idx) in noticeList" :key="idx">
            <td>{{ notice.notice_no }}</td>
            <td>{{ notice.title }}</td>
            <td>{{ notice.content }}</td>
            <td>{{ notice.notice_dt }}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="btn" @click="changePage()">처음</button>
        <button class="btn" @click="changePage()">이전</button>
        <button class="btn" @click="changePage()">1</button>
        <button class="btn" @click="changePage()">2</button>
        <button class="btn" @click="changePage()">3</button>
        <button class="btn" @click="changePage()">4</button>
        <button class="btn" @click="changePage()">5</button>
        <button class="btn" @click="changePage()">다음</button>
        <button class="btn" @click="changePage()">마지막</button>
 
        <!-- <button v-if="currentPage > 1" @click="currentPage--">이전 페이지</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button v-if="currentPage < totalPages" @click="currentPage++">다음 페이지</button> -->
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        noticeList : [],
        start : 0,

        allSize : 0,  // 모든 데이터 수
        pageSize : 0, // 한 페이지에서 보여줄 데이터 수
        navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
        lastPage : 0,  //Math.ceil(allSize / pageSize)
        startPage : 0,
        endPage : 0,

        nextPage : 0,
        backPage : 0,
        jumpPage : 0,
        jumpBackPage : 0
      }
    },
    computed : {

    },
    created() {
      this.getNoticeCount();
    },
    mounted() {
      this.getNoticeList();
    },
    methods : {
      async getNoticeList() {
        console.log(this.start);
        let result = await axios.get(`/api/notice/${this.start}`)
                                .catch(err => console.log(err));
        console.log(result);
        this.noticeList = result.data;
      },
      async getNoticeCount() {
        let result = await axios.get(`/api/notice`)
                                .catch(err => console.log(err));
        console.log(result);
        this.allSize = result.data[0].count;
      },
      judgePage(page) {
        if (!page || page <= 0) 
          page = 1
        else if (page > this.lastPage) 
          page = this.lastPage
        return page
      },
      getPaging(curPage) {
        curPage = this.judgePage(parseInt(curPage));

        let gap = curPage%this.navSize === 0 ?  this.navSize - 1 : curPage%this.navSize - 1
        let startPage = this.judgePage(curPage - gap);
        let endPage = startPage + this.navSize - 1;


        let result = {
          curPage: curPage,
          startPage: startPage,
          endPage: this.judgePage(endPage),
          nextPage: this.judgePage(++curPage),
          backPage: this.judgePage(--curPage),
          jumpPage: this.judgePage(++endPage),
          jumpBackPage: this.judgePage(--startPage)
        }
        console.log('getPaging', result)
        return result;
      }
    }
  }
  </script>
  