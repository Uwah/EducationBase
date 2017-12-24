<template>
    <div class="container">
        <div class="knowledge-top">
            <h3 class="title-tip seasion-count"><!--  第25期-->知识竞赛</h3>
            <div class="search-back"></div>
            <div class="knowledge-search" style="display: none;">
                <form action="" class="search-form">
                    <input type="search" name="knowledge-search" id="nvg-search" placeholder="请输入基地名称">
                </form>
            </div>
            <i class="search-icon"></i>
        </div>
        <div class="seasion-content" style="display: none;">
            <div class="seasion-content-top">
                <img src="" class="seasion-img" alt="">
                <div class="seasion-info">
                    <span class="seasion-title">生活知识竞赛</span>
                    <span class="seasion-number">参与人数：756</span>
                </div>
            </div>
            <div class="prize-group">
                <h4 class="prize-name">获奖名单</h4>
                <div class="student-group">
                    <h4 class="group-title">中学生组</h4>
                    <ul class="student name-list">
                        <li>陈胤捷</li>
                        <li>胡一天</li>
                        <li>林静晓</li>
                        <li>林静晓</li>
                        <li>陈胤捷</li>
                        <li>胡一天</li>
                        <li>林静晓</li>
                        <li>陈胤捷</li>
                        <li>胡一天</li>
                        <li>林静晓</li>
                        <li>陈胤捷</li>
                        <li>胡一天</li>
                        <li>林静晓</li>
                    </ul>
                </div>
                <div class="adult-group">
                    <h4 class="group-title">成人组</h4>
                    <ul class="adult name-list">
                        <li>张庭振</li>
                        <li>赵梓帆</li>
                        <li>殷恬歌</li>
                        <li>张庭振</li>
                        <li>赵梓帆</li>
                        <li>殷恬歌</li>
                        <li>张庭振</li>
                        <li>赵梓帆</li>
                        <li>殷恬歌</li>
                        <li>张庭振</li>
                        <li>赵梓帆</li>
                        <li>殷恬歌</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="knowledge-content" style="display: none;">
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
        <div class="answer-content" style="display: none;">
            <div class="answer-head">
                恭喜您，共答对<span class="right-answer">12</span>题，共<span class="total-answer">15</span>题
            </div>
            <div class="answer-item">
                <h4 class="answer-title"><span class="answer-count">1、</span>噪声对人体哪个系统有害：</h4>
                <ul class="answer-list">
                    <li class="active">A、心血管系统</li>
                    <li>B、消化系统</li>
                    <li>C、呼吸系统</li>
                </ul>
            </div>
            <div class="answer-item">
                <h4 class="answer-title error-answer"><span class="answer-count">2、</span>噪声对人体哪个系统有害：</h4>
                <ul class="answer-list">
                    <li class="active">A、心血管系统</li>
                    <li>B、消化系统</li>
                    <li>C、呼吸系统</li>
                </ul>
            </div>
            <div class="answer-item">
                <h4 class="answer-title"><span class="answer-count">1、</span>噪声对人体哪个系统有害：</h4>
                <ul class="answer-list">
                    <li class="active">A、心血管系统</li>
                    <li>B、消化系统</li>
                    <li>C、呼吸系统</li>
                </ul>
            </div>
            <div class="answer-item">
                <h4 class="answer-title error-answer"><span class="answer-count">2、</span>噪声对人体哪个系统有害：</h4>
                <ul class="answer-list">
                    <li class="active">A、心血管系统</li>
                    <li>B、消化系统</li>
                    <li>C、呼吸系统</li>
                </ul>
            </div>
        </div>
        <div class="history-out">
            <div class="history-knowledge">
                <div class="history-knowledge-type">
                    <img src="../assets/images/cell-list-img.png" class="history-knowledge-type-img" alt="">
                    <div class="history-knowledge-type-content">
                        <span class="history-knowledge-type-title">第25期</span>
                        <span class="sub-title">生活知识竞赛</span>
                        <span class="history-knowledge-count">参与人数：756</span>
                    </div>
                </div>
                <div class="history-knowledge-type">
                    <img src="../assets/images/cell-list-img.png" class="history-knowledge-type-img" alt="">
                    <div class="history-knowledge-type-content">
                        <span class="history-knowledge-type-title">第25期</span>
                        <span class="sub-title">生活知识竞赛</span>
                        <span class="history-knowledge-count">参与人数：756</span>
                    </div>
                </div>
                <div class="history-knowledge-type">
                    <img src="../assets/images/cell-list-img.png" class="history-knowledge-type-img" alt="">
                    <div class="history-knowledge-type-content">
                        <span class="history-knowledge-type-title">第25期</span>
                        <span class="sub-title">生活知识竞赛</span>
                        <span class="history-knowledge-count">参与人数：756</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
    @import '../assets/css/knowledgeShow.css';
</style>
