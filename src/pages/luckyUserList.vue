<template>
    <!-- 幸运用户列表 -->
    <div class="lucky-out">
        <div class="lucky-content">
            <div class="lucky-head">
                <go-back></go-back>
                <div class="last-phase">上一期</div>
            </div>
            <div class="lucky-content-list">
                <ul class="luckyList">
                    <li class="lucky-user" v-for="(item, index) in luckyList" :key="index">
                        <span class="lucky-user-info">{{item.name}}</span>
                        <span class="lucky-user-info">{{item.phone}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <!-- flex 弹性盒子贴底 -->
        <div class="lucky-footer">
            <span class="lucky-tip">请以上幸运用户在{{visiTime}}前前往{{museumName}}扫码免费参观</span>
            <span class="copy-right">本活动最终解释权由嘉兴科普教育基地所有</span>
        </div>
    </div>
</template>
<script>
import goBack from '../components/goBack'
export default {
    name: 'luckyUserList',
    data: () => ({
        luckyList: [
            {name: '小明', phone: '13434344343'},
            {name: '小明', phone: '13434344343'},
            {name: '小明', phone: '13434344343'},
            {name: '小明', phone: '13434344343'},
            {name: '小明', phone: '13434344343'},
            {name: '小明', phone: '13434344343'}
        ],
        visiTime: '5月30日',
        museumName: '城市博物馆'
    }),
    components: {
        goBack
    },
    filter: {

    }
}
</script>
<style>
    #app {
        height: 100%;
        padding: 0;
        margin: 0;
    }
    #bottomNav {
        display: none;
    }
    .lucky-content {
        width: 100%;
        height: 100%;
        background-image: url(../assets/images/lucky-user.png);
        background-size: cover;
        font-size: 0;
        overflow-y: auto;
        position: relative
    }
    .lucky-head {
        height: 2.05rem;
        width: 100%;
    }
    .last-phase {
        width: 1.6rem;
        height: .6rem;
        background-color: #004eb6;
        color: #fff;
        line-height: 1;
        font-size: .3rem;
        padding: .15rem 0 .15rem .06rem;
        border-top-right-radius: .3rem;
        border-bottom-right-radius: .3rem;
    }
    .lucky-content-list {
        font-size: 0;
        padding-top: 2.68rem;
    }
    .luckyList {
        font-size: 0;
        padding: 0 .74rem;
    }
    .lucky-user {
        font-size: 0;
        background-color: #e2e9f7;
        border-radius: 5px;
        margin-bottom: .2rem;
        display: flex;
        justify-content: space-around;
    }
    .lucky-user:last-child {
        margin-bottom: 0;
    }
    .lucky-user-info {
        color: #194f90;
        font-size: .34rem;
        display: inline-block;
        line-height: 1;
        padding: .36rem 0;
    }
    .lucky-footer {
        font-size: 0;
        position: absolute;
        left: 0;
        bottom: 0;
        margin-bottom: .42rem;
    }
    .lucky-tip {
        color: #0e375b;
        font-size: .26rem;
        line-height: 1;
        padding: .12rem 0 .1rem 0;
        display: inline-block;
        width: 100%;
        text-align: center;
    }
    .copy-right {
        font-size: .22rem;
        line-height: 1;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #155996;
    }
</style>
