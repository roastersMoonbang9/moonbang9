<template>
    <div class="container">
        <h1 style="padding: 15px; font-size: 27px;">주문 목록</h1>
        <div>
            <h3>조건검색</h3>
            <table class="table table-bordered">
                <tr>
                    <th>검색어</th>
                    <td>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">주문번호</option>
                            <option value="2">주문자명</option>
                        </select>
                    </td>
                    <td>
                        <input class="form-control" type="text" aria-label="default input example">
                    </td>
                </tr>
                <tr>
                    <th>기간검색</th>
                    <td>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">주문일</option>
                            <option value="2">배송완료일</option>
                        </select>
                    </td>
                    <td>
                        <input class="form-control" type="date" aria-label="default input example">
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
