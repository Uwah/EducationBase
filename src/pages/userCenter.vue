<template>
    <div class="user-content">
        <div class="user-top">
            <h3 class="title-tip">个人中心</h3>
            <!-- <go-back :topType="topType"></go-back> -->
        </div>
        <div class="user-info-head">
            <img :src="user.headimgurl" alt="avatar" class="avatar-img">
            <div class="user-name-info">
                <!-- <span class="user-name">{{user.nickName}}</span> -->
                <span class="user-wechat-name">{{user.nickName}}</span>
            </div>
        </div>
        <div class="user-info-list">
            <div class="user-info-item">
                <span class="item-name">真实姓名</span>
                <span class="item-val user-real-name" @click="updateOtherInfo('userName', user.userName)">{{user.userName}}</span>
            </div>
            <div class="user-info-item">
                <span class="item-name">性别</span>
                <span class="item-val user-gender">{{user.sex == 0 ? '女':'男'}}</span>
            </div>
            <div class="user-info-item">
                <span class="item-name">手机号</span>
                <span class="item-val user-phone" @click="updateOtherInfo('mobile', user.mobile)">{{user.mobile}}</span>
            </div>
            <div class="user-info-item" @click="areaStatus = !areaStatus">
                <span class="item-name">所在区域</span>
                <span class="item-val user-area" >{{user.area == null?'点击设置区域':user.area}}</span>
            </div>
            <div class="area-list" v-if="areaStatus">
                <i class="arrow-top"></i>
                <div class="area-name" @click="checkArea(area.typeName)" v-for="(area, index) in arealist" :key="index">{{area.typeName}}</div>
            </div>
        </div>
        <div class="gray-bar"></div>
        <div class="user-active-info">
            <div class="active-item" @click="activeRecord">
                <span class="active-name">活动记录</span>
            </div>
            <!-- <div class="active-item" @click="activePopStatus = !activePopStatus">
                <span class="active-name">红包记录</span>
            </div> -->
        </div>
        <div class="user-active-content" v-if="activePopStatus">
            <div class="user-update">
                <h4 class="update-title">标题</h4><i @click="activePopStatus = !activePopStatus" class="icon-close"></i>
                <div class="update-info-head">
                    <div class="update-left">
                        <span class="left-title">现金收益(元)</span>
                        <span class="left-title">0</span>
                    </div>
                    <div class="update-right">
                        <span class="update-right-text">共参加{{activeList.length}}次活动</span>
                        <!-- <span class="update-right-text">共抽奖1次</span> -->
                        <span class="update-right-text">共抽到幸运用户0次</span>
                    </div>
                </div>
                <div class="gray-bar-active"></div>
                <div class="active-list">
                    <h4>橙色五星代表幸运用户，实心则代表到达现场签到。</h4>
                    <ul class="active-list-info" v-if="activeList.length > 0">
                        <li class="list-info-item" v-for="(item, i) in activeList" :key="i">
                            <!-- 后台数据暂未定 -->
                            <!-- <div class="list-count">
                                <span class="count">1</span>
                                <span class="active-date">2018-05-05</span>
                            </div>
                            <div class="list-active-info">
                                <span class="active-count-name">第1期<span>梅花洲科普</span></span>
                                <span class="active-redbag">抽到现金红包0.5元</span>
                                <i class="lucyk-star"></i>
                            </div> -->
                        </li>
                        <!-- <li class="list-info-item">
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
                        </li> -->
                    </ul>
                    <div v-else>暂无数据</div>
                </div>
            </div>
        </div>
        <div class="update-other" v-if="otherStatus">
            <div class="update-other-content">
                <label for="uoid">{{info.typeName}}：</label><input type="text" id="uoid" v-model="info.val">
                <span v-if="info.status" class="warn-tip">手机号不正确</span>
                <div class="uo-btns">
                    <button class="uo-confirm" @click="confirmUpdate(info.type)">确定</button>
                    <button class="uo-cancel" @click="otherStatus = !otherStatus">取消</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import goBack from '../components/goBack';
