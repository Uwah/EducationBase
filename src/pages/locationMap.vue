<template>
    <div class="base-map-content">
        <div id="location-map"></div>
        <h3 class="no-location" v-if="noBaseTip">{{noBaseTip}}</h3>
    </div>
</template>
<script>
export default {
  name: 'locationMap',
  data: () => ({
      locations: [],
      noBaseTip: '' 
  }),
  mounted() {
      this.$http.get('/index').then( res => {
        const data = res.data.msg.types
        let map = new qq.maps.Map(document.getElementById('location-map'), {
            disableDefaultUI: true,
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                style: qq.maps.ZoomControlStyle.DEFAULT
            }
        });
        var infoWin = new qq.maps.InfoWindow({  
            map: map  
        });
        if (data.length > 0) {
            data.forEach(item => {
                this.setBaseMapMarker(item.list, map)
            })
        } else {
            this.noBaseTip = '暂无基地位置信息'
        }
      })
  },
  methods: {
      setBaseMapMarker(markerList, map) {
            for(let type of markerList) {
                (function(address, name, lat, lng) {
                    let geocoder = new qq.maps.Geocoder();
                    geocoder.getLocation(address);
                    //设置服务请求成功的回调函数
                    geocoder.setComplete(function(result) {
                        let latLng = new qq.maps.LatLng(result.detail.location.lat, result.detail.location.lng);
                        map.setCenter(latLng)
                        
                        let marker=new qq.maps.Marker({
                            position: latLng,
                            animation: qq.maps.MarkerAnimation.DROP,
                            map: map
                        });
                        let label = new qq.maps.Label({
                            position: latLng,
                            map: map,
                            offset: new qq.maps.Size(13, -38),
                            style: {padding: "1px 5px",borderRadius: "5px",border: "1px solid #D7290F", zIndex: 99},
                            content: name
                        });
                        // qq.maps.event.addListener(marker, 'click', function(e) {
                        //     console.log(e, + '----' + marker.getPosition())
                        //     window.location.href=`http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${address}&tocoord=${lat},${lng}&policy=0&referer=educationBase`;
                        // })
                        // qq.maps.event.addListener(label, 'click', function(e) {
                        //     console.log(e, + '----' + label.getPosition())
                        //     window.location.href=`http://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${address}&tocoord=${lat},${lng}&policy=0&referer=educationBase`;
                        // })
                        

                    });
                    //若服务请求失败，则运行以下函数
                    geocoder.setError(function() {
                        console.log("出错了，请输入正确的地址！！！");
                    });
                })(type.address, type.userName, type.x, type.y);
                // codeAddress(type.address, type.userName);
            }
        }
  }

}
</script>
<style>
    .base-map-content {
        width: 100%;
        height: 100%;
    }
    #location-map {
        width: 100%;
        height: 100%;
    }
    #app {
        height: 100%;
        padding-bottom: 0;
    }
    #bottomNav {
        display: none;
    }
    body {
        max-width: 100%;
    }
</style>
