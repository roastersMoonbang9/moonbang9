<template>
<div class="myContent" style="float: none;">
		<div class="titleSection">
			<h3>주문상세조회</h3>
		</div>
			<div class="mySection">
				<fieldset>
					<table class="baseTable">
						<caption>주문배송조회 목록</caption>
							<colgroup>
								 <col width="88"><col width="88"> <col width="88"><col width="50"> <col width="130"> <col width="81"><col width="81">
							</colgroup>
						<thead>
							<tr>
                                <th scope="col">이미지</th>
								<th scope="col">상품</th>
								<th scope="col">수량</th>
								<th scope="col">단건가격</th>
								<th scope="col">총 금액</th>
								<th scope="col">리뷰</th>
								<th scope="col">재구매</th>
							</tr>
						</thead>
                        <!-- {{ reviewList }} -->
						<tbody>
	                        <tr v-for="(table, idx) in tableList" :key="idx">
								<td>이미지</td>
								<td>{{ table.prdt_name }}<br><span v-if="table.opt_name != null">옵션 : {{table.opt_name}}</span></td>
								<td>{{ table.detail_cnt }}개</td>
								<td>{{ table.price }}원</td>
								<td>{{ table.sum_price }}원</td>
								<td v-if="table.revCount == 0"><button @click="reviewShow(table.prdt_cd,table.ord_no)" v-if="!reviewBtn" style="border: 1px solid #ccc;border-radius: 5px;">리뷰작성</button><button style="border: 1px solid #ccc;border-radius: 5px;" @click="reviewShow(table.prdt_cd,table.ord_no)" v-else>리뷰닫기</button></td>
                                <td v-else><button @click="reviewDel(table.prdt_cd,table.ord_no)" v-if="!reviewBtn">리뷰삭제</button></td>
                                <td><button style="border: 1px solid #ccc;border-radius: 5px;" @click="recart(table)">재구매</button></td>
            				</tr>
                            <tr v-show="reviewBtn">
                                <td colspan="7" style="text-align: left;">리뷰작성하기</td>
                            </tr>
                            <tr style="border-style: hidden;" v-show="reviewBtn">
                                <td style="text-align: right;">별점</td>
                                <td>
                                    <div class="star-rating space-x-4 mx-auto">
	                                    <input type="radio" id="5-stars" name="rating" value="5" v-model="reviewList.ratings"/>
	                                    <label for="5-stars" class="star pr-4">★</label>
	                                    <input type="radio" id="4-stars" name="rating" value="4" v-model="reviewList.ratings"/>
	                                    <label for="4-stars" class="star">★</label>
	                                    <input type="radio" id="3-stars" name="rating" value="3" v-model="reviewList.ratings"/>
	                                    <label for="3-stars" class="star">★</label>
	                                    <input type="radio" id="2-stars" name="rating" value="2" v-model="reviewList.ratings"/>
	                                    <label for="2-stars" class="star">★</label>
	                                    <input type="radio" id="1-star" name="rating" value="1" v-model="reviewList.ratings" />
	                                    <label for="1-star" class="star">★</label>
                                    </div>
                                </td>
                                <td colspan="5"></td>
                            </tr>
                            <tr v-show="reviewBtn">
                                <td style="text-align: right;">내용</td>
                                <td colspan="6"><textarea cols="80" rows="10" style="width: 90%; height: 6.25em; border: 1px solid #000; resize: none;" v-model="reviewList.content" placeholder="리뷰는 300자까지 입력이 가능합니다."></textarea></td>
                            </tr>
                            <tr style="border-style: hidden;" v-show="reviewBtn">
                                <td></td>
                                <td style="text-align: right;" colspan="2"><input type="file" accept="image/*"></td>
                                <td colspan="4"></td>
                            </tr>
                            <tr v-show="reviewBtn">
                                <td></td>
                                <td style="text-align: left;" colspan="2"><button style="margin: 0 15px 0 30px; border: 1px solid #ccc;border-radius: 5px;" @click="insertReview">등록</button><button @click="reviewRefesh()" style="border: 1px solid #ccc;border-radius: 5px;">취소</button></td>
                                <td colspan="4"></td>
                            </tr>
	                        <tr v-if="tableList.length == 0">
								<td colspan="6">검색된 주문내역이 없습니다.</td>
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

        <div class="fls">
        <!--배송정보-->
        <div class="detail_section">
			<div class="info_area">
				<div class="info_head">
					<h3 class="h3">배송지정보</h3>
				</div>
				<div class="info_cont">
					<ul class="info_list person_info delivery">
						<li><strong>수령인</strong><span>{{ tableList1.rcv_name }}</span></li>
						<li><strong>연락처</strong><span>{{ tableList1.rcv_phone }}</span></li>
						<li><strong>배송지</strong><span>[{{ tableList1.rcv_postcode }}]</span><span>{{ tableList1.deli_addr }},{{ tableList1.deli_addrdt }}</span></li>
					</ul>
				</div>
			</div>
		</div>
        <!--주문금액-->
        <div class="detail_section type_payment_info" style="width: 37%;">
        <div class="info_area ">
				<div class="info_head">
					<h3 class="h3">주문금액</h3>
					<strong class="detail_order_price">{{ tableList1.total_payment }}원</strong>
				</div>
				<div class="info_cont">
					<ul class="info_list">
						<li>
							<div class="total">
								<strong>상품금액</strong>
								<em class="amount"><span>{{tableList1.sum_price}}</span>원</em>
							</div>
						</li>
						<li>
							<div class="total">
								<strong>배송비</strong>
								<em class="amount"><span>{{tableList1.deli_cost}}</span>원</em>
							</div>
						</li>
						<li>
							<div class="total">
								<strong>쿠폰할인</strong>
								<em class="amount"><span>{{tableList1.cpn_disc}}</span>원</em>
							</div>
						</li>
						<li>
							<div class="total">
								<strong>포인트할인</strong>
								<em class="amount"><span>{{tableList1.used_point}}</span>원</em>
							</div>
						</li>
						
					</ul>
				</div>
        </div>
    </div>

            <!--포인트 혜택-->
            <div class="detail_section type_payment_info" style="width: 30%;">
        <div class="info_area ">
				<div class="info_head">
					<h3 class="h3">포인트 혜택</h3>
					<strong class="detail_order_price">총 {{ tableList1.accu_pnt }}원</strong>
				</div>
				<div class="info_cont">
					<ul class="info_list">
						<li>
							<div class="total">
								<strong>기본적립</strong>
								<em class="amount"><span>{{ tableList1.accu_pnt }}</span>원</em>
							</div>
						</li>
					</ul>
				</div>
            </div>
        </div>
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
                searched : null,
                totalPayment : 0,
                ord_no : "", // 주문번호
                tableList1 : {}, //첫번째 리스트만
                reviewBtn : false, // 리뷰작성 활성화
                reviewList : { //리뷰 리스트
                    content : "",
                    rating : 1,
                    prdt_cd : "",
                    mem_no : this.$store.state.userStore.mem_no,
                    ord_no : "",
                    rv_dt : this.getDateToday()
                },

                // 리스트
                tableList : [],
                paging : [],
                pagination : {},
                allSize : 0,  // 모든 데이터 수
                pageSize : 10, // 한 페이지에서 보여줄 데이터 수
                navSize : 5,  // 페이지네이션이 보여줄 최대 페이지 수
                lastPage : 1,  // Math.ceil(allSize / pageSize) 마지막 페이지
                curPage : 1,  // 현재 페이지
                startPage : 1,  // 페이지네이션 시작번호
                endPage : 1,  // 페이지네이션 끝번호
        };
    },
    created(){
        this.ord_no = this.$route.query.no;
        this.getTableList();
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
                        searched : this.ord_no,

                    }
                }
                let result = await axios.post("/api/order/usOrderDetailList", data)
                                        .catch(err => console.log(err));
                console.log(result);
                this.tableList = result.data;
                this.tableList1 = result.data[0];

            },
            // 테이블 행 총 갯수 가져오기
            async getTableCount() {
                let data = {
                    param : {
                        checkSearch : this.checkSearch,
                        searched : this.ord_no
                    }
                }
                let result = await axios.post(`/api/order/usOrderDetailCount`, data) 
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
            // ratingToPercent() {
            //     const score = +this.restaurant.averageScore * 20;
            //     return score + 1.5;
            // },
            //리뷰 활성화
            reviewShow(prdt_cd, ord_no){
                if(this.reviewBtn == true){
                    this.reviewBtn = false;
                    this.reviewList.prdt_cd = ""
                    this.reviewList.ord_no = ""
                }else if(this.reviewBtn == false){
                    this.reviewBtn = true;
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
            //리뷰 등록 이벤트
            async insertReview(){
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

                let result = await axios.post(`/api/product/review`, data) 
                                        .catch(err => console.log(err));
                let info = result.data.affectedRows;
                if (info > 0) {
                  alert("리뷰가 등록되었습니다.");
                  this.reviewShow(this.reviewList.prdt_cd, this.reviewList.ord_no)
                }else{
                  alert("리뷰등록에 실패하였습니다.");
                  this.reviewShow(this.reviewList.prdt_cd, this.reviewList.ord_no)
                }
            },
            //등록된 리뷰 확인
            async reviewDel(prdt_cd,ord_no){
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
                
            },
            // 리뷰 취소
            reviewRefesh(){
                this.reviewList.content = ""
            },
            // 재구매
            recart(table){
                let data = {
                    prdt_cd : table.reviewList,
                    prdt_name : table.prdt_name,
                    brand : table.brand,
                    large_code : table.large_code,
                    small_code : table.small_code,
                    price : table.price,
                    sale_price : table.sale_price,
                    dc_pct : table.dc_pct,
                    image : table.image,
                    cart_cd : table.cart_cd,
                    cart_qty : table.cart_qty,
                    opt_cd : table.opt_cd,
                    opt_name : table.opt_name,
                    total_price : table.total_price,
                }
            }
            // JSON.parse(sessionStorage.getItem("data"));
        }
    }
</script>

<style>
.my10x10Wrap .myContent {
    position: relative;
}
.myContent {
    float: right;
    width: 848px;
    min-height: 703px;
    height: auto;
    height: 703px;
    padding: 40px 30px;
    background: #fff;
    font-size: 14px;
}
.myContent .titleSection {
    margin: 0 -30px 45px;
    padding: 0 30px 30px;
    background: url(//fiximage.10x10.co.kr/web2013/my10x10/bg_double_line.gif) left bottom repeat-x;
    position: relative;
}
.myContent .titleSection h3 {
    color: #000;
    font-size: 28px;
    line-height: 1;
    font-weight: bold;
}
.myContent .titleSection .list {
    margin-top: 15px;
}
fieldset, img {
    border: 0;
}
.myContent .optSelect {
    height: 20px;
}
select.optSelect {
    border: 1px solid #bbb;
    color: #666;
    font-size: 11px;
    height: 17px;
    outline-style: none;
    vertical-align: middle;
    font-weight: normal;
}
.btn:link, .btn:active, .btn:visited {
    color: #fff;
}
.btnS2 {
    font-size: 12px;
    line-height: 0.9;
    padding: 5px 8px 2px;
    vertical-align: top;
}
.baseTable {
    border-top: 2px solid #555;
    border-bottom: 1px solid #ddd;
    text-align: center;
}
.words{
    border: 1px solid #ccc;
    border-radius: 20px;
    font-size: 12px;
}
.chbtn{
    border: 1px solid #ccc;
    border-radius: 20px;
    margin: 0 10px;
}
.detail_section {
    position: relative;
    margin-top: 8px;
    padding: 0 15px;
    background-color: #ccc;
    border: 1px solid #fff;
    border-radius: 10px;
}
.info_area .info_cont {
    position: relative;
    margin-top: 0;
    padding: 14px 0;
}

.info_cont {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #efefef;
}
.info_list.person_info li {
    position: relative;
    min-height: 19px;
    padding-left: 100px;
    line-height: 19px;
}

.info_list li {
    position: relative;
    padding-left: 84px;
    color: #222;
}
.info_list.person_info strong {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
    width: 100px;
    margin-left: 0px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #8f8f8f;
}

.info_list li strong {
    position: absolute;
    left: 0;
    top: 0;
    width: 84px;
}
.info_list li strong, .info_list li b {
    font-weight: normal;
}
.info_list.person_info li {
    position: relative;
    min-height: 19px;
    padding-left: 100px;
    line-height: 19px;
}
.info_list.delivery span {
    display: inline-block;
    vertical-align: top;
}

.info_list.person_info span {
    display: block;
    word-wrap: break-word;
    color: #252525;
}
.info_list li span {
    color: #000;
}

.info_list li strong {
    position: absolute;
    left: 0;
    top: 0;
    width: 84px;
}
.info_list li strong, .info_list li b {
    font-weight: normal;
}
.info_list.person_info div {
    word-wrap: break-word;
}
.info_list.person_info li + li {
    margin-top: 9px;
}

.info_list.person_info li {
    position: relative;
    min-height: 19px;
    padding-left: 100px;
    line-height: 19px;
}
.info_list li + li {
    margin-top: 6px;
}
.info_list li {
    position: relative;
    padding-left: 84px;
    color: #222;
}
.info_cont ul {
    list-style: none;
    padding: 0;
}
.detail_section.type_payment_info .info_head {
    letter-spacing: -0.5px;
}

.info_area .info_head .h3 {
    display: inline-block;
    color: #222;
    font-size: 16px;
    line-height: 20px;
    white-space: nowrap;
}
.info_area .info_head .detail_order_price {
    float: right;
    color: #aa2909;
    letter-spacing: -0.5px;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap;
}
.detail_section.type_payment_info .info_cont {
    padding-bottom: 16px;
}

.info_area .info_cont {
    position: relative;
    margin-top: 0;
    padding: 14px 0;
}
.info_cont {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #efefef;
}
.detail_section.type_payment_info .info_list {
    margin-top: -3px;
}
.detail_section.type_payment_info .info_list li {
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.5px;
}

.detail_section.type_payment_info li {
    padding-left: 0;
}
.info_list li {
    position: relative;
    padding-left: 84px;
    color: #222;
}
.detail_section.type_payment_info .info_list li {
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.5px;
}

.info_list li {
    position: relative;
    padding-left: 84px;
    color: #222;
}
.detail_section.type_payment_info .info_list li strong {
    position: relative;
    width: 78px;
    font-weight: 500;
    color: #8f8f8f;
}

.info_list li strong {
    position: absolute;
    left: 0;
    top: 0;
    width: 84px;
}
.detail_section.type_payment_info .info_list li .total:after {
    display: block;
    clear: both;
    content: '';
}
.detail_section.type_payment_info .info_list li .total:after {
    display: block;
    clear: both;
    content: '';
}
.detail_section.type_payment_info .info_list li {
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.5px;
}
.info_list li {
    position: relative;
    padding-left: 84px;
    color: #222;
}
.detail_section .amount {
    float: right;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica, AppleSDGothicNeo-Regular, "나눔고딕", nanumgothic, sans-serif;
    white-space: nowrap;
}
.detail_section {
    position: relative;
    margin-top: 8px;
    padding: 0 15px;
    background-color: #eee;
}
.info_area .info_head .point_benefit {
    position: absolute;
    top: 15px;
    right: 0px;
    font-weight: 600;
    font-size: 16px;
    white-space: nowrap;
}
.text_point_color {
    color: #aa2909;
}
.info_area label.info_head {
    display: block;
}

.info_area .info_head {
    position: relative;
    padding: 15px 0px 11px;
}
:checked + .info_area label.info_head + .info_cont {
    display: block;
}

.info_area label.info_head + .info_cont {
    display: none;
}
.info_area .info_cont {
    position: relative;
    margin-top: 0;
    padding: 14px 0;
}
.info_cont {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid #efefef;
}
.info_list.point {
    margin-top: -3px;
}
.info_list.point li {
    padding-left: 0;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.5px;
}

.info_list li {
    position: relative;
    padding-left: 84px;
    color: #222;
}
.info_list.point li .summary_num {
    float: right;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica, AppleSDGothicNeo-Regular, "나눔고딕", nanumgothic, sans-serif;
}
.info_list.point li .inner_list {
    margin-top: 12px;
}
.info_list.point li span {
    color: #222;
}
.info_list.point li .inner_list li .benefit_name, .info_list.point li .inner_list li .benefit_sum {
    white-space: nowrap;
}

.info_list.point li span {
    color: #222;
}
.inner_list .benefit_sum {
    float: right;
    letter-spacing: 0;
}
.inner_list .benefit_sum em {
    font-size: 15px;
    vertical-align: top;
    font-weight: 500;
}
.fls{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.star-rating {
  display: flex;
  flex-direction: row-reverse;
  font-size: 1.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5em;
}
 
.star-rating input {
  display: none;
}
 
.star-rating label {
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 2.3px;
  -webkit-text-stroke-color: #2b2a29;
  cursor: pointer;
}
 
.star-rating :checked ~ label {
  -webkit-text-fill-color: #000;
}
 
.star-rating label:hover,
.star-rating label:hover ~ label {
  -webkit-text-fill-color: #000;
}
</style>