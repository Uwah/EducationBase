<template>
    <div class="search-back" @click="backLastPage"></div>
</template>
<script>
export default {
    props: {
        topType: {
            type: Number,
            require: false,
            default: 1
        }
    },
    methods: {
        backLastPage(e) {
            console.log(this.$store.getters.getFromUrl);
            let formUrl = this.$store.getters.getFromUrl;
            if(formUrl === 'winnerList') {
                this.$router.push({name: "competitionList", params: {seasonId: 'later', title: '往期'}});
                this.$store.dispatch('sciencestate'); 
            } else {
                // switch(this.topType) {
                //     case 1:
                //         this.$router.push({name: 'indexHome'})
                //         break;
                //     case 2:
                //         this.$router.push({name: 'earthBaseProfile'})
                //         break;
                //     case 3:
                //         this.$router.push({name: 'baseNavigation'})
                //         break;
                //     case 4:
                //         this.$router.push({name: 'scienceActive'})
                //         break;
                //     case 5:
                //         this.$router.push({name: 'knowledgeShow'})
                //         break;
                //     default:
                //         this.$router.push({name: 'indexHome'})
                //     break;
                // }
                this.$router.push({name: formUrl})
            }
			// this.$router.push({name: this.$store.getters.getFromUrl})
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
