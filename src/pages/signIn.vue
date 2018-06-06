<template>
   <div :class="['sign-content', qrcodeStatus?'sign-bg':'']">
       <img src="../assets/images/signQRcode.png" v-if="qrcodeStatus" class="sign-qrcode" />
       <div class="sign-result">
           <div class="sign-success" v-if="signStatus == 'success'">
                <img :src="user.headimgurl" class="sign-img wechat-avatar" alt="">
                <span class="wechat-name">{{user.nickName}}</span>
                <span class="sign-success-text">恭喜您，验证成功</span>
                <button class="sign-btn" @click="indexHome">确定</button>
           </div>
           <div class="sign-fail" v-if="signStatus == 'failed'">
               <img src="../assets/images/sign-fail.jpg" class="sign-img" alt="">
               <span class="sign-fail-tip">验证失败</span>
               <span class="sign-fail-text">您可能不是幸运用户</span>
               <a href="javascript:;" @click="indexHome" class="back">返回</a>
           </div>
       </div>
   </div> 
</template>
<script>
const qs = require('qs')
export default {
    name: 'signIn',
    data() {
        return {
            qrcodeStatus: true,
            signStatus: '',
            user: {
                nickName: '',
                headimgurl: ''
            }
        }
    },
    mounted() {
        const search = this.searchHandle()
        if(Object.prototype.toString.call(search) === '[object Object]') {
            if(search.status === 'success') {
                this.getUserInfo(search.wechatId)
            }
            this.signStatus = search.status
            this.qrcodeStatus = false
        }
        
    },
    methods: {
        indexHome() {
            location.replace('http://localhost:8083')
        },
        async getUserInfo(wechatId) {
            const that = this
            const { data } = await that.$http.post('/queryUserInfo', qs.stringify({
                        wechatId: wechatId
                    }),{ headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
                })
            if(data.code == '200') {
                ['headimgurl', 'nickName'].forEach(item => {
                    this.user[item] = data.user[item]
                })
            }
        },
        searchHandle() {
            var info = location.search;
            if(info.length > 0) {
                info =info.substring(1);
                var result = info.split("&");
                var key,value;
                var data = {};
                for(var i=0;i<result.length;i++){
                    var result2 = result[i].split("=");
                    key = result2[0];
                    value = result2[1];
                    data[key] = value;
                }
                return data
            } else {
                return '';
            }
        }
    }
}
</script>
<style>
#app {
    margin-bottom: 0;
    height: 100%;
}
#bottomNav {
    display: none;
}
.sign-content {
    font-size: 0;
    line-height: 1;
    height: 100%;
    overflow: hidden;
    text-align: center;
}
.sign-bg {
    background-image: url('../assets/images/know-bg.png');
    background-size: 100% 100%;
}
.sign-qrcode {
    width: 4rem;
    height: 4rem;
    margin-top: 4rem;
    display: inline-block;
    background-color: #fcbadd;
}
.sign-result {
    font-size: 0;
    text-align: center;
}
.sign-img {
    width: 3rem;
    height: 3rem;
    margin-top: 3rem;
    display: inline-block;
}
.wechat-name {
    width: 100%;
    text-align: center;
    padding-top: .3rem;
    display: inline-block;
    color: #4e4e4e;
    font-size: .32rem;
    line-height: 1;
}
.sign-success-text, .sign-fail-tip {
    font-size: .46rem;
    line-height: 1;
    display: inline-block;
    width: 100%;
    padding-top: .8rem;
}
.sign-btn {
    width: 2rem;
    height: .68rem;
    line-height: .68rem;
    font-size: .32rem;
    color: #fff;
    border: 0;
    background-color: #3fb839;
    border-radius: 4px;
    margin-top: 1rem;
}
.sign-fail-tip {
    color: #ff0000;
}
.sign-fail-text {
    text-align: center;
    font-size: .28rem;
    line-height: 1;
    color: #999;
    width: 100%;
    display: inline-block;
    padding: .3rem 0;
}
.back {
    color: #999;
    text-align: center;
    font-size: .28rem;
    line-height: 1;
    text-decoration: underline;
}
</style>
