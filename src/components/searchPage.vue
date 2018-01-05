<template>
    <div class="searchPage">
        <!-- <div class="sp-title">
            <go-back></go-back>
            <search :actionUrl="actionUrl" :topType="topType" @search-data="searchData" :isShowSearch="isShowSearch" 
            :isShowSearchForm="isShowSearchForm" :isShowSearchIcon="isShowSearchIcon"></search>
        </div> -->
        <div id="map-area"></div>
        <div id="result-list"></div>
    </div>
</template>
<script>
import search from './search';
import goBack from './goBack';
export default {
    data() {
        return {
            actionUrl: "",
            isShowSearch: true,
            isShowSearchForm: true,
            isShowSearchIcon: true,
            banners: {},
            type: 1,
            topType: 3
        }
    },
    components: {
        goBack,
        search
    },
    mounted() {
        // debugger
        this.renderMapcontent();

    },
    methods: {
        renderMapcontent() {
            let params = this.$route.params;
            console.log(params.address)
            let map = new BMap.Map('map-area');
            map.centerAndZoom(new BMap.Point(113.96, 22.67), 11);
            let local = new BMap.LocalSearch(map, {
                renderOptions: {map: map, panel: 'result-list'}
            });
            local.search(params.address);
        }
    }
}
</script>
<style scoped>
    .sp-title {
        position: relative;
        height: 1.33rem;
        background-color: #fff;
        font-size: 0;
        text-align: center;
    }
    #map-area {
        height: 7.5rem;
    }
    #result-list {
        width: 100%;
        height: 4.58rem;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
