<template>
  <!-- PRODUCT DETAILS-->
  <div class="col-lg-6">
    <ul class="list-inline mb-2 text-sm">
      <li class="list-inline-item m-0">
        <i class="fas fa-star small text-warning"></i>
      </li>
      <li class="list-inline-item m-0 1">
        <i class="fas fa-star small text-warning"></i>
      </li>
      <li class="list-inline-item m-0 2">
        <i class="fas fa-star small text-warning"></i>
      </li>
      <li class="list-inline-item m-0 3">
        <i class="fas fa-star small text-warning"></i>
      </li>
      <li class="list-inline-item m-0 4">
        <i class="fas fa-star small text-warning"></i>
      </li>
    </ul>
    <h1>{{ productInfo.prdt_name }}</h1>

    <ul class="list-unstyled small d-inline-block">
      <li class="px-3 py-2 mb-1 bg-white">
        <strong class="text-uppercase">판 매 가:</strong
        ><span class="ms-2 text-muted">{{ productInfo.price }}</span>
      </li>
      <li class="px-3 py-2 mb-1 bg-white text-muted">
        <strong class="text-uppercase text-dark">할인판매가:</strong
        ><a class="reset-anchor ms-2" href="#!">{{ productInfo.sale_price }}</a>
      </li>
      
    </ul>

    <!-- <p class="text-muted lead">정상가 {{ productInfo.price }}</p>
              <p class="text-muted lead">할인가 {{ productInfo.sale_price }}</p> -->
    <!-- <p class="text-sm mb-4"> 상품설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ut ullamcorper leo, eget euismod orci. Cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus. Vestibulum ultricies aliquam convallis.</p> -->

    <select
      class="form-select form-select-sm"
      aria-label=".form-select-sm example"
      v-model="selectedOption"
      @change="selectOption(selectedOption)"
    >
      <option :value="null" disabled style="display: none;">상품을 선택해주세요</option>
      <option :key="idx" v-for="(option, idx) in productOptions" :value="idx">
        {{ option.opt_number }} {{ option.opt_name }}
      </option>
    </select>

    <div id="lySpBag" style="display: block" v-show="showSelectedOpt">
      <div class="easeCartV15">
        <div class="easeTxtV15">
          <p>다른옵션도 구매하시려면 옵션을 반복하여 선택해 주세요.</p>
        </div>
        <div class="optSelectListWrap">
          <table class="optSelectList optionTableSize">
            <caption>
              상품 옵션별 선택 리스트
            </caption>
            <colgroup>
              <col width="*" />
              <col width="100px" />
              <col width="75px" />
              <col width="18px" />
            </colgroup>
            <tbody id="lySpBagList">

              <tr :key="idx" v-for="(selected, idx) in selectedOptions">
                <td class="lt">
                  {{ selected.onumber }} {{ selected.oname }}
                  <input
                    type="hidden"
                    name="optRequire"
                    value=""
                  />
                  <input
                    type="hidden"
                    name="optItemid"
                    value="4897994"
                  />
                  <input type="hidden" name="optCd" value="0018" />
                  <input
                    type="hidden"
                    name="optItemPrc"
                    value="12420"
                  />
                </td>
                <td>
                  <div class="spinner">
                    <input
                      type="text"
                      name="optItemEa"
                      maxlength="4"
                      pattern="[0-9]*"
                      :value="selected.oqty"
                    />
                    <div class="buttons">
                      <div class="up" style="cursor: pointer" @click="changeCnt(idx, 1)" ></div>
                      <div class="down" style="cursor: pointer" @click="changeCnt(idx, -1)"></div>
                    </div>
                    <span class="lPad05">개</span>
                  </div>
                </td>
                <!-- <td class="rt rPad05">{{productInfo.sale_price}}</td> 부분합계인데 일단 보류--> 
                <td>
                  <a href="#" class="del" style="cursor: pointer">
                    <span class="btnListDel" @click.stop="deleteOption(idx)">삭제</span>
                  </a>
                </td>
              </tr>
              
            </tbody>
          </table>
        </div>
        <div class="col-lg-6">
          <h1></h1>
        </div>
        <div class="totalPrice">
          <span>상품 금액 합계</span>
          <strong><span id="spTotalPrc">{{total}}</span></strong>
        </div>
      </div>
      <p class="rt tPad10 cGy1V15 optionP">
        (쿠폰 적용은 주문결제 단계에서 가능합니다.)
      </p>
    </div>

    <div class="row align-items-stretch mb-4">
      <!-- <div class="col-sm-5 pr-sm-0">
                  <div class="border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white"><span class="small text-uppercase text-gray mr-4 no-select">Quantity</span>
                    <div class="quantity">
                      <button class="dec-btn p-0"><i class="fas fa-caret-left"></i></button>
                      <input class="form-control border-0 shadow-0 p-0" type="text" value="1">
                      <button class="inc-btn p-0"><i class="fas fa-caret-right"></i></button>
                    </div>
                  </div>
                </div> -->
      <div class="col-sm-3 pl-sm-0 divMargin">
        <a
          class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
          href="cart.html"
          >바로구매</a
        >
      </div>
      <div class="col-sm-3 pl-sm-0 divMargin">
        <a
          class="btn btn-dark btn-sm btn-block h-100 d-flex align-items-center justify-content-center px-0"
          href="#" @click="insertCart()"
          >장바구니</a
        >
      </div>
    </div>

    <!-- <a class="text-dark p-0 mb-4 d-inline-block" href="#!"><i class="far fa-heart me-2"></i>Add to wish list</a><br> -->

    <!-- <ul class="list-unstyled small d-inline-block">
                <li class="px-3 py-2 mb-1 bg-white"><strong class="text-uppercase">SKU:</strong><span class="ms-2 text-muted">039</span></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Category:</strong><a class="reset-anchor ms-2" href="#!">Demo Products</a></li>
                <li class="px-3 py-2 mb-1 bg-white text-muted"><strong class="text-uppercase text-dark">Tags:</strong><a class="reset-anchor ms-2" href="#!">Innovation</a></li>
              </ul> -->
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      productInfo: {
        prdt_cd: "",
        prdt_name: "",
        brand: "",
        large_code: "",
        small_code: "",
        price: "",
        sale_price: "",
        dc_pct: "",
        image: "",
        prdt_detail: ""// 부모한테 넘겨줘야함
      },
      productOptions: [], //opt_cd, opt_number, opt_name
      showSelectedOpt : false,
      selectedOptions: [],
      selectedOption: null, // ocd, onumber, oname, oqty
      total : 0,
      payList : [],
      cartProducts : [] //`cart_qty`, `mem_no`, `opt_cd`, `prdt_cd`
      
    };
  },
  created() {
    let cd = this.$route.query.prdt_cd;
    this.getProductInfo(cd);
    this.getProductOptions(cd);
  },
  mounted() {
    // this.$emit('send-image', this.productInfo.image);
    this.$emit('send-detail', this.productInfo.prdt_detail);
  },  
  methods: {
    // 상품 정보
    async getProductInfo(cd) {
      console.log(cd);
      let result = await axios.get("/api/product/productInfo/" + cd);
      this.productInfo = result.data;
      console.log(result);
      // 상품 대표 이미지 ProductInfoView에게 전달
      // this.$emit('send-image', this.productInfo.image);
      this.$emit('send-detail', this.productInfo.prdt_detail);
    },
    // 상품 옵션 목록
    async getProductOptions(cd) {
      console.log(cd);
      let result = await axios.get("/api/product/productOptions/" + cd);
      this.productOptions = result.data;
      console.log(result);
    },
    // 사용자가 선택한 옵션을 selectedOptions에 넣기
    selectOption(opt_idx) {
      console.log(opt_idx);
      let ocd = this.productOptions[opt_idx].opt_cd;
      let onumber = this.productOptions[opt_idx].opt_number;
      let oname = this.productOptions[opt_idx].opt_name;
      let oqty = 1;
      console.log(ocd, onumber, oname, oqty);
      
      // 이미 selectedOptions에 담겨있는지 검증
      let optionCheck = true;
      this.selectedOptions.forEach(ele => {
        console.log('선택된옵션 : ' , ele);
        if(ele.ocd == ocd){
          optionCheck = false;
        }
      })
      if(optionCheck){
        let selectedO = { ocd, onumber, oname, oqty };
        this.selectedOptions.splice(this.selectedOptions.length, 0, selectedO);
      }
     
      // this.selectedOptions.push(selectedO);
      console.log(this.selectedOptions);
      this.makeTotal();
      this.showSelectedOpt = true;
    },
    // 사용자가 선택한 옵션의 수량 변경하고 selectedOptions에 넣기
    changeCnt(i, cnt){
      // this.selectedOptions[i].oqty += cnt;
      let qty = this.selectedOptions[i].oqty;
      console.log(qty, cnt);
      if(qty + cnt >= 1){
        qty += cnt;
      }
      console.log(qty);
      this.selectedOptions[i].oqty = qty;
      console.log(this.selectedOptions);
      this.makeTotal();      
    },
    // 사용자가 선택한 옵션을 삭제
    deleteOption(i){
      this.selectedOptions.splice(i, 1);
      console.log(this.selectedOptions);
    },
    // 사용자가 선택한 옵션들을 장바구니 db에 담기
    async insertCart(){
      this.selectedOptions.forEach(ele => {
        //`cart_qty`, `mem_no`, `opt_cd`, `prdt_cd`
        // ocd, onumber, oname, oqty
        let mem_no = this.$store.state.userStore.mem_no;
        let prdt_cd = this.productInfo.prdt_cd;
        let opt_cd = ele.ocd;        
        let cart_qty = ele.oqty;        
        let product = {mem_no, prdt_cd, opt_cd, cart_qty};
        this.cartProducts.push(product);
      });
        console.log(this.cartProducts);
        let data = {
          param : this.cartProducts          
        }
        let result = await axios.post("api/product/insertCart", data)
                                .catch(err => console.log(err));
        console.log(result);

        // this.cartProducts = null;
        // console.log(this.cartProducts);

        let info = result.data.insertId;
          if(info > 0){
              alert('등록되었습니다.');
          }else{
            alert('장바구니 등록 실패');
          }
    },
    // // 옵션별 합산금액 보류
    // makeOptTotal(){

    // },
    // 구매할 상품 전체금액
    makeTotal(){      
      let price = this.productInfo.sale_price;
      let total = 0;
      this.selectedOptions.forEach((ele)=>{
        total += price * ele.oqty;
      })
      this.total = total;
    },
//     goToPayment(){
// //       { "prdt_cd": "CB00001", "prdt_name": "모나마", "brand": "모나마", 
// // "large_code": "C", "small_code": "B", "price": 3000, 
// // "sale_price": 2400, "dc_pct": 0.2, "image": "CB00001_01_lebao.jpg", 
// // "cart_cd": 58, "cart_qty": 2, "opt_cd": "CB0000104", "opt_name": "초록", "total_price": 4800 }
//       let prdt_cd = this.productInfo.prdt_cd;
//       let prdt_name = this.productInfo.prdt_name;
//       let brand = this.productInfo.brand;
//       let large_code = this.productInfo.large_code;
//       let small_code = this.productInfo.small_code;
//       let price = this.productInfo.price;
//       let sale_price = this.productInfo.sale_price;
//       let dc_pct = this.productInfo.dc_pct;
//       let image = this.productInfo.image;
//       let cart_cd = ''; //카트코드?
//       let cart_qty = this.selectedOptions[i].opt_cd;
//       let opt_cd = this.selectedOptions[i].opt_name;
//       let total_price = this.total;

//     }
  },
};
</script>

