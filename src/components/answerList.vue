<template>
    <div class="answerList-content">
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
            <div class="answer-item" v-for="(item, index) in anwserObj.questions" :key="index">
                <h4 class="answer-title" :answer-title-id="item.id"><span class="answer-count">{{index+1}}、</span>{{item.title}}<span v-show="correctStatus" :id="'r'+item.id" class="right-answer"></span></h4>
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
</style>
