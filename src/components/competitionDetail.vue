<template>
    <div class="competitionDetail">
        <div class="knowledge-top">
            <h3 class="title-tip seasion-count">知识竞赛</h3>
            <go-back></go-back>
        </div>
        <div class="knowledge-content">
            <div class="konwledge-bg">
                <!-- <span>2017年XXXX</span> -->
            </div>
            <div class="konwledge-detail info-detail">
                <p>
                    在国家大力提倡科技兴国，教育兴国的大背景下,在**市大力加强初高中青少年的文化知识尤其是科学知识的教育环境下，由**市科协发起，
                    与市教育局联合**市多所初中高中院校主办开展科学知识竞赛活动，由北京博安文化传播有限公司做大赛承办方。
                </p>
                <p>
                    全市初中及高中院校学生正处在人生最重要的学习成长阶段，是祖国未来一代社会中坚力量的关键准备期人才，是**市社会经济文化建设的接班人和未来力量。
                </p>
                <p>
                    初中及高中院校学生正面临中考高考，需要加强学习补充各方面科学知识，本次科普知识竞赛的内容丰富，包括生物、人文、地理、物理、化学、天文历史等等。
                </p>
                <p>
                    科普知识竞赛以生动活泼的方式，寓教于乐的特点，紧贴实事，普及科技前沿的理念，让参赛的同学能够领略无穷的乐趣，沐浴在浩瀚的知识海洋之中。
                </p>
                <div class="knowledge-unit">
                    <ul class="unit-list">
                        <li>主办单位:<span class="unit-name">***教育局</span><span class="unit-name">***科技协会</span></li>
                        <li>承办单位:<span class="unit-name">***有限公司(**分公司)</span></li>
                        <li>赞助单位:<span class="unit-name">***有限公司</span></li>
                    </ul>
                    <span class="show-info">竞赛时间:<span class="show-time">2017年10月1日-2017年11月1日</span></span>
                    <span class="sign-up-method">报名方式: 点击页面下方“立即参与”</span>
                    <div class="prizes">
                        <span>奖项设立:</span>
                        <ul class="prizes-list">
                            <li>一等奖:</li>
                            <li>二等奖:</li>
                            <li>三等奖:</li>
                        </ul>
                    </div>
                </div>
                <button class="partake" @click="goSignUp" v-if="answerStatus">立即参与</button>
            </div>
        </div>
        <!-- 报名弹框  -->
        <div class="sginup-bg" v-if="signUpStatus">
            <div class="sginup-frame">
                <h4 class="sginup-title">报名</h4>
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
    </div>
</template>
<script>

import goBack from './goBack';
//判断登录状态 Vuex
export default {
    data() {
        return {
            title: "知识竞赛",
            titleStatus: true,
            searchStatus: false,
            signUpStatus: false,
            user: {
                phone: '',
                name: ''
            },
            errorTip: false,
            answerStatus: false
        }
    },
    components: {
        goBack
    },
    mounted() {
        if(!!localStorage.getItem('userId')) {
            this.answerStatus = false;
        } else {
            this.answerStatus = true;
        }    
    },
    methods: {
        searchInfoData(e) {
            console.log(e);
        },
        goSignUp(e) {
            this.signUpStatus = true;
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
                    transformRequest: [function (data) {
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
                    if(res.data.code == 200) {
                        localStorage.setItem('userId', res.data.msg.id)
                        this.checkActiveAnswer(18);
                    }
                }).catch(err => {
                    console.log(err, "login");
                });
            } else {
                this.errorTip = true;
                let timer = setTimeout(() => {
                    this.errorTip = false;
                    return false;
                }, 3000);
            }
        },
        checkActiveAnswer(id) {
            this.$http.get(`/knowledgeCompetition?id=${id}`).then( res => {
                console.log(res)
                if(res.data.code == 200) {
                    this.$router.push({name: "answerList", params:{id: 18}});
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>
    .knowledge-content {
        font-size: 0;
        position: relative;
    }
    .konwledge-bg {
        height: 4.13rem;
        background-image: url(../assets/images/konwledge-bg.png);
        background-size: 100% 100%;
    }
    .konwledge-bg span {
        color: #fff;
        font-size: .26rem;
        line-height: 1;
        padding-top: .3rem;
        padding-left: .3rem;
    }
    .konwledge-detail {
        height: 12.14rem;
        background-image: url(../assets/images/know-bg.png);
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;
        margin-bottom: 1.23rem;
        color: #3e3a39;
        font-size: 0;
    }
    .info-detail {
        padding: 1.3rem .8rem 0;
    }
    .konwledge-detail p {
        font-size: .24rem;
        line-height: 1.2;
        text-indent: .4rem;
        padding-bottom: 2px;
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
        margin: 0 auto;
        display: block;
    }
    .error {
        color: #fe0000;
        display: inline-block;
        font-size: .24rem;
        line-break: 1;
        padding-top: .1rem;
        padding-left: .5rem;
    }
</style>
