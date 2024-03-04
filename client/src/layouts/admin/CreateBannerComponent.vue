<template>
<div class="bg-light rounded h-100 p-4">                
    <h6 class="mb-4">배너추가</h6><form>
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">배너 이름</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputBannerName">
            </div>
        </div>
        <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
                <input type="url" class="form-control" id="inputimgUrl">
            </div>
        </div>
        <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0">활성화 여부</legend>
            <div class="col-sm-10">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1">
                    <label class="form-check-label" for="gridRadios1">
                        활성화
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                    <label class="form-check-label" for="gridRadios2">
                        비활성화
                    </label>
                </div>
            </div>
        </fieldset>
        <div class="mb-3">
                        <label for="formFile" class="form-label">배너 이미지</label>
                        <input class="form-control" type="file" id="formFile">
                        <input type="submit" value="불러오기" /> 
        </div>
        <button type="reset">취소하기</button>
        <button type="submit" class="btn btn-primary">저장하기</button>
    </form>
</div>
