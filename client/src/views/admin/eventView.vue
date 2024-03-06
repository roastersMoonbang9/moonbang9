<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">이벤트</h1>
      <button type="button" class="btn btn-outline-secondary m-2">선택 삭제</button>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === false">추가</button>
      <button type="button" class="btn btn-outline-secondary m-2"  @click="modalOpenTF" v-if="modalOpen === true">닫기</button>

      <table class="table table-hover" style="font-size: 15px;">
        <thead>
          <tr class="table-primary">
            <th><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></th>
            <th>코드</th>
            <th>배너이름</th>
            <th>이미지</th>
            <th>이동url</th>
            <th>등록일</th>
            <th>활성화여부</th>
          </tr>
        </thead>
        <tbody>
          <!--for 과 if를 같이 사용은 불가능하다고 생각해라-->
          <tr v-for="(event, idx) in eventList" :key="idx">
            <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></td>
            <td>{{ event.event_cd }}</td>
            <td>{{ event.event_name }}</td>
            <td>{{ event.image }}</td>
            <td>{{ event.path }}</td>
            <td>{{ event.crd_date }}</td>
            <td>{{ event.status }}</td>
          </tr>
        </tbody>
      </table>
  
        <!-- 배너추가창 -->

        <!-- 모달창 -->
        
<div class="black-bg" v-if="modalOpen === true">
  <div class="bg-light rounded h-100 p-4">                
    <h6 class="mb-4">배너추가</h6>
    <!-- event.preventdefault와 같은 효과-->
    <form>
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">배너 이름</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="bannerName" v-model="bannerInfo.name">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">이동 url</label>
            <div class="col-sm-10">
                <input type="url" class="form-control" id="bannerPath" v-model="bannerInfo.path" >
            </div>
        </div>
        <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0">활성화 여부</legend>
            <div class="col-sm-10">
                <div class="form-check">
                    <input class="form-check-input" type="radio" id="bannStatus" value="1" v-model="bannerInfo.status">
                    <label class="form-check-label" for="gridRadios1">
                        활성화
                    </label>
                </div>
            </div>
        </fieldset>
        <div class="mb-3">
          <form action="http://localhost:3000/upload/" method="post" enctype="multipart/form-data">
    <input class="form-control" type="file" name="photos" multiple ref="images" />
    <input type="hidden" name="table_cd" value="3">
    <input type="hidden" name= "type_cd" value="eventList.event_cd">  
</form>
        </div>
        <button type="reset" class="btn btn-primary">취소하기</button>
        <button type="submit" class="btn btn-primary" @click="bannerInsert()">저장하기</button>
    </form>
</div>
</div>
</div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data () {
      return {
        eventList : [],
        modalOpen: false,
        bannerInfo: {
          no: '',
          name: '',
          path: '',
          status: 0, 
          table_cd: '',
          type_cd: '',
          img: '',
          created_date: '',
        },
        fileList:[{
          event_cd: '',
          event_name: '',
          event_impt: '',
          path: '',
          crd_date: '',
          extn: '',
          status:'',
          image: ''
        }
        ],
        paging : [],
        allSize : 1,  // 모든 데이터 수
        pageSize : 5, // 한 페이지에서 보여줄 데이터 수
        navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
        lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
        curPage : 1,  // 현재 페이지
        startPage : 1,  // 페이지네이션 시작번호
        endPage : 1,  // 페이지네이션 끝번호
      }
    },
    mounted() {
      this.getTableList();    
    },
    methods : {
      async bannerInsert(){
            let data = { 
                param : {
                    event_cd: this.bannerInfo.no,
                    event_name : this.bannerInfo.name,
                    path : this.bannerInfo.path,
                    status : this.bannerInfo.status,
                    type_cd: this.bannerInfo.type_cd,
                    image: this.fileList.filename,
                } ,
            };

            let result = await axios.post("/api/notice/event", data)
                               .catch(err => console.log(err));
                  console.log('data는:'+result.data);
                  this.$router.go(1); //해당 페이지 재호출
        },
        fileUpload(){
        axios.get('/upload')
              .then(result => {
                this.fileList = result.data[0];
                let dbImgUrl = `${result.data[0].file_path}/${result.data[0].file_name}.${result.data[0].file_extn}`;
                console.log(dbImgUrl);
                let localhost = "http://localhost:3000/";
                this.imgUrl = localhost + dbImgUrl;
                this.$router.go(1);
              });
        },
        
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
        let result = await axios.get(`/api/notice/event/${(curPage - 1) * this.pageSize}/${this.pageSize}`)
                                .catch(err => console.log(err));
        this.eventList = result.data;
      },
      // 테이블 행 총 갯수 가져오기  /api/~~ 만 수정해서 사용.
      async getTableCount() {
        let result = await axios.get(`/api/notice/event`) 
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
      },
      modalOpenTF(){
        if(this.modalOpen == false){
          this.modalOpen = true;

        }else{
          this.modalOpen = false;
        }
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