<template>
    <div class="answerList-content">
        <div class="knowledge-top">
            <h3 class="answer-title-tip seasion-count">{{anwserObj.title}}</h3>
            <go-back :topType="topType"></go-back>
            <search :actionUrl="actionUrl" :topType="topType" @search-data="searchData" :isShowSearch="isShowSearch" 
            :isShowSearchForm="isShowSearchForm" :isShowSearchIcon="isShowSearchIcon"></search>
        </div>
        <div class="answer-content">
            <div class="answer-head" v-if="correctStatus">
                恭喜您，共答对<span class="right-answer">{{correctObj.correct}}</span>题，共<span class="total-answer">{{correctObj.total}}</span>题
            </div>
            <div class="answer-item" v-for="(item, index) in anwserObj.questions" :key="index">
                <h4 class="answer-title"><span class="answer-count">{{index+1}}、</span>{{item.title}}：</h4>
                <ul class="answer-list" :data-answerId="item.id">
                    <li v-for="(answ, aindex) in item.qids"  @click="anwserActive(answ.titleLetter, item.id, aindex, $event)" :data-letter="answ.titleLetter" 
                    :key="aindex">{{answ.titleLetter}}、{{answ.titleChinese}}</li>
                </ul>
            </div>
            <button class="answer-commit" v-if="!correctStatus" @click="commitAnswer">提交</button>
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
            isShowSearchIcon: true
        }
    },
    mounted(){
        this.getAnswers()
    },
    methods: {
        getAnswers() {
            let params = this.$route.params;
            this.$http.get(`/knowledgeCompetition?id=${params.id}`).then(res => {
                console.log(res)
                this.anwserObj = res.data.msg;
                this.correctObj.total = this.anwserObj.questions.length
            }).catch(err => {
                console.log(err, "答题列表");
            })
        },
        commitAnswer() {
            let anwserArr = [], anwser = '', _this = this;
            for(let a in allAnswer) {
                anwserArr.push(a+'-'+allAnswer[a]);
            }
            anwser = anwserArr.join(',');
            _this.$http({
                url: '/addAnswer',
                method: 'post',
                data: {
                    answers: anwser
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
                _this.correctStatus = true;
                _this.prop.status = true;
                _this.prop.text = '提交成功';
                this.correctObj.correct = res.data.msg;
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
        margin-bottom: 1.23rem;
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
    .answer-title {
        color: #231815;
        font-size: .28rem;
        line-height: 1;
        font-weight: 500;
        padding-bottom: .3rem;
    }
    .answer-head {
        height: 1.86rem;
        color: #fff;
        line-height: 1.86rem;
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
        margin: .3rem auto 0;
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
</style>
