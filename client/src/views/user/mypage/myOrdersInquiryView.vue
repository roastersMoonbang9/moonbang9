<template>
    <div class="myContent" style="float: none;">
        <div class="titleSection">
			<h3>1:1 문의</h3>
		</div>
        <div style="text-align: right;">
            <button style="margin: 0 15px 10px 30px; border: 1px solid #ccc;border-radius: 5px;" >문의등록</button>
        </div>
        <div class="mySection">
				<fieldset>
					<table class="baseTable">
						<caption>주문배송조회 목록</caption>
							<colgroup>
								 <col width="50"><col width="88"> <col width="88"><col width="50"><col width="88">
							</colgroup>
						<thead>
							<tr>
                                <th scope="col">문의번호</th>
								<th scope="col">카테고리</th>
								<th scope="col">제목</th>
								<th scope="col">답변상태</th>
								<th scope="col">문의날짜</th>
							</tr>
						</thead>
                        <!-- {{ reviewList }} -->
						<tbody>
	                        <tr v-for="(table, idx) in tableList" :key="idx">
								<td>{{ table.qst_no }}</td>
								<td>{{ categorys(table.ctg) }}</td>
								<td>{{ table.title }}</td>
                                <td v-if="answer == null">답변미완료</td><td v-else>답변완료</td>
                                <td>{{ getDate(table.qst_dt) }}</td>
            				</tr>
                            <tr v-show="qstBtn">
                                <td colspan="7" style="text-align: left;">
                                    <div v-for="(item, index) in radioList" :key="index">
                                        <input type="radio" :id="item.key" v-model="picked" :value="item" />
                                        <label :for="item.key" class="text">{{ item.value }}</label>
                                    </div>
                                </td>
                            </tr>
                            <tr v-show="qstBtn">
                                <td colspan="7" style="text-align: left;">1:1문의 작성하기</td>
                            </tr>
                            <tr v-show="qstBtn">
                                <td style="text-align: right;">문의내용</td>
                                <td colspan="6"><textarea cols="80" rows="10" style="width: 90%; height: 6.25em; border: 1px solid #000; resize: none;" v-model="qstList.content" placeholder="리뷰는 300자까지 입력이 가능합니다."></textarea></td>
                            </tr>
                            <tr v-show="qstBtn">
                                <td style="text-align: right;">관리자 답변</td>
                                <td colspan="6"><textarea cols="80" rows="10" style="width: 90%; height: 6.25em; border: 1px solid #000; resize: none;" v-model="qstList.answer" placeholder="리뷰는 300자까지 입력이 가능합니다." readonly></textarea></td>
                            </tr>
                            <tr style="border-style: hidden;" v-show="qstBtn">
                                <td></td>
                                <td style="text-align: right;" colspan="2"><input type="file" accept="image/*"></td>
                                <td colspan="4"></td>
                            </tr>
                            <tr v-show="qstBtn">
                                <td></td>
                                <td style="text-align: left;" colspan="2"><button style="margin: 0 15px 0 30px; border: 1px solid #ccc;border-radius: 5px;" >등록</button><button @click="qstRefesh()" style="border: 1px solid #ccc;border-radius: 5px;">취소</button></td>
                                <td colspan="4"></td>
                            </tr>
	                        <tr v-if="tableList.length == 0">
								<td colspan="6">검색된 문의내역이 없습니다.</td>
            				</tr>
						</tbody>
					</table>
				<div class="pageWrapV15 tMar20">
					<div class="paging">
<!-- 페이지 컴포넌트 자리-->
<Paging :pagination="pagination" v-on:prevPage="prevPage" v-on:nextPage="nextPage"
v-on:firstPage="firstPage" v-on:lastPaging="lastPaging" v-on:changeNowPage="changeNowPage"/>
                    </div>
				</div>
			</fieldset>
		</div>
    </div>
</template>
<script>
import axios from 'axios'
import Paging from '@/components/PagingComponent.vue';

