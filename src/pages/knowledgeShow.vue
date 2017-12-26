<template>
    <div class="container">
        <div class="science-top">
            <go-back></go-back>
            <h3 class="title-tip">科普活动</h3>
            <i :class="['science-list-type', showType]" @click="cellListChange"></i>
        </div>
        <div class="science-list">
            <div class="cell-type-list" v-if="showType == 'list'">
                <!--  @click="$router.push({name: 'articleDetail', params: {id: item.id, title: "科普活动"}})" -->
                <div class="cell-type" :data-id="item.id" v-for="(item, index) in scienceList" :key="index">
                    <img :src="item.fileName" class="cell-img" alt="">
                    <div class="cell-detail">
                        <span class="cell-position">{{item.title}}</span>
                        <span class="cell-position-name">{{item.content}}</span>
                    </div>
                </div>
            </div>
            <div class="list-type-list" v-if="showType == 'cell'">
                <div class="list-type" :data-id="item.id" v-for="(item, index) in scienceList" :key="index">
                    <img :src="item.fileName" class="list-type-img" alt="">
                    <div class="list-type-content">
                        <span class="list-type-title">{{item.title}}</span>
                        <p>{{item.content}}</p>
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
                this.scienceList = res.data.msg;
            }).catch(err => {
                console.log(err, '科普活动')
            });
        }
    },
    mounted() {
        console.log('enter mounted')
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

