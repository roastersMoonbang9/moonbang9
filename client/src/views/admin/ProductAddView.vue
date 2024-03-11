<template>
    <div class="container">
      <h1 style="padding: 15px; font-size: 27px;">상품 등록</h1>
        <div class="bg-light rounded h-100 p-4">                
          <form name="productForm">
              <div class="row mb-3">
                  <div class="col-sm-1"></div>
                  <label for="productName" class="col-sm-1 col-form-label" >상품명</label>
                  <div class="col-sm-3">
                      <input type="text" class="form-control" name="productName" v-model="productInfo.prdt_name">
                  </div>
                  <label for="productBrand" class="col-sm-1 col-form-label" >브랜드</label>
                  <div class="col-sm-2">
                      <input type="text" class="form-control" name="productBrand" v-model="productInfo.brand">
                  </div>
              </div>

              <div class="row mb-3">
                <div class="col-sm-1"></div>
                <label for="productCode" class="col-sm-1 col-form-label" >카테고리</label>
                <div class="col-sm-3">
                  <select class="form-select" aria-label="Default select example" name="large_code" required v-model="productInfo.large_code">
                    <option value="" disabled selected>대분류</option>
                    <option value="A">다이어리</option>
                    <option value="B">노트</option>
                    <option value="C">필기류</option>
                    <option value="D">사무용품</option>
                    <option value="E">데코레이션</option>
                  </select>
                </div>
                <!-- <div class="col-sm-1"></div> -->
                <div class="col-sm-3">
                  <select v-if="productInfo.large_code == ''" class="form-select" name="small_code" aria-label="Default select example" required v-model="productInfo.small_code">
                    <option value="" disabled selected>소분류</option>
                  </select>
                  <select v-else-if="productInfo.large_code == 'A'" class="form-select" name="small_code" aria-label="Default select example" required v-model="productInfo.small_code">
                    <option value="" disabled selected style="display: none;">소분류</option>
                    <option value="A">다이어리</option>
                    <option value="B">플래너</option>
                    <option value="C">달력</option>
                  </select>
                  <select v-else-if="productInfo.large_code == 'B'" class="form-select" name="small_code" aria-label="Default select example" required v-model="productInfo.small_code">
                    <option value="" disabled selected>소분류</option>
                    <option value="A">베이직노트</option>
                    <option value="B">양장노트</option>
                    <option value="C">스프링노트</option>
                    <option value="D">수첩</option>
                    <option value="E">메모지</option>
                  </select>
                  <select v-else-if="productInfo.large_code == 'C'" class="form-select" name="small_code" aria-label="Default select example" required v-model="productInfo.small_code">
                    <option value="" disabled selected>소분류</option>
                    <option value="A">연필</option>
                    <option value="B">펜</option>
                    <option value="C">형광펜</option>
                    <option value="D">지우개</option>
                  </select>
                  <select v-else-if="productInfo.large_code == 'D'" class="form-select" name="small_code" aria-label="Default select example" required v-model="productInfo.small_code">
                    <option value="" disabled selected>소분류</option>
                    <option value="A">복사용지</option>
                    <option value="B">필통</option>
                    <option value="C">가위</option>
                    <option value="D">계산기</option>
                    <option value="E">풀</option>
                  </select>
                  <select v-else-if="productInfo.large_code == 'E'" class="form-select" name="small_code" aria-label="Default select example" required v-model="productInfo.small_code">
                    <option value="" disabled selected>소분류</option>
                    <option value="A">스티커</option>
                    <option value="B">스탬프</option>
                    <option value="C">테이프</option>
                    <option value="D">포스터</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                  <div class="col-sm-1"></div>
                  <label for="productPrice" class="col-sm-1 col-form-label" >판매가</label>
                  <div class="col-sm-2">
                      <input type="number" class="form-control" name="productPrice" v-model="productInfo.price">
                  </div>
                  <label for="productPct" class="col-sm-1 col-form-label" >할인율</label>
                  <div class="col-sm-1">
                      <input @change="changePrice(productInfo.dc_pct)" type="number" class="form-control" name="productPct" v-model="productInfo.dc_pct">
                  </div>
                    <label for="sale_price" class="col-sm-1 col-form-label" >할인가</label>
                  <div class="col-sm-2">
                      <input type="number" class="form-control" name="sale_price" v-model="productInfo.sale_price">
                  </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-1"></div>
                  <label for="productOptions" class="col-sm-1 col-form-label">옵션</label>
                  <div class="col-sm-2">
                      <input type="text" placeholder="옵션1" class="form-control" name="productOptions" v-model="productInfo.opt_name1">
                  </div>
                  <div class="col-sm-2">
                      <input type="text" placeholder="옵션2" class="form-control" name="productOptions" v-model="productInfo.opt_name2">
                  </div>
                  <div class="col-sm-2">
                      <input type="text" placeholder="옵션3" class="form-control" name="productOptions" v-model="productInfo.opt_name3">
                  </div>
                  <div class="col-sm-2">
                      <input type="text" placeholder="옵션4" class="form-control" name="productOptions" v-model="productInfo.opt_name4">
                  </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-1"></div>
                  <label for="prdt_detail" class="col-sm-1 col-form-label">상세설명</label>
                  <div class="col-sm-8">
                      <textarea type="text" class="form-control" name="prdt_detail" v-model="productInfo.prdt_detail"></textarea>
                  </div>
              </div>
              <div class="row mb-3">
                <div class="col-sm-1"></div>
                <label for="dataFiles" class="col-sm-1 col-form-label" >상품 이미지</label>
                <div class="col-sm-8">
                  <input @change="fileSelect()" for="dataFilesUpl" class="form-control" type="file" name="dataFiles" accept="image/*" multiple ref="images"/>
                </div>
              </div>
              <div class="mb-3">
              </div>
            <div class="d-grid gap-2 col-3 mx-auto">
              <button type="button" class="btn btn-primary" @click="productInsert()">등록하기</button>
            </div>
          </form>
        </div>
      </div>
  </template>
  
  <script>
  import axios from 'axios' 
  
  export default {
    data () {
      return {
        productInfo: {
          prdt_name: '',
          brand: '',
          large_code: '',
          small_code: '',
          price: 0,
          dc_pct: 0,
          sale_price: 0,
          prdt_detail: '',
          image: 'ㅜㅜ',

          opt_name1: '',
          opt_name2: '',
          opt_name3: '',
          opt_name4: '',

          table_cd: '',
          type_cd: '',
        },

        productFiles : '',
      }
    },
    methods : {
      changePrice(dc) {
        if (dc < 0 || dc == '') {
            this.productInfo.dc_pct = 0;
          } else if (dc > 30) {
            alert('할인율은 최대 30%입니다.');
            this.productInfo.dc_pct = 30;
            this.productInfo.sale_price = this.productInfo.price * ((100-30)/100);
          } else {
            this.productInfo.sale_price = this.productInfo.price * ((100-dc)/100);
          }
      },
      fileSelect() {
        if(this.$refs.images.files.length > 4){
          alert('사진은 4개까지 첨부 가능합니다.');
          this.$refs.images.value = null;
        }else {
          this.productFiles = this.$refs.images.files;
        }
      },
      async productInsert(){
        let dc_pct = (this.productInfo.dc_pct)/100;
        this.productInfo.type_cd = this.productInfo.large_code+this.productInfo.small_code+"0001";
        this.productInfo.table_cd = 0;
        let formData = new FormData(window.Document.productForm); //form 안의 값을 다 넣어줌
        formData.append('prdt_name',this.productInfo.prdt_name);
        formData.append('brand',this.productInfo.brand);
        formData.append('large_code',this.productInfo.large_code);
        formData.append('small_code',this.productInfo.small_code);
        formData.append('price',this.productInfo.price);
        formData.append('dc_pct', dc_pct);
        formData.append('sale_price',this.productInfo.sale_price);
        formData.append('prdt_detail',this.productInfo.prdt_detail);
        formData.append('image',this.productInfo.image);
        formData.append('opt_name1',this.productInfo.opt_name1);
        formData.append('opt_name2',this.productInfo.opt_name2);
        formData.append('opt_name3',this.productInfo.opt_name3);
        formData.append('opt_name4',this.productInfo.opt_name4);
        for (let i = 0; i < 5; i++) {
          formData.append("dataFiles", this.productFiles[i]);
        }
        formData.append('table_cd',this.productInfo.table_cd);
        formData.append('type_cd',this.productInfo.type_cd);

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
    }
  }
  </script>

<style>
  select option[value=""][disabled] {
	  display: none;
  }
</style>