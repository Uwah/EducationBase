<template>
    <div class="competitionDetail" @mousewheel="pageScroll">
        <div class="knowledge-top">
            <h3 class="title-tip seasion-count">知识竞赛</h3>
            <go-back :topType="topType"></go-back>
        </div>
        <div class="knowledge-content">
            <div class="konwledge-bg" :style="{backgroundImage: `url(${detailInfo.fileName})`}"></div>
            <div class="konwledge-detail info-detail">
                <div>
                    <div v-html="detailInfo.indiProfile"></div>
                    <button class="partake" @click="answer">立即参与</button>
                </div>
                
            </div>
        </div>
        <!-- 抽奖提示弹框 -->
        <div class="tip-alert" v-if="tipSataus">
            <div class="tip-content">
                <h2 class="tip-title">提示</h2>
                <span class="tip-info">答完三道题后可以被抽取为幸运用户获得免费参与科普基地。</span>
                <button class="tip-confirm" @click="goSignUp">确定</button>
            </div>
        </div>
        <!-- 报名弹框  -->
        <div class="sginup-bg" v-if="signUpStatus">
            <div class="sginup-frame">
                <h4 class="sginup-title">报名</h4><i @click="closeLogin" class="icon-close"></i>
                <form class="sginup-form" @submit.prevent="submitForm($event)">
                    <div class="ipt-content">
                        <label for="phone-ipt">手机号</label>
                        <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="user.phone" placeholder="请输入手机号" class="sginup-ipt" id="phone-ipt" name="phone">
                    </div>
                    <div class="ipt-content">
                        <label for="phone-ipt">姓名</label>
                        <input type="text" v-model="user.name" placeholder="请输入姓名" class="sginup-ipt" id="name-ipt" name="name">
                    </div>
                    <span class="error" v-if="errorTip">手机号或姓名输入有误</span>
                    <button type="submit" class="sgin-commit">提交</button>
                </form>
            </div>
        </div>
        <prop-model :showStatus="prop.status" :propText="prop.text"></prop-model>
    </div>
</template>
<script>

