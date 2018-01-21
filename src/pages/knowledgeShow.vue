<template>
    <div class="container">
        <div class="science-top">
            <go-back :topType="topType"></go-back>
            <h3 class="title-tip">科普活动</h3>
            <i :class="['science-list-type', showType]" @click="cellListChange"></i>
        </div>
        <div class="science-list">
            <div class="cell-type-list" v-if="showType == 'list'">
                <div class="cell-type" :data-id="item.id" @click="goDetail(item.id)" v-for="(item, index) in scienceList" :key="index">
                    <img :src="item.fileName" class="cell-img" alt="">
                    <div class="cell-detail">
                        <span class="cell-position">{{item.qu}}</span>
                        <span class="cell-position-name">{{item.title.substring(0, 25)}}</span>
                    </div>
                </div>
            </div>
            <div class="list-type-list" v-if="showType == 'cell'">
                <div class="list-type" :data-id="item.id" @click="goDetail(item.id)" v-for="(item, index) in scienceList" :key="index">
                    <img :src="item.fileName" class="list-type-img" alt="">
                    <div class="list-type-content">
                        <span class="list-type-title">{{item.title}}</span>
                        <p>{{item.subtitle.length>63?item.subtitle.substring(0, 63)+'...':item.subtitle}}</p>
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
            scienceList: [],
            topType: 5
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
                document.body.scrollTop=0;
            }).catch(err => {
                console.log(err, '科普活动')
            });
        },
        goDetail(id) {
            this.$router.push({name: "articleDetail", params: {id: id, type: this.topType}});
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
<style src="../assets/css/scienceActive.css" scoped></style>

