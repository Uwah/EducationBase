<template>
    <div class="out" v-show="isShowSearch">
        <div class="knowledge-search" v-show="isShowSearchForm">
            <form :action="actionUrl" @submit="submitSearch($event)" class="search-form">
                <input type="search" v-model="keyword" name="knowledge-search" id="nvg-search" :placeholder="searchHolder">
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
            keyword: "",
            formStatus: false,
            holder: ''

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
        topType: {
            type: Number,
            require: false,
            default: 0
        },
        isShowSeachIcon:{
            type: Boolean,
            require: false,
            default: true
        },
        searchHolder: {
            type: String,
            require: false,
            default: "请输入基地名称"
        }
    },
    mounted(){
        this.formStatus = this.isShowSearchForm;
        this.holder = this.searchHolder;
    },
    methods: {
        
        getSearchInfo(e) {
            let _this = this;
            console.log(_this.keyword)
            if(_this.isShowSearchForm === false) {
                _this.$emit("search-data", '');
            } else {
                _this.$emit("search-data", _this.keyword);
            }
            // console.log(_this.keyword);
            // if(_this.keyword) {
            //     _this.$http.get('/topSeach', {
            //         params: {
            //             topType: _this.topType,
            //             title: _this.keyword
            //         }
            //     }).then( res => {
            //         console.log(res)
            //         _this.$emit("search-data", res.data.msg);
            //     }).catch( err => {
            //         _this.$emit("search-data", err);
            //         console.log(err);
            //     })
            // }
            
            // this.$http.get('').then(res => {
            //     _this.$emit("search-data", res);
            // }).catch( err => {
            //     console.error("查询失败", err);
            // });
        },
        submitSearch(e) { //手机键盘搜索按键处理...
            let keycode = e.keyCode;
            if(e.type === 'submit' || keycode == 13) {
                e.preventDefault();
                this.$emit("search-data", this.keyword);
            }
        }
    },
    watch: {
        formStatus: function(newVal, oldVal) {
            console.log(newVal, oldVal);
        },
        searchHolder: function(nv, ov) {
            this.holder = nv;
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

