<template>
    <div class="answerList-content" @mousewheel="notWheel">
        <div class="knowledge-top">
            <h3 class="answer-title-tip seasion-count">{{anwserObj.title}}</h3>
            <go-back :topType="topType"></go-back>
        </div>
        <div class="answer-content">
            <!-- 二期答题需求start -->
            <div class="answer-totast" v-if="anwserObj.questions">
                <div class="answer-totast-head">
                    <i class="clock"></i>
                    <span class="answer-time">{{answerTime}}s</span>
                </div>
                <div class="answer-totast-item">
                    <span class="totast-item-title">{{answerIndex+1 + '、' +anwserObj.questions[answerIndex].title}}</span>
                    <ul class="totast-item-list">
                        <li v-for="(item, index) in anwserObj.questions[answerIndex].qids" 
                        @click="anwserActive2(anwserObj.questions[answerIndex].answer, item.titleLetter, index, anwserObj.questions[answerIndex].id, $event)"
                        :key="index" :id="'r-' + anwserObj.questions[answerIndex].answer">{{item.titleLetter + '、' + item.titleChinese}} </li>
                    </ul>
                    <!-- 最后一题button text为提交 -->
                    <button @click="nextAnswer" :class="['answer-btn', nextStatus ? 'answer-btn-confirm': '']">
                        {{answerIndex !== anwserObj.questions.length - 1 ? '下一题':'提交'}}
                    </button>
                </div>
            </div>
            <!-- 二期答题需求end -->
            <prop-model :showStatus="prop.status" :propText="prop.text"></prop-model>
        </div>
    </div>
    
</template>
<script>
let allAnswer = {};
import goBack from './goBack';
import search from './search';
import propModel from './propModel';
import { setTimeout, clearTimeout } from 'timers';
import { debug } from 'util';
let count = 60
export default {
    data() {
        return {
            answersList: [],
            anwserObj: {},
            prop: {
                status: false,
                text: ''
            },
            topType: 4,
            actionUrl: "",
            correctObj: {
                total: 0,
                correct: 0
            },
            isShowSearch: true,
            isShowSearchForm: false,
            isShowSearchIcon: true,
            answerTime: count,
            nextStatus: false,
            answerIndex: 0
        }
    },
    mounted(){
        count = 60;
        this.answerTime = 60;
        this.getAnswers();
    },
    methods: {
        getAnswers() {
            console.log('答题页面')
            let params = this.$route.params;
            if(Object.keys(params).length === 0) {
                switch(this.$store.getters.getTopType) {
                    case 1:
                        this.$router.push({name: 'indexHome'})
                        break;
                    case 2:
                        this.$router.push({name: 'baseNavigation'})
                        break;
                    case 3:
                        this.$router.push({name: 'earthBaseProfile'})
                        break;
                    case 4:
                        this.$router.push({name: 'competitionDetail'})
                        break;
                    case 5:
                        this.$router.push({name: 'knowledgeShow'})
                        break;
                    default:
                        this.$router.push({name: 'indexHome'})
                    break;
                }
            }
            this.$http.get(`/knowledgeCompetition?id=${params.id}`).then(res => {
                console.log(res)
                this.anwserObj = res.data.msg;
                if(res.data.code == 200) {
                    if(this.anwserObj.questions.length > 0) {
                        this.correctObj.total = this.anwserObj.questions.length
                        this.countDown()
                    } else {

                    }
                } else {
                    this.prop.status = true;
                    this.prop.text = res.data.msg;
                    setTimeout(() => {
                        this.$router.push({name: 'indexHome'})
                        this.prop.status = false;
                    }, 3000);
                }
            }).catch(err => {
                console.log(err, "答题列表");
            })
        },
        commitAnswer() {
            let anwserArr = [], anwser = '', _this = this;
            if(Object.keys(allAnswer).length === 0) return;
            for(let a in allAnswer) {
                anwserArr.push(a+'-'+allAnswer[a]);
            }
            anwser = anwserArr.join(',');
            var answerTime = parseInt(_this.answerTime)
            _this.$http({
                url: '/addAnswer',
                method: 'post',
                data: {
                    answers: anwser,
                    id: _this.anwserObj.id,
                    answerTime: answerTime === 0 ? 60 : answerTime
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
                    _this.prop.text = '提交成功';
                } else {
                    _this.prop.text = res.data.msg;
                }
                _this.prop.status = true;
                setTimeout(() => {
                    _this.prop.status = false;
                    _this.backRoute()
                }, 3000);

            }).catch(err => {
                console.log(err, "login");
            });
        },
        countDown() {
            const that = this
            const timer = setTimeout(() => {
                if(count !== 0) {
                    --count
                    that.answerTime = count < 10 ? '0' + count : count
                    that.countDown()
                } else {
                    clearTimeout(timer)
                    //答题时间到进一步处理
                    this.backIndex()
                    return
                }
            }, 1000)
        },
        notWheel(e) {
            e.preventDefault()
        },
        backIndex() {
            this.prop.text = '答题时间到,即将返回首页';
            this.prop.status = true;
            this.commitAnswer();
            const indexTimer = setTimeout( item => {
                this.$router.push({name: 'indexHome'})     
            }, 3000)
        },
        backRoute() {
            let formUrl = this.$store.getters.getFromUrl;
            if(formUrl === 'winnerList') {
                if(window.location.hash.indexOf('competitionList') < 0) {
                    this.$router.push({name: "competitionList", params: {seasonId: 'later', title: '往期'}});
                } else {
                    this.$router.push({name: 'competitionDetail'})
                }
                
                this.$store.dispatch('sciencestate'); 
            } else {
                this.$router.push({name: formUrl})
            }
        },
        anwserActive2(answer, checkAnswer, index, id, evt) {
            if(!this.nextStatus) {
                let allList = evt.target.parentNode.children;
                let rightLi = document.getElementById('r-' + answer)
                for(let i = 0; i < allList.length; i++) {
                    allList[i].setAttribute('class', '');
                }
                if(answer.toLowerCase() === checkAnswer.toLowerCase()) {
                    allList[index].setAttribute('class', 'confirm-right')
                } else {
                    allList[index].setAttribute('class', 'confirm-fault')
                    rightLi.setAttribute('class', 'confirm-right')
                } 
                this.nextStatus = true
                allAnswer[id]=answer;
            }
        },
        nextAnswer() {
            if(this.nextStatus) {
                if(this.answerIndex !== this.anwserObj.questions.length - 1) {
                    const liList = document.getElementsByClassName('totast-item-list')[0].children
                    for(let i = 0; i < liList.length; i++) {
                        liList[i].setAttribute('class', '');
                    }
                    this.answerIndex = this.answerIndex + 1
                    this.nextStatus = false
                } else {
                    //TODO commit 
                    this.commitAnswer()
                }
            }
        }
    },
    components: {
        goBack,
        search,
        propModel
    }
}
</script>

