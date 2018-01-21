export default {
    homeActive:state =>{//state里面包含数据
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
    },
    getUserToken: state => {
        return state.userToken
    },
    getFromUrl: state => {
        return state.fromUrl
    },
    getTopType: state => {
        return state.topType
    },
    getLocaObj: state => {
        return state.locaObj
    }
}