<style>
.easeCartV15 {
  background-color: #f8f8f8;
  margin-top: 20px;
}
.easeCartV15 .easeTxtV15 {
  padding: 20px 20px 0 20px;
}
.easeCartV15 .easeTxtV15 p {
  padding-left: 18px;
  font-size: 12px;
  color: #888;
  background: url(//fiximage.10x10.co.kr/web2015/common/blt12.png) 0 1px
    no-repeat;
}
.easeCartV15 .optSelectListWrap {
  padding: 0 20px;
}
.optSelectList td {
  font-size: 12px;
  line-height: 16px;
  vertical-align: top;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px dashed #cacaca;
}

.lt {
  text-align: left !important;
}
.optSelectList td {
  font-size: 12px;
  line-height: 16px;
  vertical-align: top;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px dashed #cacaca;
}
.easeCartV15 .optSelectList .spinner {
  padding-left: 10px;
}

.spinner {
  float: none;
  height: 20px;
  line-height: 20px;
}
.spinner input {
  float: left;
  width: 40px;
  height: 18px;
  padding: 0;
  margin: 0;
  line-height: 20px;
  text-align: center;
  border: 1px #ddd solid;
  font-size: 11px;
  color: #888;
}
.spinner .buttons {
  float: left !important;
  width: 13px;
  height: 20px;
  padding-left: 2px;
}
.spinner .buttons .up {
  overflow: hidden;
  width: 13px;
  height: 9px;
  margin: 0;
  padding: 0;
  line-height: 9px;
  background: url(//fiximage.10x10.co.kr/web2013/common/btn_num_up.png) 0 0
    no-repeat;
}
.spinner .buttons .down {
  overflow: hidden;
  position: relative;
  top: 2px;
  width: 13px;
  height: 9px;
  margin: 0;
  padding: 0;
  line-height: 9px;
  background: url(//fiximage.10x10.co.kr/web2013/common/btn_num_down.png) 0 0
    no-repeat;
}
.lPad05 {
  padding-left: 5px;
}
.optSelectList td {
  font-size: 12px;
  line-height: 16px;
  vertical-align: top;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px dashed #cacaca;
}

.rt {
  text-align: right !important;
}
.rPad05 {
  padding-right: 5px !important;
}
.optSelectList td {
  font-size: 12px;
  line-height: 16px;
  vertical-align: top;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px dashed #cacaca;
}
a {
  text-decoration: none;
}
.easeCartV15 .optSelectList td .btnListDel {
  text-align: left;
}

.optSelectList td .btnListDel {
  margin-top: 1px;
}
.btnListDel {
  width: 13px;
  height: 13px;
  display: block;
  text-indent: -9999px;
  overflow: hidden;
  background: url(//fiximage.10x10.co.kr/web2013/common/btn_delete2.gif) left
    top no-repeat;
  cursor: pointer;
}
.easeCartV15 .totalPrice {
  background-color: #eee;
  padding: 15px 20px;
}

.totalPrice {
  background: #ddd;
  text-align: right;
  color: #000;
  padding: 10px;
  font-size: 12px;
  z-index: 30;
  margin-top: -1px;
  position: relative;
}
.totalPrice span {
  padding: 0 15px;
}
.optionTableSize {
  width: 100%;
  border-collapse: collapse;
  border: 0;
  empty-cells: show;
}


.cGy1V15 {
    color: #888 !important;
}
.rt {
    text-align: right !important;
}
.tPad10 {
    padding-top: 10px !important;
}
.rt {
    text-align: right !important;
}
.optionP {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-size: 12px;
}
.swiper-pointer-events {
    touch-action: pan-y;
}
.swiper {
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    list-style: none;
    padding: 0;
    z-index: 1;
}

.divMargin {
  margin-top: 20px;
}
</style>
