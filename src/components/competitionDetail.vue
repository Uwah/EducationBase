<template>
    <div class="competitionDetail">
        <div class="knowledge-top">
            <h3 class="title-tip seasion-count">知识竞赛</h3>
            <go-back></go-back>
        </div>
        <div class="knowledge-content">
            <div class="konwledge-bg">
                <span>2017年XXXX</span>
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
                <button class="partake">立即参与</button>
            </div>
        </div>
        <!-- 报名弹框  -->
        <div class="sginup-bg" style="display: none;">
            <div class="sginup-frame">
                <h4 class="sginup-title">报名</h4>
                <form action="" class="sginup-form"  method="post">
                    <div class="ipt-content">
                        <label for="phone-ipt">手机号</label>
                        <input type="number" placeholder="请输入手机号" class="sginup-ipt" id="phone-ipt" name="phone">
                    </div>
                    <div class="ipt-content">
                        <label for="phone-ipt">姓名</label>
                        <input type="number" placeholder="请输入姓名" class="sginup-ipt" id="name-ipt" name="name">
                    </div>
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
            searchStatus: false
        }
    },
    components: {
        goBack
    },
    methods: {
        searchInfoData(e) {
            console.log(e);
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
        border: 0;
        color: #fff;
        margin: 0 auto;
        display: block;
    }
</style>
