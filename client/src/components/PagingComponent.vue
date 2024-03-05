<template>
    <div class="container">
      <div>
        <ul class="pagination justify-content-center" style="font-size: 15px;">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="getTableList(1)" style="color: black;">&lt;&lt;</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="getTableList(--this.curPage)" style="color: black;">&lt;</a>
          </li>
          <li v-for="(page, idx) in paging" :key="idx" class="nav-item" v-bind:class="{'active' : isSelect}">
            <a v-bind:value="checkPage" class="nav-link d-inline-flex focus-ring px-4 text-decoration-none border rounded-2" aria-current="page" href="#" @click="getTableList(page)" style="color: black;">{{ page }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="getTableList(++this.curPage)" style="color: black;">&gt;</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="getTableList(this.lastPage)" style="color: black;">&gt;&gt;</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'

  export default {
    data () {
      return {
        tableList : [],
        paging : [],

        allSize : 1,  // 모든 데이터 수
        pageSize : 5, // 한 페이지에서 보여줄 데이터 수
        navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
        lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
        curPage : 1,  // 현재 페이지
        startPage : 1,  // 페이지네이션 시작번호
        endPage : 1,  // 페이지네이션 끝번호
        isSelect : false
      }
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
        if (this.lastPage < this.endPage)
        this.endPage = this.lastPage;

        this.paging = [];
        for (let i = this.startPage; i <= this.endPage; i++) {
          this.paging.push(i)
        }
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
      },
      judgePage(page) {
        if (!page || page <= 0) 
          page = 1
        else if (page > this.lastPage) 
          page = this.lastPage
        return page
      }
    }
  }
  </script>
  
  <style scoped>
    .selected {
      background-color: #ddd;
      font-weight: bold;
    }
  </style>
  