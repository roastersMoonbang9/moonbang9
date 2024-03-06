<template>
    <div class="container">
      <div>
        <ul class="pagination justify-content-center" style="font-size: 15px;">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="firstPage()" style="color: black;">&lt;&lt;</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="prevPage()" style="color: black;">&lt;</a>
          </li>
          <li v-for="page in setPages" :key="page" class="nav-item" v-bind:class="[page === this.pagination.curPage ? 'selected' : '']">
            <a class="nav-link d-inline-flex" aria-current="page" href="#" @click="changeNowPage(page)" style="color: black;">{{ page }}</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="nextPage()" style="color: black;">&gt;</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#" @click="lastPaging()" style="color: black;">&gt;&gt;</a>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props:['pagination'],
    computed: {
      setPages(){
        let pages = [];
        if (this.pagination.lastPage < this.pagination.endPage){
          for (let i = this.pagination.startPage; i <= this.pagination.lastPage; i++) {
            pages.push(i);
          }
        } else {
          for (let i = this.pagination.startPage; i <= this.pagination.endPage; i++) {
            pages.push(i);
          }
        }
        return pages;
      }
    },
    methods : {
      prevPage(){
        this.$emit("prevPage");
      },
      nextPage(){ 
        this.$emit("nextPage"); 
      },
      firstPage(){ 
        this.$emit("firstPage"); 
      },
      lastPaging(){ 
        this.$emit("lastPaging"); 
      },
      changeNowPage(page){
        this.$emit("changeNowPage", page);
      }

      // prevPage(){
      //   this.getTableList(--this.curPage);
      // },

      // nextPage(){
      //   this.getTableList(++this.curPage);
      // },

      // firstPage(){
      //   this.curPage = 1;
      //   this.getTableList(this.curPage);
      // },

      // lastPaging(){
      //   this.curPage = this.lastPage;
      //   this.getTableList(this.curPage);
        
      // },
      
    }
  }
  </script>
  
  <style scoped>
    li.selected{
      background-color: #69b5f3;
      color: white;
    }
  </style>
  