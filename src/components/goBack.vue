<template>
    <div class="search-back" @click="backLastPage"></div>
</template>
<script>
export default {
    props: {
        topType: {
            type: Number,
            require: true,
            default: 1
        }
    },
    methods: {
        backLastPage(e) {
			console.log(this.$store.getters.getFromUrl);
			this.$router.push({name: this.$store.getters.getFromUrl})
            // window.history.go(-1);
        }
    }
}
</script>
<style scoped>
    .search-back {
		border-top: 2px solid #595757;
		border-left: 2px solid #595757;
		transform: rotate(-45deg);
		width: .3rem;
		height: .3rem;
		position: absolute;
		top: calc(50% - 0.15rem);
		left: .35rem;
	}
</style>
