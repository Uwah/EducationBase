<template>
    <div class="competitionDetail">
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
        <div class="tip-alert" v-if="tipSataus" @mousewheel="pageScroll">
            <div class="tip-content">
                <h2 class="tip-title">提示</h2>
                <span class="tip-info">参与答题有机会成为幸运用户，免费游览科普教育基地。距离活动答题结束时间还有{{endTime}}。</span>
                <button class="tip-confirm" @click="goSignUp">确定</button>
            </div>
        </div>
        <!-- 报名弹框  -->
        <div class="sginup-bg" v-if="signUpStatus" @mousewheel="pageScroll">
            <div class="sginup-frame">
                <h4 class="sginup-title">报名</h4><i @click="closeLogin" class="icon-close"></i>
                <form class="sginup-form" @submit.prevent="submitForm($event)">
                    <div class="ipt-content">
                        <input type="text" v-model="user.name" placeholder="请输入姓名" class="sginup-ipt" id="name-ipt" name="name">
                    </div>
                    <div class="ipt-content">
                        <input type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="user.phone" placeholder="请输入手机号" class="sginup-ipt" id="phone-ipt" name="phone">
                    </div>
                    <!-- <div class="ipt-content">
                        <input type="text" oninput="if(value.length>6)value=value.slice(0,6)" v-model="user.vfCode" placeholder="请输入验证码" class="sginup-ipt" id="vfcode-ipt" name="vfcode">
                        <span @click="sendVfcode" class="send-vfcode">{{vfCodeText}}</span>
                    </div> -->
                    <span class="error" v-if="errorTip">{{errorTipText}}</span>
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
import { clearTimeout, setTimeout, setInterval, clearInterval } from 'timers';
//判断登录状态 Vuex
var vfCount = 60;
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
                name: '',
                vfCode: ''
            },
            errorTip: false,
            errorTipText: '',
            answerStatus: false,
            prop: {
                status: false,
                text: ''
            },
            detailInfo: {},
            partakeInfo: {},
            tipSataus: false,
            vfCodeText: '发送验证码',
            vfCodeStatus: true,
            endTime: 0
        }
    },
    components: {
        goBack,
        propModel
    },
    mounted() {
        this.scienceInfo();
        const params = this.$route.params;
        if(params && params.endTime) {
            this.endTime = this.formatDate(params.endTime)
        }
    },
    methods: {
        scienceInfo() {
            const _this = this
            _this.$http.get('/getPsActivities').then( res => {
                _this.detailInfo = res.data.msg;
                // debugger
                if(!(_this.$route.params && _this.$route.params.endTime)) {
                    _this.endTime = _this.formatDate(_this.detailInfo.endTime)
                }
                _this.checkActiveAnswer(_this.detailInfo.id);
                document.body.scrollTop=0;
            }).catch( err => {
                console.log(err, 'getPsActivities')
            });
        },
        answer() {
            // debugger
            if((new Date().getTime() - 60000) > this.detailInfo.endTime) {
                this.$router.push({name: 'winnerList', params: {title: `第${this.detailInfo.periods}期`, id: this.detailInfo.id}})
                this.$http.get(`/addLuckeyUser?aid=${this.detailInfo.id}`).then(res => {console.log('end time')})
            } else {
                this.endTime = this.formatDate(this.detailInfo.endTime)
                this.tipSataus = !this.tipSataus
            }
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
            console.log('------------')
            let user = this.user, _this = this;
            if(user.phone.trim() !== '' && /^1(3|4|5|7|8)\d{9}$/.test(user.phone) && user.name.trim() !=='' && /[\u4e00-\u9fa5]/.test(user.name)) {
                _this.$http({
                    url: '/login',
                    method: 'post',
                    data: {
                        mobile: user.phone,
                        userName: user.name
                        // codeStr: user.vfCode
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
                    debugger;
                    if(res.data.code == 200) {
                        if(_this.detailInfo.endTime - new Date().getTime() < 61*1000) {
                            _this.prop.status = true;
                            _this.prop.text = '距离答题结束时间太近了，你无法参与答题，请关注下场活动';
                            _this.$http.get(`/addLuckeyUser?aid=${_this.detailInfo.id}`).then(res => {console.log('end time')})
                            setTimeout(() => {
                                _this.$router.push({name: 'indexHome'})
                                _this.prop.status = false;
                            }, 3000);
                        } else {
                            localStorage.setItem('userId', res.data.msg.id)
                            _this.signUpStatus = false;
                            _this.answerStatus = false;
                            _this.$router.push({name: "answerList", params:{id: _this.detailInfo.id}});
                        }
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
                    _this.errorTipText = '手机号或姓名有误';
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
            e.preventDefault()
        },
        sendVfcode() {
            const that = this
            const user = that.user
            if(that.vfCodeStatus) {
                if(user.phone.trim() !== '' && /^1(3|4|5|7|8)\d{9}$/.test(user.phone)) {
                    that.vfCodeStatus = false;
                    that.$http({
                        url: '/codeMobile',
                        method: 'post',
                        data: {
                            mobile: user.phone
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
                    }).then(res => {

                    })
                    var timer = setInterval(() => {
                        vfCount--
                        if(vfCount > 0) {
                            that.vfCodeText = vfCount + '秒后重新发送'
                        } else {
                            clearInterval(timer)
                            vfCount = 60
                            that.vfCodeText = '重新发送'
                            that.vfCodeStatus = true
                        }
                    }, 1000)
                } else {
                    that.errorTip = true;
                    let timer = setTimeout(() => {
                        that.errorTip = false;
                        that.errorTipText = '手机号格式不对'
                        return false;
                    }, 3000);
                }
            }
        },
        formatDate(seconds) {
            var timeStr = '';
            if(seconds) {
                var nd = new Date().getTime(),
                    distTime = seconds - nd, dDate = '', dHour = '', dMin ='';
                dDate = Math.floor(distTime/86400000)
                distTime -= dDate*86400000;
                dHour = Math.floor(distTime/3600000);
                distTime -= dHour*3600000;
                dMin = Math.floor(distTime/60000);
                dDate = dDate < 10 ? '0' + dDate : dDate;
                dHour = dHour < 10 ? '0' + dHour : dHour;
                dMin = dMin < 10 ? '0' + dMin : dMin;
                if (parseInt(dDate) > 0) {
                    timeStr += dDate + '天';
                }
                if(parseInt(dHour) > 0) {
                    timeStr += dHour + '时';
                }
                if(parseInt(dMin) > 0) {
                    timeStr += dMin + '分';
                }
            }
            return timeStr;
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
        width: 5.6rem;
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
        padding: 0 1rem;
        text-align: left;
    }
    .tip-confirm {
        border: 0;
        color: #fff;
        border-radius: 5px;
        width: 1.5rem;
        height: .5rem;
        margin-top: .2rem;
        display: inline-block;
        background-color: #0068b7;
    }
    .sginup-form {
        margin-top: .1rem;
    }
    .send-vfcode {
        border: 0;
        color: #0068b7;
        font-size: .22rem;
        line-height: 1;
        text-align: center;
        display: inline-block;
        background-color: transparent;
        border-left: 1px solid #3d3d3d;
        position: absolute;
        padding: .12rem .28rem;
        top: .4rem;
        right: .6rem;
    }
</style>
