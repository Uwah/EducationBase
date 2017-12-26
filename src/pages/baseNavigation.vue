<template>
    <div class="container">
        <div class="navigation-top">
            <h3 class="title-tip">基地导航</h3>
            <div class="search-back" style="display: none;"></div>
            <div class="navigation-search" style="display: none;">
                <form action="" class="search-form">
                    <input type="search" name="navigation-search" id="nvg-search" placeholder="请输入基地名称">
                </form>
            </div>
            <i class="search-icon"></i>
        </div>
        <div class="search-base-banner">
            <div class="swiper-container" id="search-result">
                <div class="swiper-wrapper">
                    <div class="swiper-slide active"><div class="base-type">博物馆<span class="type-count">30</span></div></div>
                    <div class="swiper-slide"><div class="base-type">科技馆<span class="type-count">20</span></div></div>
                    <div class="swiper-slide"><div class="base-type">农业基地<span class="type-count">10</span></div></div>
                    <div class="swiper-slide"><div class="base-type">体育馆<span class="type-count">12</span></div></div>
                    <div class="swiper-slide"><div class="base-type">动物园<span class="type-count">3</span></div></div>
                </div>
            </div>
        </div>
        <div class="base-content">
            <ul class="base-list search-result">
                <li>
                    <i class="base-icon"></i>
                    <div class="base-info">
                        <h4>船文化博物馆</h4>
                        <span>栅堰路278号</span>
                    </div>
                    <div class="direction">
                        <span class="dir-count"><span class="count">5000</span>人次</span>
                        <i class="direction-icon"></i>
                    </div>
                </li>
                <li>
                    <i class="base-icon"></i>
                    <div class="base-info">
                        <h4>船文化博物馆</h4>
                        <span>栅堰路278号</span>
                    </div>
                    <div class="direction">
                        <span class="dir-count"><span class="count">5000</span>人次</span>
                        <i class="direction-icon"></i>
                    </div>
                </li>
                <li>
                    <i class="base-icon"></i>
                    <div class="base-info">
                        <h4>船文化博物馆</h4>
                        <span>栅堰路278号</span>
                    </div>
                    <div class="direction">
                        <span class="dir-count"><span class="count">5000</span>人次</span>
                        <i class="direction-icon"></i>
                    </div>
                </li>
            </ul>
            <div class="no-search" style="display: none;">
                <p class="search-tip">搜索指定内容</p>
                <div class="demo-search">
                    <span class="demo-text">农业基地</span>
                    <span class="demo-text">科技馆</span>
                </div>
                <div class="demo-search demo-search-bottom">
                    <span class="demo-text">博物馆</span>
                    <span class="demo-text">企业</span>
                </div>
            </div>
            <div class="search-info" style="display: none;">
                <ul class="search-info-list">
                    <li>
                        <i class="info-icon"></i>
                        <div class="info-content">
                            <div class="contents">
                                <h4>船文化博物馆</h4>
                                <span>栅堰路278号</span>
                            </div>
                            <i class="content-arrow"></i>
                        </div>
                    </li>
                    <li>
                        <i class="info-icon"></i>
                        <div class="info-content">
                            <div class="contents">
                                <h4>船文化博物馆</h4>
                                <span>栅堰路278号</span>
                            </div>
                            <i class="content-arrow"></i>
                        </div>
                    </li>
                    <li>
                        <i class="info-icon"></i>
                        <div class="info-content">
                            <div class="contents">
                                <h4>船文化博物馆</h4>
                                <span>栅堰路278号</span>
                            </div>
                            <i class="content-arrow"></i>
                        </div>
                    </li>
                </ul>
                <ul class="search-history">
                    <li>
                        <i class="history-search-icon"></i>
                        <span class="history-search-name">嘉兴市科技中心</span>
                    </li>
                    <li>
                        <i class="history-search-icon"></i>
                        <span class="history-search-name">嘉兴市科技中心</span>
                    </li>
                    <li>
                        <i class="history-search-icon"></i>
                        <span class="history-search-name">嘉兴市科技中心</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
const Swiper = require("../assets/script/util/swiper.min.js");
export default {
    data() {
        return {

        }
    },
    mounted() {
        document.body.scrollTop=0;
        new Swiper("#search-result", {
            slidesPerView: 3,
            spaceBetween: 13,
            observer:true
        })
    },
    methods: {

    }
}
</script>
<style src="../assets/css/baseNavigation.css" scoped></style>