import goBack from './goBack';
import propModel from './propModel';
//判断登录状态 Vuex
export default {
    data() {
        return {
            title: "知识竞赛",
            titleStatus: true,
            searchStatus: false,
            signUpStatus: false,
            topType: 4,
            user: {
                phone: '',
                name: ''
            },
            errorTip: false,
            answerStatus: false,
            prop: {
                status: false,
                text: ''
            },
            detailInfo: {},
            partakeInfo: {},
            tipSataus: false
        }
    },
    components: {
        goBack,
        propModel
    },
    mounted() {
        this.scienceInfo();  
    },
    methods: {
        scienceInfo() {
            this.$http.get('/getPsActivities').then( res => {
                this.detailInfo = res.data.msg;
                this.checkActiveAnswer(this.detailInfo.id);
                document.body.scrollTop=0;
            }).catch( err => {
                console.log(err, 'getPsActivities')
            });
        },
        answer() {
            this.tipSataus = !this.tipSataus
        },
        goSignUp(e) {
            //根据getPsActivities 返回id用knowledgeCompetition查当前按钮点击情况
            // this.signUpStatus = true;
            console.log('goSignUp')
            this.tipSataus = !this.tipSataus;
            if(this.partakeInfo.code == 200) {
                this.$router.push({name: "answerList", params:{id: this.detailInfo.id}});
            } else if(this.partakeInfo.code == 1) {
                this.prop.status = true;
                this.prop.text = this.partakeInfo.msg;
                setTimeout(() => {
                    this.prop.status = false;
                }, 3000);   
            } else if(this.partakeInfo.code == 2) {
                this.signUpStatus = true;
            } else {
                this.prop.status = true;
                this.prop.text = '服务异常，请联系管理员';
                setTimeout(() => {
                    this.prop.status = false;
                }, 3000);
            }
        },
        closeLogin() {
             this.signUpStatus = false;
        },
        submitForm(evt) {
            evt.preventDefault();
            let user = this.user, _this = this;
            if(user.phone.trim() !== '' && /^1(3|4|5|7|8)\d{9}$/.test(user.phone) && user.name.trim() !=='' && /[\u4e00-\u9fa5]/.test(user.name)) {
                _this.$http({
                    url: '/login',
                    method: 'post',
                    data: {
                        mobile: user.phone,
                        userName: user.name
                    },
                    transformRequest: [function (data) {//数据发送到服务器之前key,value处理并用‘&’隔开，ps:数组中最后一个函数必须返回一个字符串
                        let ret = ''
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then( res => {
                    console.log(res);
                    // debugger;
                    if(res.data.code == 200) {
                        localStorage.setItem('userId', res.data.msg.id)
                        _this.signUpStatus = false;
                        _this.answerStatus = false;
                        _this.$router.push({name: "answerList", params:{id: _this.detailInfo.id}});
                    } else if(res.data.code == 1) {
                        _this.prop.status = true;
                        _this.signUpStatus = false;
                        _this.prop.text = res.data.msg;
                        setTimeout(() => {
                            _this.prop.status = false;
                        }, 3000);   
                    }
                }).catch(err => {
                    console.log(err, "login");
                });
            } else {
                _this.errorTip = true;
                let timer = setTimeout(() => {
                    _this.errorTip = false;
                    return false;
                }, 3000);
            }
        },
        checkActiveAnswer(id) {
            this.$http.get(`/knowledgeCompetition?id=${id}`).then( res => {
                console.log(res)
                this.partakeInfo = res.data;
            }).catch(err => {
                console.log(err);
            })
        },
        pageScroll(e) {
            // e.preventDefault()
            console.log(e)

        }
    }
}
</script>
<style scoped>
    @import url('../assets/css/knowledgeShow.css');
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
    .knowledge-content {
        font-size: 0;
        position: relative;
    }
    .konwledge-bg {
        height: 4.13rem;
        background-size: 100% 100%;
    }
    .konwledge-detail {
        /* max-height: 12.14rem; */
        background-image: url(../assets/images/know-bg.png);
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;
        /* margin-bottom: 1.23rem; */
        color: #3e3a39;
        font-size: 0;
        min-height: 6.67rem;
        height: auto;
    }
    .info-detail {
        padding: 1rem .7rem 0;
        position: relative;
        display: flex;
        flex-direction: column;
    }
    .konwledge-detail div {
        font-size: .24rem;
        line-height: 1.2;
        padding-bottom: 2px;
        flex: 1;
    }
    .konwledge-detail img {
        max-width: 100% !important;
    }
    .knowledge-unit {
        color: #3e3a39;
        font-size: 0;
        padding-left: .64rem;
        padding-bottom: .74rem;
    }
    .unit-list, .show-info, .sign-up-method,.prizes {
        padding-top: .4rem;
    }
    .unit-list li, .unit-name, .show-info, .show-time, .sign-up-method, 
    .prizes span, .prizes-list li{
        font-size: .24rem;
        line-height: 1;
    }
    .unit-name,.show-time {
        padding-left: .1rem;
    }
    .unit-list li,.prizes-list li {
        padding-bottom: .1rem;
    }
    .unit-list li:last-child,.prizes-list li:last-child {
        padding-bottom: 0;
    }
    .show-info,.sign-up-method,.prizes-list li {
        display: inline-block;
        width: 100%;
    }
    .prizes {
        font-size: 0;
    }
    .prizes span,.prizes-list {
        display: inline-block;
        vertical-align: top;
    }
    .prizes-list {
        padding-left: .1rem;
    }
    .partake {
        width: 5.3rem;
        height: 1.06rem;
        line-height: 1.06rem;
        font-size: .54rem;
        letter-spacing: 5px;
        text-align: center;
        background-color: rgba(59, 87, 155, .7);
        border: 0;
        border-top-left-radius: 0.503rem;
        border-top-right-radius: 0.503rem;
        border-bottom-left-radius: 0.503rem;
        border-bottom-right-radius: 0.503rem;
        color: #fff;
        margin-top: .3rem;
        margin-bottom: 1.47rem;
    }
    .error {
        color: #fe0000;
        display: inline-block;
        font-size: .24rem;
        line-break: 1;
        padding-top: .1rem;
        padding-left: .5rem;
    }
    .icon-close {
        width: .34rem;
        display: inline-block;
        height: .34rem;
        background-size: 100% 100%;
        background-image: url(../assets/images/icon-close.png);
        right: .2rem;
        padding: .06rem;
        position: absolute;
        top: .2rem;
    }
    .tip-alert {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, .6);
    }
    .tip-content {
        background-color: #fff;
        color: #4e4e4e;
        width: 5.7rem;
        height: 3.86rem;
        border-radius: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        font-size: 0;
    }
    .tip-title {
        font-size: .56rem;
        line-height: 1;
        text-align: center;
        padding: .4rem 0;
    }
    .tip-info {
        font-size: .32rem;
        line-height: 1.2;
        display: inline-block;
        padding: 0 .8rem;
        text-align: left;
        padding-bottom: .3rem;
    }
    .tip-confirm {
        border: 0;
        color: #fff;
        border-radius: 5px;
        width: 1.5rem;
        height: .5rem;
        display: inline-block;
        background-color: #0068b7;
    }
</style>
