<template>
    <div class="answerList-content" @mousewheel="notWheel">
        <div class="knowledge-top">
            <h3 class="answer-title-tip seasion-count">{{anwserObj.title}}</h3>
            <go-back :topType="topType"></go-back>
            <!-- <search :actionUrl="actionUrl" :topType="topType" @search-data="searchData" :isShowSearch="isShowSearch" 
            :isShowSearchForm="isShowSearchForm" :isShowSearchIcon="isShowSearchIcon"></search> -->
        </div>
        <div class="answer-content">
            <div class="answer-head" v-if="correctStatus">
                恭喜您，共答对<span class="right-answer">{{correctObj.correct}}</span>题，共<span class="total-answer">{{correctObj.total}}</span>题
            </div>
            <!-- 一期答题 -->
            <!-- <div class="answer-item" v-for="(item, index) in anwserObj.questions" :key="index">
                <h4 class="answer-title" :answer-title-id="item.id"><span class="answer-count">{{index+1}}、</span>{{item.title}}<span v-show="correctStatus" :id="'r'+item.id" class="right-answer"></span></h4>
                <ul class="answer-list" :data-answerId="item.id">
                    <li v-for="(answ, aindex) in item.qids" 
                     @click="anwserActive(answ.titleLetter, item.id, aindex, $event)" :data-letter="answ.titleLetter" 
                    :key="aindex">{{answ.titleLetter}}、{{answ.titleChinese}}</li>
                </ul>
            </div> -->
            <!-- 二期答题需求 -->
            <div class="answer-totast">
                <div class="answer-totast-head">
                    <i class="clock"></i>
                    <span class="answer-time">{{answerTime}}s</span>
                </div>
                <div class="answer-totast-item">
                    <span class="totast-item-title">{{answerIndex+1 + '、' +testAnswers[answerIndex].que}}</span>
                    <ul class="totast-item-list">
                        <li v-for="(item, index) in testAnswers[answerIndex].answerList" @click="anwserActive2(index, $event)"
                        :key="index">{{item.key + '、' + item.answer}} </li>
                    </ul>
                    <!-- 最后一题button text为提交 -->
                    <button @click="nextAnswer" :class="['answer-btn', nextStatus ? 'answer-btn-confirm': '']">
                        {{answerIndex !== testAnswers.length - 1 ? '下一题':'提交'}}
                    </button>
                </div>
            </div>
            <!-- 二期答题需求 -->
            <!-- <button class="answer-commit" v-if="!correctStatus" @click="commitAnswer">提交</button> -->
            <!-- 弹框后期可做成公共组件 -->
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
            correctStatus: false,
            topType: 4,
            actionUrl: "",
            correctObj: {
                total: 0,
                correct: 0
            },
            isShowSearch: true,
            isShowSearchForm: false,
            isShowSearchIcon: true,
            answerTime: 60,
            testAnswers: [
                {
                    que: '噪声对人体哪个系统有害1',
                    answerList: [
                        {key: 'A', answer: '1心血管系统test1'},
                        {key: 'B', answer: '1消化系统test2'},
                        {key: 'C', answer: '1呼吸系统test3'}
                    ]
                },
                {
                    que: '噪声对人体哪个系统有害2',
                    answerList: [
                        {key: 'A', answer: '2心血管系统test1'},
                        {key: 'B', answer: '2消化系统test2'},
                        {key: 'C', answer: '2呼吸系统test3'}
                    ]
                },
                {
                    que: '噪声对人体哪个系统有害3',
                    answerList: [
                        {key: 'A', answer: '3心血管系统test1'},
                        {key: 'B', answer: '3消化系统test2'},
                        {key: 'C', answer: '3呼吸系统test3'}
                    ]
                }
                
            ],
            nextStatus: false,
            answerIndex: 0
        }
    },
    mounted(){
        this.getAnswers()
        this.countDown()
    },
    methods: {
        getAnswers() {
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
                    this.correctObj.total = this.anwserObj.questions.length
                } else {
                    this.prop.status = true;
                    this.prop.text = res.data.msg;
                    setTimeout(() => {
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
            _this.$http({
                url: '/addAnswer',
                method: 'post',
                data: {
                    answers: anwser,
                    id: _this.anwserObj.id
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
                let rightList = res.data.msg.list;
                for(let i = 0; i< rightList.length; i++) {
                    document.getElementById('r'+ rightList[i].id).innerText = '正确答案：' + rightList[i].answer; 
                }
                _this.correctStatus = true;
                _this.prop.status = true;
                this.correctObj.correct = res.data.msg.score;
                setTimeout(() => {
                    _this.prop.status = false;
                }, 3000);

            }).catch(err => {
                console.log(err, "login");
            });
        },
        anwserActive(letter, itemId, index, evt) {
            let allList = evt.target.parentNode.children;
            for(let i = 0; i < allList.length; i++) {
                allList[i].setAttribute('class', '');
            }
            allList[index].setAttribute('class', 'active');
            allAnswer[itemId]=letter;
            console.log(allAnswer);
        },
        searchData(data) {
            console.log(data)
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
                    return
                }
            }, 1000)
        },
        notWheel(e) {
            e.preventDefault()
        },
        anwserActive2(index, evt) {
            if(!this.nextStatus) {
                let allList = evt.target.parentNode.children;
                for(let i = 0; i < allList.length; i++) {
                    allList[i].setAttribute('class', '');
                }
                allList[index].setAttribute('class', 'confirm-right');
                this.nextStatus = true
            }
        },
        nextAnswer() {
            if(this.nextStatus) {
                if(this.answerIndex !== this.testAnswers.length - 1) {
                    const liList = document.getElementsByClassName('totast-item-list')[0].children
                    for(let i = 0; i < liList.length; i++) {
                        liList[i].setAttribute('class', '');
                    }
                    this.answerIndex = this.answerIndex + 1
                    this.nextStatus = false
                } else {
                    //TODO commit 
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
    .answer-item {
        padding: .4rem 1.1rem 0;
        font-size: 0;
    }
    .answer-item:last-child {
        padding-bottom: .5rem;
    }
    .answer-title {
        color: #231815;
        font-size: .28rem;
        line-height: 1.1;
        font-weight: 500;
        padding-bottom: .3rem;
    }
    .answer-head {
        height: 1.86rem;
        color: #fff;
        line-height: 1.7rem;
        background-color: #a2aac4;
        padding-left: .5rem;
        font-size: .32rem;
        font-weight: bold;
    }
    .right-answer {
        font-size: .46rem;
        line-height: 1;
    }
    .answer-count {
        font-size: .3rem;
        line-height: 1;
    }
    .error-answer {
        color: #e60012;
    }
    .answer-list li {
        font-size: .28rem;
        line-height: 1;
        color: #231815;
        padding: .32rem 0 .32rem .36rem; 
        background-color: rgba(182, 216, 244, .4);
        border-bottom: 1px solid #9c9ac7;
    }
    .answer-list li:last-child {
        border-bottom: 0;
    }
    .answer-list li.active {
        color: #fff;
        background-color: #8ba8d4;
    }
    .answer-commit {
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
        margin: .5rem auto .3rem;
        display: block;
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
    .right-answer {
        padding-left: .12rem;
        font-size: inherit;
        line-height: inherit;
        color: #e60012;
    }
    .answer-totast {
        background-color: #fff;
        margin: 0 auto;
        border-radius: 10px;
        height: 7.5rem;
        width: 6.9rem;
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
        margin: .6rem auto 0;
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
