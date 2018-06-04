<template>
    <div class="user-content">
        <div class="user-top">
            <h3 class="title-tip">个人中心</h3>
            <!-- <go-back :topType="topType"></go-back> -->
        </div>
        <div class="user-info-head">
            <img src="" alt="avatar" class="avatar-img">
            <div class="user-name-info">
                <span class="user-name">经年</span>
                <span class="user-wechat-name">微信号：啊啊的十大</span>
            </div>
        </div>
        <div class="user-info-list">
            <div class="user-info-item">
                <span class="item-name">真实姓名</span>
                <span class="item-val user-real-name">小美</span>
            </div>
            <div class="user-info-item">
                <span class="item-name">性别</span>
                <span class="item-val user-gender">女</span>
            </div>
            <div class="user-info-item">
                <span class="item-name">手机号</span>
                <span class="item-val user-phone">13412345678</span>
            </div>
            <div class="user-info-item">
                <span class="item-name">所在区域</span>
                <span class="item-val user-area" @click="areaStatus = !areaStatus">点击设置区域</span>
            </div>
            <div class="area-list" v-if="areaStatus">
                <i class="arrow-top"></i>
                <div class="area-name" @click="checkArea(area.typeName)" v-for="(area, index) in arealist" :key="index">{{area.typeName}}</div>
            </div>
        </div>
        <div class="gray-bar"></div>
        <div class="user-active-info">
            <div class="active-item" @click="activePopStatus = !activePopStatus">
                <span class="active-name">活动记录</span>
            </div>
            <div class="active-item" @click="activePopStatus = !activePopStatus">
                <span class="active-name">红包记录</span>
            </div>
        </div>
        <div class="user-active-content" v-if="activePopStatus">
            <div class="user-update">
                <h4 class="update-title">标题</h4><i @click="activePopStatus = !activePopStatus" class="icon-close"></i>
                <div class="update-info-head">
                    <div class="update-left">
                        <span class="left-title">现金收益(元)</span>
                        <span class="left-title">3.8</span>
                    </div>
                    <div class="update-right">
                        <span class="update-right-text">共参加1次活动</span>
                        <span class="update-right-text">共抽奖1次</span>
                        <span class="update-right-text">共抽到幸运用户1次</span>
                    </div>
                </div>
                <div class="gray-bar-active"></div>
                <div class="active-list">
                    <h4>橙色五星代表幸运用户，实心则代表到达现场签到。</h4>
                    <ul class="active-list-info">
                        <li class="list-info-item">
                            <div class="list-count">
                                <span class="count">1</span>
                                <span class="active-date">2018-05-05</span>
                            </div>
                            <div class="list-active-info">
                                <span class="active-count-name">第1期<span>梅花洲科普</span></span>
                                <span class="active-redbag">抽到现金红包0.5元</span>
                                <i class="lucyk-star"></i>
                            </div>
                        </li>
                        <li class="list-info-item">
                            <div class="list-count">
                                <span class="count">2</span>
                                <span class="active-date">2018-05-05</span>
                            </div>
                            <div class="list-active-info">
                                <span class="active-count-name">第1期<span>梅花洲科普</span></span>
                                <span class="active-redbag">抽到现金红包0.5元</span>
                                <i class="lucyk-star star-active"></i>
                            </div>
                        </li>
                        <li class="list-info-item">
                            <div class="list-count">
                                <span class="count">3</span>
                                <span class="active-date">2018-05-05</span>
                            </div>
                            <div class="list-active-info">
                                <span class="active-count-name">第1期<span>梅花洲科普</span></span>
                                <span class="active-redbag">抽到现金红包0.5元</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import goBack from '../components/goBack';
//个人中心
export default {
  name: 'userCenter',
  data: () => ({
      areaStatus: false,
      activePopStatus: false,
      arealist:[]
  }),
  mounted() {
      this.getAreaList()
  },
  methods: {
    async getAreaList() {
        const that = this
        const { data } = await that.$http.get('/searchType?searchType=1')
        that.arealist = data.msg
    },
    checkArea(area) {
        console.log(area)
        this.areaStatus = false
    },
    closePop() {

    }
  },
  components: {
      goBack
  }
}
</script>
<style scoped>
.user-content {
    overflow: hidden;
    font-size: 0;
    line-height: 1;
    position: relative;
}
.user-top {
    position: relative;
    height: 1.33rem;
    background-color: #fff;
    font-size: 0;
    text-align: center;
}
.title-tip {
    color: #030000;
    font-size: .46rem;
    line-height: 1.04rem;
    width: 2.33rem;
    height: 1.04rem;
    text-align: center;
    background-size: 100% 100%;
    display: inline-block;
    margin-top: .18rem;
    background-image: url(../assets/images/title-bg.png);
}
.user-info-head {
    margin: .8rem .2rem 0 .5rem;
    padding-bottom: .2rem;
    border-bottom: 1px solid #ccc;
    display: flex;
}
.avatar-img {
    width: 1.58rem;
    height: 1.58rem;
}
.user-name-info {
    flex: 1;
    padding-left: .3rem;
    font-size: 0;
}
.user-name-info span {
    color: #252625;
    line-height: 1;
    display: inline-block;
    width: 100%;
}
.user-name {
    font-size: .42rem;
    padding-top: .34rem;
}
.user-wechat-name {
    font-size: .32rem;
    padding-top: .2rem;
}
.user-info-list {
    padding-top: .6rem;
    font-size: 0;
    line-height: 1;
    margin: 0 .2rem .2rem .5rem;
    position: relative;
}
.user-info-item {
    padding-bottom: .2rem;
    padding-top: .4rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}