<style scoped>
    .answer-content {
        height: 12.14rem;
        background-image: url(../assets/images/know-bg.png);
        background-size: 100% 100%;
        overflow-x: hidden;
        overflow-y: auto;
        color: #3e3a39;
        font-size: 0;
    }
    .answer-content,.history-out {
        position: relative;
        background-color: #ebebeb;
    }
    .knowledge-top {
        position: relative;
        height: 1.33rem;
        background-color: #fff;
        font-size: 0;
        text-align: center;
    }
    .answer-title-tip {
        color: #030000;
        font-size: .46rem;
        line-height: 1.04rem;
        /* width: 2.33rem; */
        height: 1.04rem;
        text-align: center;
        background-size: 100% 100%;
        display: inline-block;
        margin-top: .18rem;
        background-image: url(../assets/images/title-bg.png);
    }
    .answer-totast {
        background-color: #fff;
        margin: 0 auto;
        border-radius: 10px;
        height: auto;
        width: 6.9rem;
        padding-bottom: .3rem;
        font-size: 0;
        position: absolute;
        top: 1rem;
        left: 50%;
        transform: translateX(-50%); 
    }
    .answer-totast-head {
        height: 1.14rem;
        border-bottom: 1px dotted #b2b2b2;
        position: relative;
        text-align: right;
    }
    .clock {
        display: inline-block;
        width: .53rem;
        height: .54rem;
        background-image: url(../assets/images/clock.png);
        background-size: cover;
        margin-top: .28rem;
        margin-right: .14rem;
        vertical-align: top;
    }
    .answer-time {
        display: inline-block;
        color: #0098c0;
        font-size: .32rem;
        line-height: 1;
        padding-top: .4rem;
        margin-right: .34rem;
    }
    .answer-totast-head:before {
        content: "";
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        position: absolute;
        bottom: -.2rem;
        left: -.2rem;
        background-color: #ebebeb;
        z-index: 99;
    }
    .answer-totast-head:after {
        content: "";
        width: .4rem;
        height: .4rem;
        border-radius: 50%;
        position: absolute;
        bottom: -.2rem;
        right: -.2rem;
        background-color: #ebebeb;
        z-index: 99;
    }
    .answer-totast-item {
        padding: 0 .56rem;
        font-size: 0;
    }
    .totast-item-title {
        display: inline-block;
        padding: .5rem 0;
        color: #231815;
        font-size: .32rem;
        line-height: 1.2;
    }
    .totast-item-list {
        font-size: 0;
    }
    .totast-item-list>li {
        font-size: .28rem;
        color: #575555;
        line-height: 1;
        background-color: #f1f8fd;
        margin-bottom: .32rem;
        padding: .28rem 0 .28rem .26rem;
        position: relative;
    }
    .totast-item-list>li:last-child {
        margin-bottom: 0;
    }
    .answer-btn {
        width: 1.68rem;
        font-size: .22rem;
        color: #fff;
        line-height: 1;
        padding: .16rem 0;
        text-align: center;
        border: 0;
        border-radius: 4px;
        background-color: #b5b5b5;
        display: block;
        margin: .3rem auto 0;
    }
    .answer-btn-confirm {
        background-color: #0068b7;
    }
    li.confirm-right, li.confirm-fault {
        background-color: #87b3db;
    }
    li.confirm-right:after {
        content: "";
        width: .58rem;
        height: .42rem;
        background-image: url(../assets/images/right.png);
        background-size: cover;
        position: absolute;
        right: .26rem;
        top: 50%;
        transform: translateY(-50%);
    }
    li.confirm-fault:after {
        content: "";
        width: .65rem;
        height: .5rem;
        background-image: url(../assets/images/fault.png);
        background-size: cover;
        position: absolute;
        right: .26rem;
        top: 50%;
        transform: translateY(-50%);
    }
</style>
