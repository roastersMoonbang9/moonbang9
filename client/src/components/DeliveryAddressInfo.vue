<template>
    <div class="overHidden tMar80">
        <h3>배송지 정보</h3>
        
    </div>
    <table class="baseTable orderForm tMar10">
        <caption>주문고객 정보 입력</caption>
        <colgroup>
            <col width="12%"><col width="38%"><col width="12%"><col width="">
        </colgroup>
        <tbody>
        <tr>
            <th><label for="sendName">받으시는 분</label></th>
            <td><input type="text" class="txtInp" name="buyname" maxlength="32" value="파란강아지" id="sendName"></td>
        </tr>
        
        <tr>
            <th>주소</th>
            <td colspan="3">
                <p>
                <input type="text" name="buyZip" value="       " readonly title="우편번호" class="txtInp focusOn" style="width:60px;">
                <a href="#" class="btn btnS5 btnGry2 fn lMar5">우편번호 찾기</a>
                
                </p><p class="tPad05"><input name="buyAddr1" type="text" class="txtInp" style="width:420px;background-color:#EEEEEE;" value="" title="동까지의 주소 입력" readonly>
                <input name="buyAddr2" type="text" class="txtInp" style="width:440px;" value="" title="상세주소 입력"></p>
            </td>
        </tr>
        
        <tr>
            <th><label for="hp01">휴대전화</label></th>
            <td>
                <p><input type="text" class="txtInp" style="width:30px;" name="buyhp1" maxlength="4" value="010" default="010" title="주문고객 휴대전화번호 국번 입력" id="hp01"> -
                <input type="text" class="txtInp" style="width:40px;" name="buyhp2" maxlength="4" value="1111" default="1111" title="주문고객 휴대전화번호 가운데 자리 번호 입력"> -
                <input type="text" class="txtInp" style="width:40px;" name="buyhp3" maxlength="4" value="2222" default="2222" title="주문고객 휴대전화번호 뒷자리 번호 입력"></p>
                </td>
        </tr>
        </tbody>
    </table>
    </template>
    
    <style>
    .tMar80 {
        margin-top: 80px;
    }
    .overHidden {
        overflow: hidden;
    }
    .cartBox h3 {
        float: left;
        color: #000;
        font-size: 12px;
    }
    div.orderWrap .orderForm {
        border-top: 2px solid #555;
    }
    .baseTable {
        border-bottom: 1px solid #eaeaea;
    }
    .baseTable {
        border-bottom: none;
        text-align: center;
    }
    caption {
        overflow: hidden;
        width: 0;
        height: 0;
        font-size: 0;
        line-height: 0;
        text-indent: -9999px;
    }
    .baseTable {
        border-bottom:none; 
        text-align:center;    
        width: 96%;
        margin: 0 2%;
    }
    .baseTable th {
        font-weight:bold;
        background:#fff; 
        font-size:13px;
    }
    .baseTable td {
        padding:15px 0px; 
        border-top:1px solid #eaeaea; 
        font-size:13px; 
        color:#888; 
        line-height:16px;
    }
    .baseTable {
        border-bottom:1px solid #eaeaea;
    }
    .orderForm {
        border-top:2px solid #555;
    }
    .orderForm th {
        background:#f5f5f5; 
        color:#666; 
        padding:12px 0px;
    }
    .orderForm td {
        padding:10px 0px;
    }
    .orderForm tbody th {
        border-top:1px solid #eaeaea; 
        font-size:12px; 
        padding-left:20px; 
        padding-right:20px; 
        text-align:left;
    }
    .orderForm tbody td {
        font-size:12px; 
        border-top:1px solid #eaeaea; 
        padding-left:20px; 
        padding-right:20px; 
        text-align:left;
    }
    .orderForm .txtInp {
        height:20px; 
        padding:0 5px; 
        font-size:12px; 
        font-weight:normal;
    }
    .orderForm .txtInp {
        height:15px\9; 
        padding:5px 5px 0 5px\9;
    }
    .orderForm select {
        height:22px; 
        font-size:12px; 
        font-weight:normal;
    }
    </style>