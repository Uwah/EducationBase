import * as types from './types.js';

//App.vue 文件中mapActions数组管理的方法传到action处理，逻辑，异步等

export default {
    homestate:({commit}) => {
    	commit(types['HOMESTATE']);
    },
    basestate:({commit}) => {
    	commit(types['BASESTATE']);
    },
    navstate:({commit}) => {
    	commit(types['NAVSTATE']);
    },
    sciencestate:({commit}) => {
    	commit(types['SCIENCESTATE']);
    },
    knowstate:({commit}) => {
    	commit(types['KNOWSTATE']);
    },
    isshead:({commit}) => {
    	commit('headActive');
    },
    hidehead:({commit}) => {
    	commit('hidehead');
    },
    detail:({commit}) => {
        commit('detail');
    },
    userTokenAction: ({ commit }) => {
        //后台请求获取userToken localstorage中保存，没有就请求，有就直接用
        let userToken = '';
        localStorage.setItem('userToken', userToken);
        if(localStorage.getItem('userToken')) {

        } else {
            commit('userToken', userToken)
        }
    },
    lastUrl: ({commit}, url) => {
        commit('changeLastUrl', url)
    },
    locatoinInfo: ({commit}) => {
        /****腾讯地图获取当前位置 */
        console.log('test')
        var geolocation = new qq.maps.Geolocation();
        geolocation.getLocation(showPosition, showErr, {timeout: 9000});

        function showPosition(position) {
            console.log(position)
        };
        function showErr() {
            console.log('获取当前定位失败')
        };

        /*************百度地图 获取当前位置 */
        // var map = new BMap.Map("allmap");          // 创建地图实例
        // var initLat = 39.916527;
        // var initLng = 116.397128;
        // var point = new BMap.Point(initLng, initLat);  // 创建点坐标  
        // map.centerAndZoom(point, 13);                 // 初始化地图，设置中心点坐标和地图级别  
        // //获取当前位置
        // var geolocation = new BMap.Geolocation();  
        // geolocation.getCurrentPosition(function(r){  
        //     if(this.getStatus() == BMAP_STATUS_SUCCESS){  
        //         //可拖拽
        //         console.log(r.point)
        //         getAddress(r.point);
        //     }else {  
        //         console.log('failed:'+this.getStatus());  
        //     }  
        // });
        // //获取地址信息，设置地址label
        // function getAddress(point) {
        //     var gc = new BMap.Geocoder();
        //     gc.getLocation(point, function(rs){
        //         var addComp = rs.addressComponents;
        //         var address =  addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
        //         console.log(address)
        //         let locations = JSON.stringify({point: point, city: addComp.city})
        //         localStorage.setItem('loca', locations)
        //         commit('locationAC', {point: point, city: addComp.city});
        //      });
        // }
    }
}