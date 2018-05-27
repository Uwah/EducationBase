
<template>
<!-- 弹框组件 -->
    <div class="sginup-bg" v-if="showStatus" @mousewheel="pageScroll">
        <div class="commit-success">{{propText}}</div>
    </div>
</template>
<script>
export default {
    props: {
        showStatus: {
            type: Boolean,
            require: true,
            default: false
        },
        propText: {
            type: String,
            require: true,
            default: ''
        }
    },
    methods: {
        pageScroll(e) {
            e.preventDefault()
        }
    }
}
</script>
<style scoped>
    .sginup-bg {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: rgba(255, 255, 255, .6);
        position: fixed;
        z-index: 999;
    }
    .commit-success {
        color: #3e3a39;
        font-size: .34rem;
        line-height: 1.2rem;
        letter-spacing: 2px; 
        max-width: 80%;
        min-width: 6rem;
        text-align: center;
        background-color: rgba(255, 255, 255, .6);
        box-shadow: 0px 0px 28px 0px rgba(0, 0, 0, 0.4);
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
    }
</style>
