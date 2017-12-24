<template>
    <div class="out" v-show="isShowSearch">
        <div class="knowledge-search" v-show="isShowSearchForm">
            <form :action="actionUrl" class="search-form">
                <input type="search" v-model="keyword" name="knowledge-search" id="nvg-search" placeholder="请输入基地名称">
            </form>
        </div>
        <i class="search-icon" v-show="isShowSeachIcon" @click="getSearchInfo"></i>
    </div>
    
</template>
<script>
export default {
    name: "search",
    data() {
        return {
            keyword: ""
        }
    },
    props: {
        actionUrl: {
            type: String,
            require: true,
            default: ""
        },
        isShowSearch: {
            type: Boolean,
            require: true,
            default: false
        },
        isShowSearchForm: {
            type: Boolean,
            require: false,
            default: true
        },
        isShowSeachIcon:{
            type: Boolean,
            require: false,
            default: true
        }
    },
    mounted(){
    },
    methods: {
        
        getSearchInfo(e) {
            let _this = this;
            
            console.log(_this.keyword);
            _this.$emit("search-data", _this.keyword);
            // this.$http.get('').then(res => {
            //     _this.$emit("search-data", res);
            // }).catch( err => {
            //     console.error("查询失败", err);
            // });
        }
    }
}
</script>
<style scoped>
    .out {
        font-size: 0;
    }
    .knowledge-search {
        display: inline-block;
        width: 4.5rem;
        height: .56rem;
        margin-top: .4rem;
    }
    .search-form {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 9;
    }
    #nvg-search {
        width: 100%;
        height: 100%;
        border: 0;
        color: #9d9d9e;
        background-color: #f6f6f7;
        padding-left: .32rem;
        border-top-right-radius: .26rem;
        border-bottom-right-radius: .26rem;
        border-top-left-radius: .26rem;
        border-bottom-left-radius: .26rem;
    }
    .search-icon {
        display: inline-block;
        width: .44rem;
        height: .42rem;
        background-image: url(../assets/images/search.png);
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: .3rem;
    }
</style>

