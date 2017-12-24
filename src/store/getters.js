export default {
    count:state => { //state里面包含数据
        return state.count;
    },
    homeActive:state =>{
    	return state.homeStatus;
    },
    baseActive: state => {
    	return state.baseStatus;
    },
    navActive:state => {
    	return state.navStatus;
    },
    scienceActive:state => {
    	return state.scienceStatus;
    },
    knowActive:state => {
    	return state.knowStatus;
    },
    isShowHead:state => {
    	return state.isShowHead;
    }


}