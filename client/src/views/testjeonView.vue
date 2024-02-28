<template>
    <div class="container">
      <h1>공지사항</h1>
      <table class="table">
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
        <button v-if="currentPage > 1" @click="currentPage--">이전 페이지</button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button v-if="currentPage < totalPages" @click="currentPage++">다음 페이지</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        noticeList : [],
        currentPage : 1,
        postsPerPage : 5,
        start : 0,
        cnt : 5
      }
    },
    computed : {
      displayedPosts() {
        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        return this.noticeList.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.noticeList.length / this.postsPerPage);
      }
    },
    created() {
      this.getNoticeList(); // 비동기작업
    },
    methods : {
      async getNoticeList() { // 동기작업
        let result = await axios.get('/api/notice/' + this.start,this.cnt)
                                .catch(err => console.log(err));
        let list = result.data;
        this.noticeList = list;
      }
    }
  }
  </script>
  