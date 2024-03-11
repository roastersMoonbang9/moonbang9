<template>
    <aside id="sidebar" class="sidebar">
        <ul class="sidebar-nav" id="sidebar-nav">

        <!-- <li class="nav-item">
            <a class="nav-link collapsed" href="#">
            <i class="bi bi-grid"></i>
            <router-link to="/admin"><span style="color: #00009cda;">메인 페이지</span></router-link>
            </a>
        </li> -->

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
            <i class="bi bi-menu-button-wide"></i><span style="color: #00009cda;">회원관리</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/memberList"><span>회원 목록</span></router-link>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/grade"><span>레벨 관리</span></router-link>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/coupon"><span>쿠폰 관리</span></router-link>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/possCoupon"><span>쿠폰 적용</span></router-link>
                </a>
            </li>
            </ul>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
            <i class="bi bi-journal-text"></i><span style="color: #00009cda;">상품 관리</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/adminProduct"><span>상품 목록</span></router-link>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/productAdd"><span>상품 등록</span></router-link>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i><span>상품 리뷰</span>
                </a>
            </li>
            <li>
                <a href="/admin/productQuery">
                <i class="bi bi-circle"></i><span>상품 문의</span>
                </a>
            </li>
            </ul>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
            <i class="bi bi-layout-text-window-reverse"></i><span style="color: #00009cda;">주문 관리</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/orderList"><span>주문 목록</span></router-link>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/cancelOrderList"><span>주문 취소 목록</span></router-link>
                </a>
            </li>
            </ul>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
            <i class="bi bi-person"></i>
            <router-link to="/admin/delivery"><span style="color: #00009cda;">배송 조회</span></router-link>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" href="#">
            <i class="bi bi-person"></i>
            <router-link to="/admin/delivery"><span style="color: #00009cda;">고객 문의 관리</span></router-link>
            </a>
        </li>

        <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
            <i class="bi bi-bar-chart"></i><span style="color: #00009cda;">공지 / 이벤트</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
                <a href="#">
                <i class="bi bi-circle"></i>
                <router-link to="/admin/notice/"><span>공지사항</span></router-link>
                </a>
            </li>
            <li>
                <a href="#">

                <i class="bi bi-circle"></i> <router-link to="/admin/event"><span>이벤트</span></router-link>

                </a>
            </li>
            </ul>
        </li>

        <!-- <li class="nav-item">
            <a class="nav-link collapsed" data-bs-target="#icons-nav" data-bs-toggle="collapse" href="#">
            <i class="bi bi-gem"></i><span style="color: #00009cda;">통계 분석</span><i class="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="icons-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
            <li>
                <a href="#">
                <i class="bi bi-circle"></i><span>주문 통계</span>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i><span>주문취소 통계</span>
                </a>
            </li>
            <li>
                <a href="#">
                <i class="bi bi-circle"></i><span>회원 통계</span>
                </a>
            </li>
            </ul>
        </li> -->

        </ul>

    </aside><!-- End Sidebar-->
</template>