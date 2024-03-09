<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">공지사항</h1>
      <div>
        <h4 style="margin-bottom: 20px;">검색</h4>
        <table class="table table-bordered">
          <tr>
            <th>검색어</th>
              <td>
                  <select class="form-select" v-model="checkSearch" aria-label="Default select example">
                      <option value="1">주문번호</option>
                      <option value="2">주문자명</option>
                  </select>
              </td>
              <td colspan="3">
                  <input v-model="searched" class="form-control" type="text" aria-label="default input example">
              </td>
          </tr>
        </table>
      </div>
      <div style="text-align: center; margin-bottom: 60px;">
        <button class="btn btn-dark" @click="this.getTableList()">검색</button>
        <button class="btn btn-secondary" @click="this.dataReset()">초기화</button>
      </div>

      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === false">등록</button>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === true">닫기</button>
      <div class="table-responsive">
      <table class="table table-hover align-middle" style="font-size: 15px; text-align: center; table-layout: fixed;">
        <thead>
          <tr class="table-primary">
            <th class="col-1">No.</th>
            <th class="col-2">제목</th>
            <th class="col-6">내용</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(table, idx) in tableList" :key="idx" @click="getNoticeInfo(table.notice_no)">
            <td class="col-1">{{ table.notice_no }}</td>
            <td class="col-2">{{ table.title }}</td>
            <td class="col-6" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ table.content }}</td>
            <td>{{ table.notice_dt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
      <Paging 
      :pagination="pagination"
      v-on:prevPage="prevPage"
      v-on:nextPage="nextPage"
      v-on:firstPage="firstPage"
      v-on:lastPaging="lastPaging"
      v-on:changeNowPage="changeNowPage"/>

      <div class="black-bg" v-if="modalOpen === true">
        <div class="bg-light rounded h-100 p-4">                
          <h4 class="mb-4">공지사항 등록</h4>
          <form name="noticeForm">
              <div class="row mb-3">
                  <label for="noticeTitle" class="col-sm-2 col-form-label" >제목</label>
                  <div class="col-sm-10">
                      <input type="text" class="form-control" name="noticeTitle" v-model="noticeInfo.title">
                  </div>
              </div>
              <div class="row mb-3">
                  <label for="noticeContent" class="col-sm-2 col-form-label">내용</label>
                  <div class="col-sm-10">
                      <textarea type="text" class="form-control" name="noticeContent" v-model="noticeInfo.content"></textarea>
                  </div>
              </div>
              <fieldset class="row mb-3">
                  <legend for="noticeImpor" class="col-form-label col-sm-2 pt-0">상단공개 여부</legend>
                  <div class="col-sm-10">
                    <ul class="nav">
                      <li class="nav-item">
                      <div class="form-check">
                          <input for="bannSt" class="form-check-input" type="radio" name="gridRadios1" id="gridRadios1" :value="checkImpor0"  v-model="noticeInfo.impor" checked>
                          <label class="form-check-label" for="gridRadios1">
                              일반&nbsp;&nbsp;&nbsp;
                          </label>
                      </div>
                      </li>
                      <li class="nav-item">
                      <div class="form-check">
                          <input for="bannSt" class="form-check-input" type="radio" name="gridRadios2" id="gridRadios2" :value="checkImpor1"  v-model="noticeInfo.impor" >
                          <label class="form-check-label" for="gridRadios2">
                              중요
                          </label>
                      </div>
                    </li>
                    </ul>
                  </div>
              </fieldset>
              <div class="mb-3">
                
          <input @change="fileSelect()" for="dataFilesUpl" class="form-control" type="file" name="dataFiles"  multiple ref="images" />
          <button class="btn btn-secondary" @click="addFile()">파일추가</button>
          <input for="tablecd" type="hidden" name="table_cd" :value="4">
          <input for="type_cd" type="hidden" name= "type_cd" :value="2">  

              </div>
            <div class="d-grid gap-2 col-3 mx-auto">
              <button type="button" class="btn btn-primary" @click="noticeInsert()">저장하기</button>
            </div>
          </form>
        </div>
      </div>

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
        modalOpen: false,
        noticeInfo: {
          title: '',
          content: '',
          impor: "0",

          table_cd: '',
          type_cd: '',
        },
        checkImpor0 : "0",
        checkImpor1 : "1",
        noticeFiles : '',

        noticeInfo2 : {},

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
      async getNoticeInfo(no) {
        console.log(no);
        let result = await axios.get(`/api/notice/noticeInfo/${no}`)
                                .catch(err => console.log(err));
        this.noticeInfo2 = result.data;
        console.log(this.noticeInfo2);
      },
      fileSelect() {
        this.noticeFiles = this.$refs.images.files;
      },
      async noticeInsert(){
        this.noticeInfo.type_cd = this.tableList[0].notice_no + 1;
        this.noticeInfo.table_cd = 4;
        let formData = new FormData(window.Document.noticeForm); //form 안의 값을 다 넣어줌
        formData.append('title',this.noticeInfo.title);
        formData.append('content',this.noticeInfo.content);
        formData.append('impor',this.noticeInfo.impor);
        for (let i = 0; i < this.noticeFiles.length; i++) {
          formData.append("dataFiles", this.noticeFiles[i]);
        }
        formData.append('table_cd',this.noticeInfo.table_cd);
        formData.append('type_cd',this.noticeInfo.type_cd);

        console.log(formData);

        let axiosConfig = {  
        Headers: {
            "Content-Type": "multipart/form-data",
          }
        }
        
            let result = await axios.post("/api/upload", formData ,axiosConfig)
                               .catch(err => console.log(err));
                               console.log(' Result출력:', result.data);
                  this.$router.go(this.$router.currentRoute);
      },
      modalOpenTF(){
        if(this.modalOpen == false){
          this.modalOpen = true;
        }else{
          this.modalOpen = false;
        }
      },
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
