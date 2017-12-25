<template>
	<header id="headId">
		<div class="knowledge-top">
            <h3 class="title-tip seasion-count" v-show="titleStatus">{{title}}</h3>
            <go-back></go-back>
            <!-- slot -->
			<search :actionUrl="searchUrl" :topType="topType" :isShowSearch="searchStatus" @search-data="getSearchData"></search>
		</div>
	</header>
</template>

<script>
import goBack from 'goBack';
import search from './search.vue';
export default {
  name: "titleTop",
  data(){
	  return {
		  searchUrl: "/topSearch",
		  placeHolder: "请输入基地名称",
		  topType: 2
	  }
  },
  props: {
	    title: {
		    type: String,
		    require: false,
		    default: ""
		},
		titleStatus: {
			type: Boolean,
			require: false,
			default: false
		},
		searchStatus: {
			type: Boolean,
		    require: true,
		    default: false
		}

  },
  methods: {
	  getSearchData(e) {
		  let obj = {};
		  obj.val = e;
		  this.$emit("search-data", e);
		  
		  console.log(e);
	  }
  },
  components:{
      search,
      goBack
  }
}
</script>


<style>
	#headId {
		position: relative;
		height: 1.33rem;
		background-color: #fff;
		font-size: 0;
		text-align: center;
	}
	.knowledge-top {
		height: 100%;
		width: 100%;
	}
	.title-tip {
		color: #030000;
		font-size: .42rem;
		line-height: 1.04rem;
		width: 2.33rem;
		height: 1.04rem;
		text-align: center;
		background-size: 100% 100%;
		display: inline-block;
		margin-top: .18rem;
		background-image: url(../assets/images/title-bg.png);
	}
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
	.knowledge-search {
		display: inline-block;
		width: 4.96rem;
		height: .56rem;
		margin-top: .47rem;
	}
	.search-form {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 9;
	}
	#nvg-search {
		width: 100%;
		height: 100%;
		border: 0;
		color: #9d9d9e;
		background-color: #f6f6f7;
		padding-left: .32rem;
		border-top-right-radius: .26rem;
		border-bottom-right-radius: .26rem;
		border-top-left-radius: .26rem;
		border-bottom-left-radius: .26rem;
	}
	.search-icon {
		display: inline-block;
		width: .44rem;
		height: .42rem;
		background-image: url(../assets/images/search.png);
		background-size: 100% 100%;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: .6rem;
	}
</style>