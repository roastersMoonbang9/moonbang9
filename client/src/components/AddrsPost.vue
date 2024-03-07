<template>
    <button type="button" @click="addrSearch()" class="btn btn-secondary btn btnS5 btnGry2 fn lMar5 fonts">우편번호 찾기</button>
</template>

<script>
export default {
    emits : ['userEvent'],
    data(){
        return{
            addrs:{
                zip: "",
                addrr: "",
                extraAddress: ""
            }
        };
    },
    methods: {
        addrSearch(){
            new window.daum.Postcode({
        oncomplete: (data) => {
        if (this.addrs.extraAddress !== '') {
            this.addrs.extraAddress = '';
        }
        if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            this.addrs.addrr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.addrs.addrr = data.jibunAddress;
          }
        
        if(data.userSelectedType === 'R'){
            
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                this.addrs.extraAddress += data.bname;
            }
            
            if(data.buildingName !== '' && data.apartment === 'Y'){
                this.addrs.extraAddress += (this.addrs.extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            
            if(this.addrs.extraAddress !== ''){
                this.addrs.extraAddress = ' (' + this.addrs.extraAddress + ')';
            }
		} else {
            this.addrs.extraAddress = "";
		}
        this.addrs.addrr += this.addrs.extraAddress;

        // 우편번호를 입력한다.
        this.addrs.zip = data.zonecode;
        this.$emit('userEvent',this.addrs);
    }
        }).open();
    }
}
}
</script>
<style>
    .fonts{
        font-size: 12px;
    }
</style>