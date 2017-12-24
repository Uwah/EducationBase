<template>
    <!-- 知识竞赛列表 -->
    <div class="competition">
        <top-head></top-head>
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
            </div>
        </div>
    </div>
    
</template>
<script>
import topHead from 'Header.vue';
export default {
    data() {
        return {

        }
    },
    components:{
       topHead
    }
}
</script>
<style scoped>

</style>


