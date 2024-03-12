<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">공지사항</h1>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === false">등록</button>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === true">닫기</button>
      <div class="table-responsive">
      <table class="table table-hover align-middle" style="font-size: 15px; text-align: center; table-layout: fixed;">
        <thead>
          <tr class="table-primary">
            <th class="col-1">No.</th>
            <th class="col-1">중요도</th>
            <th class="col-2">제목</th>
            <th class="col-5">내용</th>
            <th>등록일</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(table, idx) in tableList" :key="idx">
            <td class="col-1">{{ table.notice_no }}</td>
            <td class="col-1">{{ this.changeImpor(parseInt(table.impor)) }}</td>
            <td class="col-2">{{ table.title }}</td>
            <td class="col-5" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{{ table.content }}</td>
            <td>{{ this.dateFomat(table.notice_dt) }}</td>
            <td><button class="btn" @click="delNotice(table.notice_no)">삭제</button></td>
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
                
          <input @change="fileSelect()" for="dataFilesUpl" class="form-control" type="file" name="dataFiles" accept="image/*" multiple ref="images"/>
          <input for="tablecd" type="hidden" name="table_cd" :value="4">
          <input for="type_cd" type="hidden" name= "type_cd" :value="2">  

              </div>
            <div class="d-grid gap-2 col-3 mx-auto">
              <button type="button" class="btn btn-primary" @click="noticeInsert()">등록하기</button>
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
      dateFomat(date){
        let date1 = new Date(date);
        const year = date1.getFullYear();
        const month = ('0' + (date1.getMonth() + 1)).slice(-2);
        const day = ('0' + date1.getDate()).slice(-2);
        const dateStr = `${year}-${month}-${day}`;
        return dateStr;
      },
      changeImpor(impor) {
                if (impor == 0) {
                  impor = "일반"
                } else if (impor == 1) {
                  impor = "중요"
                }
                return impor;
            },
      async delNotice(no) {
        console.log(no);
        if(confirm('정말 삭제하시겠습니까?')){
          let result = await axios.delete(`/api/notice/noticeDelete/${no}`)
                                  .catch(err => console.log(err));
          console.log(result.data);
          this.$router.go(this.$router.currentRoute);
        }
        
      },
      fileSelect() {
        if(this.$refs.images.files.length > 5){
          alert('파일은 5개까지 첨부 가능합니다.');
          this.$refs.images.value = null;
        }else {
          this.noticeFiles = this.$refs.images.files;
        }
      },
      async noticeInsert(){
        this.noticeInfo.type_cd = this.tableList[0].notice_no + 1;
        this.noticeInfo.table_cd = 4;
        let formData = new FormData(window.Document.noticeForm); //form 안의 값을 다 넣어줌
        formData.append('title',this.noticeInfo.title);
        formData.append('content',this.noticeInfo.content);
        formData.append('impor',this.noticeInfo.impor);
        for (let i = 0; i < 5; i++) {
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
            if(result) {
              alert('등록이 완료되었습니다.');
              this.$router.go(this.$router.currentRoute);
            } else {
              alert('등록이 실패하였습니다. 재시도해주세요.');
            }
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
