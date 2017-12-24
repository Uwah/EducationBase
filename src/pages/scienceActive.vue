<template>
    <div class="container">
        <div class="science-top">
            <go-back></go-back>
            <h3 class="title-tip">科普活动</h3>
            <i :class="['science-list-type', showType]" @click="cellListChange"></i>
        </div>
        <div class="science-list">
            <div class="cell-type-list" v-if="showType == 'list'">
                <div class="cell-type">
                    <img src="../assets/images/base-list-img.png" class="cell-img" alt="">
                    <div class="cell-detail">
                        <span class="cell-position">南湖区科技馆</span>
                        <span class="cell-position-name">关于举办嘉兴市2017青少年</span>
                    </div>
                </div>
            </div>
            <div class="list-type-list" v-if="showType == 'cell'">
                <div class="list-type">
                    <img src="../assets/images/cell-list-img.png" class="list-type-img" alt="">
                    <div class="list-type-content">
                        <span class="list-type-title">科普竞赛 </span>
                        <p>关于举办嘉兴市2017青少年科技竞赛 本次活动集结嘉兴市各中小学杰出</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import goBack from '../components/goBack';
export default {
    data() {
        return {
            showType: 'list',
            scienceList: []

        }
    },
    methods: {
        cellListChange(e) {
            console.log(e);
            this.showType = this.showType === 'list'?'cell':'list';
        },
        getScienceList() {
            this.$http.get('/notice').then( res => {
                console.log(res);
            }).catch(err => {
                console.log(err, '科普活动')
            });
        }
    },
    mounted() {
        this.getScienceList();
    },
    components: {
        goBack
    }
}
</script>
<style scoped>
    @import '../assets/css/scienceActive.css';
</style>

