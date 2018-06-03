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
            <div class="active-item">
                <span class="active-name">活动记录</span>
            </div>
            <div class="active-item">
                <span class="active-name">红包记录</span>
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
    border-bottom: 1px solid #f0f1f0;
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
    border-bottom: 1px solid #f0f1f0;
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
    border-bottom: 1px solid #f0f1f0;
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
</style>