export default{ 
    components : {
            Paging
    },
    data(){
        return{
            checkSearch : "1",
                searched : this.$store.state.userStore.mem_no,
                qstBtn : false, // 문의작성 활성화
                qstList : { //문의 리스트
                    ctg : '',
                    title : '',
                    content : '',
                    qst_dt : null,
                    status : '',
                    answer : '',
                    answer_dt : null
                }, 
                picked: "", //라디오 선택
                radioList: [ //라디오 리스트
                    {
                      key: 0,
                      value: "주문",
                    },
                    {
                      key: 1,
                      value: "배송",
                    },
                    {
                      key: 2,
                      value: "회원",
                    },
                    {
                      key: 3,
                      value: "기타",
                    }
                ],    

                // 리스트
                tableList : [],
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
    created(){
        this.getTableList();
        this.picked = this.radioList[0];
    },
    watch: {
    picked() {
      console.log("watch : ", this.picked);
    //   this.getSearch();
    },
  },
    methods:{
            // 주문상세 리스트
            async getTableList(curPage) {
                curPage = this.judgePage(curPage);
                if (!curPage || curPage <= 0) 
                curPage = this.startPage;
                let gap = curPage%this.navSize === 0 ?  this.navSize - 1 : curPage%this.navSize - 1;
                this.startPage = this.judgePage(curPage - gap);
                this.endPage = this.startPage + this.navSize - 1;
                await this.getTableCount(curPage);
                this.curPage = curPage;
                let data = {
                    param : {
                        limit : this.pageSize,
                        offset : (curPage - 1) * this.pageSize,
                        checkSearch : this.checkSearch,
                        searched : this.$store.state.userStore.mem_no,

                    }
                }
                let result = await axios.post("/api/user/queryList", data)
                                        .catch(err => console.log(err));
                console.log(result);
                this.tableList = result.data;
            },
            // 테이블 행 총 갯수 가져오기
            async getTableCount() {
                let data = {
                    param : {
                        checkSearch : this.checkSearch,
                        searched : this.$store.state.userStore.mem_no
                    }
                }
                let result = await axios.post(`/api/user/queryListCount`, data) 
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
            },
             //날짜 양식변경
            getDate(days) {
                let res = null;
                let date = new Date(days);
                let y = date.getFullYear();
                let m = ("0" + (date.getMonth() + 1)).slice(-2);
                let d = ("0" + date.getDate()).slice(-2);

                res = `${y}년${m}월${d}일`;

            return res;
            },
            //리뷰 활성화
            reviewShow(prdt_cd, ord_no){
                if(this.qstBtn == true){
                    this.qstBtn = false;
                    this.reviewList.prdt_cd = ""
                    this.reviewList.ord_no = ""
                }else if(this.qstBtn == false){
                    this.qstBtn = true;
                    this.reviewList.prdt_cd = prdt_cd
                    this.reviewList.ord_no = ord_no
                }
            },
            //오늘 날짜 계산
            getDateToday() {
              let res = null;
              let date = new Date();
              let y = date.getFullYear();
              let m = ("0" + (date.getMonth() + 1)).slice(-2);
              let d = ("0" + date.getDate()).slice(-2);
            
              res = `${y}-${m}-${d}`;
            
              return res;
            },
            //문의 카테고리
            categorys(no){
                if(no == 0){
                    return "주문";
                }else if(no == 1){
                    return "배송"
                }else if(no == 2){
                    return "회원"
                }else if(no == 3){
                    return "기타"
                }
            },
            //리뷰 등록 이벤트
            /*async insertReview(){
                let data = {
                    param : {
                        content : this.reviewList.content,
                        rating : this.reviewList.rating,
                        prdt_cd : this.reviewList.prdt_cd,
                        mem_no : this.reviewList.mem_no,
                        ord_no : this.reviewList.ord_no,
                        rv_dt : this.reviewList.rv_dt
                    }
                }

                if(this.reviewList.content == ""){
                    Swal.fire({
                      icon: "error",
                      title: "내용이 존재하지 않습니다. <br>내용 작성후 다시 시도해 주세요."
                    });

                    return 
                }

                let result = await axios.post(`/api/product/review`, data) 
                                        .catch(err => console.log(err));
                let info = result.data.affectedRows;
                if (info > 0) {
                  alert("리뷰가 등록되었습니다.");
                  this.reviewShow(this.reviewList.prdt_cd, this.reviewList.ord_no)
                  this.getTableList();
                }else{
                  alert("리뷰등록에 실패하였습니다.");
                  this.reviewShow(this.reviewList.prdt_cd, this.reviewList.ord_no)
                }
            },*/
            //등록된 리뷰 확인
            /*async reviewDel(prdt_cd,ord_no){
                let data = {
                    prdt_cd : prdt_cd,
                    ord_no : ord_no
                }
                let result = await axios.post(`/api/product/reviewDelete`, data) 
                                        .catch(err => console.log(err));
                let info = result.data.affectedRows;
                if (info > 0) {
                  alert("리뷰가 삭제되었습니다.");
                  this.getTableList();
                }else{
                  alert("리뷰삭제에 실패하였습니다.");
                }
                
            },*/
            // 답변 취소
            qstRefesh(){
                this.reviewList.content = ""
            }
        }
    }
</script>

<style>

</style>