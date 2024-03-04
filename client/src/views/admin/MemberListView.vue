<template>
    <div class="container">
        <h1 style="padding: 15px; font-size: 27px;">회원 목록</h1>
        <div>
            <h3>조건검색</h3>
            <table class="table table-bordered">
                <tr>
                    <th>검색어</th>
                    <td>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">아이디</option>
                            <option value="2">회원명</option>
                        </select>
                    </td>
                    <td colspan="2">
                        <input class="form-control" type="text" aria-label="default input example">
                    </td>
                </tr>
                <tr>
                    <th>기간검색</th>
                    <td>
                        <select class="form-select" aria-label="Default select example">
                            <option value="1">가입일</option>
                            <option value="2">탈퇴일</option>
                        </select>
                    </td>
                    <td>
                        <input class="form-control" type="date" aria-label="default input example">
                    </td>
                    <td>
                        <button class="btn btn-outline-dark">오늘</button>
                        <button class="btn btn-outline-dark">어제</button>
                        <button class="btn btn-outline-dark">일주일</button>
                        <button class="btn btn-outline-dark">1개월</button>
                        <button class="btn btn-outline-dark">3개월</button>
                    </td>
                </tr>
                <tr>
                    <th>등급검색</th>
                    <td colspan="3">
                        <ul class="nav" >
                            <li class="nav-item">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                <label class="form-check-label" for="flexRadioDefault1">
                                    전체
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
                                <label class="form-check-label" for="flexRadioDefault2">
                                    WHITE
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3">
                                <label class="form-check-label" for="flexRadioDefault3">
                                    BASIC
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4">
                                <label class="form-check-label" for="flexRadioDefault4">
                                    VIP
                                </label>
                            </li>
                            <li class="nav-item">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault5">
                                <label class="form-check-label" for="flexRadioDefault5">
                                    GOLD
                                </label>
                            </li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>