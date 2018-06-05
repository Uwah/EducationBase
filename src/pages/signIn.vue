<template>
   <div class="sign-content">
       <div class="sign-qrcode"></div>
       <div class="sign-result">
           <div class="sign-success" >
                <img src="" class="sign-img wechat-avatar" alt="">
                <span class="wechat-name">xxx</span>
                <span class="sign-success-text">恭喜您，验证成功</span>
                <button class="sign-btn" @click="$router.push({name: 'indexHome'})">确定</button>
           </div>
           <div class="sign-fail" >
               <img src="../assets/images/sign-fail.jpg" class="sign-img" alt="">
               <span class="sign-fail-tip">验证失败</span>
               <span class="sign-fail-text">您可能不是幸运用户</span>
               <a href="/indexHome" class="back">返回</a>
           </div>
       </div>
   </div> 
</template>
<script>
export default {
    name: 'signIn',
    data() {
        return {
            qrcodeStatus: true,
            signStatus: false
        }
    },

}
</script>
<style scoped>
.sign-content {
    font-size: 0;
    line-height: 1;
    overflow: hidden;
    text-align: center;
}
.sign-qrcode {
    width: 4rem;
    height: 4rem;
    margin-top: 4rem;
    display: inline-block;
    display: none;
    background-color: #fcbadd;
}
.sign-result {
    font-size: 0;
    text-align: center;
}
.sign-success {
display: none;
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
