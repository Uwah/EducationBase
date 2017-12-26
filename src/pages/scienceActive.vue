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
    </div>    
</template>
<script>
export default {
    name: "konwledgeShow",
    data() {
        return {
            token: ''
        }
    },
    // beforeRouteEnter(to, from, next) {
    //     //判断登录状态 Vuex
    //     // beforeRouteEnter----> mounted----->next
    //     console.log('enter route');
    //     console.log(from);
    //     // next(vm => {
    //     //     if(localStorage.getItem('userToken') === '' || localStorage.getItem('userToken') === undefined) {
    //     //         vm.$router.push({});
    //     //     }
    //     //     console.log(vm.$store.getters.getUserToken)
    //     //     console.log(vm.$store.state.userToken)
    //     // })
    // },
    mounted() {
        //this.$store.state.userToken
        if(localStorage.getItem('userToken') === '' || localStorage.getItem('userToken') === undefined) {
            this.$router.push({name: 'competitionDetail'});
        } else {
            this.$router.push({name: 'answerList'});
        }
        console.log(this.$store.getters.getUserToken)
    }
}
</script>
<style scoped>
    @import '../assets/css/knowledgeShow.css';
</style>