//个人中心
const qs = require('qs')
// oJXlhwDq3zLUfbt30A29RLwBoTPs
//getUserAnswerList活动记录 wechatId
// 、、updateUser 修改信息 wechatId area 区域   userName 姓名   mobile 手机号
export default {
  name: 'userCenter',
  data: () => ({
      areaStatus: false,
      activePopStatus: false,
      otherStatus: false,
      info: {
          typeName: '姓名',
          type: 'userName',
          val: '',
          status: false
      },
      user:{
          headimgurl: '',
          nickName: '',
          sex: '1',
          area: '',
          mobile: '',
          name: '',
          wechatId: '',
          userName: ''
      },
      activeList: [],
      arealist:[]
  }),
  mounted() {
      this.getAreaList()
      this.getUserInfo()
  },
  methods: {
    async getAreaList() {
        const that = this
        const { data } = await that.$http.get('/searchType?searchType=1')
        that.arealist = data.msg
    },
    async getUserInfo() {
        const that = this
        const { data } = await that.$http.post('/queryUserInfo', qs.stringify({
                    wechatId: localStorage.getItem('openId')
                }),{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
            })
        if(data.code === "200") {
            ['headimgurl', 'area', 'mobile', 'name', 'nickName', 'sex', 'wechatId', 'userName'].forEach(item => {
                this.user[item] = data.user[item]
            })
        }
        console.log(data)
    },
    checkArea(area) {
        console.log(area)
        this.areaStatus = false
        this.otherStatus = false
        this.info.val = area
        this.user.area = area
        this.$http.post('/updateUser', qs.stringify({
            area : area,
            wechatId: this.user.wechatId
            }),{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
        }).then( res => {
            console.log(res)
        })
    },
    updateOtherInfo(type, val) {
        this.otherStatus = !this.otherStatus
        this.info = {
            type: type,
            typeName: type === 'userName'?'姓名':'手机号'
        }
        if(type === 'mobile') {
            if(val) {
                if( /^1(3|4|5|7|8)\d{9}$/.test(val)) {
                    this.info.val = val
                } else {
                    this.info.status = true
                }
            }
        } else {
            this.info.status = false
        }
        console.log(type)
    },
    confirmUpdate(type) {
        if(this.info.status === true) {
            return
        } else {
            this.otherStatus = !this.otherStatus
            this.user[type] = this.info.val
            // 请求代码仍需优化
            
            if(type === 'userName') {
                this.$http.post('/updateUser', qs.stringify({
                    userName : this.info.val,
                    wechatId: this.user.wechatId
                    }),{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).then( res => {
                    console.log(res)
                })
            } else if(type === 'mobile') {
                this.$http.post('/updateUser', qs.stringify({
                    mobile : this.info.val,
                    wechatId: this.user.wechatId
                    }),{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                }).then( res => {
                    console.log(res)
                })
            }
        }
    },
    async activeRecord() {
        const { data } = await this.$http.post('/getUserAnswerList', qs.stringify({
            wechatId: this.user.wechatId
            }),{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'}})
        console.log(data)    

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
    min-height: 600px;
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
    padding-top: 1rem;
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
.user-real-name, .user-phone {
    padding-right: .3rem;
}
.user-real-name:after, .user-phone:after {
    content: "";
    width: .16rem;
    height: .16rem;
    border-top: 1px solid #4e4e4e;
    border-right: 1px solid #4e4e4e;
    position: absolute;
    transform: rotate(45deg);
    margin-top: 4px;
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
.user-active-content,.update-other {
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
.warn-tip {
    font-size: .24rem;
    line-height: 1;
    color: #ee2521;
    display: inline-block;
    padding-top: .2rem;
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
.update-other-content {
    background-color: #fff;
    width: 80%;
    padding: .5rem .3rem .3rem;
    font-size: 0;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 4px;
}
.update-other-content label {
    font-size: .32rem;
    line-height: 1;
    color: #4e4e4e;
}
.update-other-content input {
    padding: .1rem;
    font-size: .28rem;
    width: 72%;
    color: #4e4e4e;
    border: 0;
    border-bottom: 1px solid #4e4e4e;
}
.uo-btns {
    margin-top: .5rem;
    display: flex;
    justify-content: space-around;
}

.uo-btns button {
    border: 0;
    font-size: .28rem;
    line-height: 1;
    padding: .14rem .34rem;
    border-radius: 4px;
}
.uo-confirm {
    background-color: #39f;
    color: #fff;
}
</style>