.user-info-item span {
    display: inline-block;
    font-size: .34rem;
    line-height: 1;
}
.item-name {
    color: #4e4e4e;
    padding-left: .1rem;
}
.item-val {
    color: #7c7c7b;
    padding-right: .2rem;
}
.gray-bar {
    height: .2rem;
    background-color: #f8f8f7;
}
.user-active-info {
    font-size: 0;
    margin: 0 .2rem 0 .5rem;
}
.active-item {
    padding-bottom: .2rem;
    padding-top: .4rem;
    border-bottom: 1px solid #ccc;
    position: relative;
}
.active-name {
    color: #4e4e4e;
    line-height: 1;
    font-size: .32rem;
}
.active-name:after {
    content: "";
    width: .18rem;
    height: .18rem;
    border-top: 1px solid #4e4e4e;
    border-right: 1px solid #4e4e4e;
    position: absolute;
    right: .3rem;
    transform: rotate(45deg);
    margin-top: 4px;
}
.area-list {
    position: absolute;
    width: 92%;
    margin: 0 auto;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    padding: .2rem;
    flex-wrap: wrap;
    background-color: #e6e8e1;
    border-radius: 6px;
    z-index: 99;
}
.arrow-top {
    position: absolute;
    border-top: 10px solid transparent;
    border-right: 10px solid transparent;
    border-left: 10px solid transparent;
    border-bottom: 10px solid #e6e8e1;
    width: 0;
    height: 0;
    top: -0.38rem;
    right: .3rem;
    display: inline-block;
}
.area-name {
    background-color: #39f;
    color: #fff;
    font-size: .28rem;
    display: inline-block;
    line-height: 1;
    padding: .1rem .2rem;
    border-radius: 4px;
    letter-spacing: 2px;
    margin-right: .2rem;
    margin-top: .12rem;
}
.user-active-content {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .4);
    font-size: 0;
}
.user-update {
    width: 6.4rem;
    padding: .3rem 0;
    background-color: #fff;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: 1rem;
}
.update-title {
    text-align: center;
    font-size: .4rem;
    line-height: .8rem;
}
.update-info-head {
    display: flex;
    padding: 0 .3rem .2rem;
    border-top: 1px solid #ccc;
}
.update-left {
    padding-top: .3rem;
    font-size: 0;
}
.update-left span {
    display: inline-block;
    line-height: 1;
    width: 100%;
}
.left-title:nth-child(1) {
    font-size: .36rem;
    color: #9f9e9f;
}
.left-title:nth-child(2) {
    font-size: .46rem;
    color: #ee2521;
    padding-top: .1rem;
}
.update-right {
    flex: 1;
    text-align: right;
    color: #999;
    font-size: 0;
    padding-top: .2rem;
    line-height: 1;
}
.update-right span {
    display: inline-block;
    font-size: .24rem;
    padding-bottom: .1rem;
    width: 100%;
}
.update-right-text:last-child {
    padding-bottom: 0;
}
.gray-bar-active {
    height: .2rem;
    width: 100%;
    background-color: #eee;
}
.active-list h4 {
    font-size: .22rem;
    line-height: 1;
    color: #ccc;
    text-align: center;
    padding: .15rem 0;
    border-bottom: 1px solid #eee;
}
.active-list-info {
    font-size: 0;
    line-height: 1;
}
.list-info-item {
    padding: .3rem .2rem .2rem;
    display: flex;
}
.list-count > * {
    font-size: 0;
    display: inline-block;
    width: 100%;
    text-align: center;
}
.count {
    font-size: .34rem;
    font-weight: bold;
    color: #4e4e4e;
    padding-bottom: .26rem;
}
.active-date {
    font-size: .2rem;
    color: #a8a8a8;
}
.list-active-info {
    border-bottom: 1px solid #eee;
    flex: 1;
    position: relative;
    color: #4e4e4e;
    padding-left: .3rem;
    padding-bottom: .24rem;
}
.active-count-name {
    font-size: .24rem;
    line-height: 1;
    width: 100%;
    display: inline-block;
    padding-bottom: .24rem;
}
.active-count-name span {
    font-size: inherit;
    line-height: inherit;
    padding-left: .3rem;
}
.active-redbag {
    font-size: .24rem;
    line-height: 1;
}
.lucyk-star {
    width: .34rem;
    height: .34rem;
    display: inline-block;
    background-size: 100% 100%;
    background-image: url('../assets/images/star.png');
    transform: translate(360%,-66%);
}
.star-active {
    background-image: url('../assets/images/star2.png');
}
.icon-close {
    width: .34rem;
    display: inline-block;
    height: .34rem;
    background-size: 100% 100%;
    background-image: url(../assets/images/icon-close.png);
    right: .2rem;
    padding: 2px;
    top: .18rem;
    position: absolute;
}
</style>
