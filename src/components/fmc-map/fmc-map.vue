<template>
  <view class="map-container">

    <view class="section-title">
      <text class="title-h2">Food monk</text>
    </view>

    <view class="map-component">
      <view id="map_canvas"></view>
    </view>

    <view id="map-list" class="scrollable-list">
    </view>

  </view>
</template>

<!-- <script setup lang="ts"></script> -->
<script>
  import { ref } from "vue";
  import { Loader } from "@googlemaps/js-api-loader";
  const loader = new Loader({
    apiKey: "AIzaSyDDiCLXghb5ALx0FvTuHTw40dO2hn5f3_8",
    version: "weekly",
    libraries: ["places"]
  });
  
  export default {
    data() {
      return{}
    },
    mounted() {
      this.initMap()
    },
    methods:{
      initMap() {
        loader
          .load()
          .then((google) => {
            const map = new google.maps.Map(
              document.getElementById("map_canvas"),
            {
              center: { lat: 35.7246, lng: 140.0581 },
              zoom: 13,
              disableDefaultUI: true
            }
          )
          })
          .catch((e) => {
            console.log(e)
          })
      },
    },
  }

</script>

<style scoped>

/* 1. アプリケーションのタイトル "Food monk" */
.section-title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
}

.title-h2 {
    font-size: 24px; /* フォントサイズは適宜調整可能 */
    text-align: center;
    font-weight: bold;
}

/* 2. マップのスタイル */
.map-component {
    width: 100%;
    height: 300px; /* スマホで見やすい高さに設定。適宜調整可能 */
    margin-top: 20px;
}
.map-container {
    flex: 1; /* 利用可能なスペースを埋める */
}

#map_canvas {
    width: 100%;
    height: 100%;
    background-color: #e9e9e9; /* マップがロードされるまでの背景色。適宜調整可能 */
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
