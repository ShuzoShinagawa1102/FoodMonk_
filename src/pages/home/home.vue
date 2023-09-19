<!-- <template>
  <view class="container">
    <fmc-header />
    <fmc-map />
    <fmc-footer />
  </view>

</template>

<script setup lang="ts">
  import { ref } from "vue";
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.map-container {
    flex: 1;
}
.footer-wrapper {
    width: 100%;
}

</style> -->

<template>
  <web-view src="../../hybrid/html/local.html"/>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const vw = ref<any>(null)
const pages = getCurrentPages()
const postToWebview = () => {
  const addr = {
    lat: 36.711578,
    lng: 119.168173
  }
  vw.value = pages[pages.length - 1]
  vw.value
    .$getAppWebview()
    .children()[0]
    .evalJS(`test(${JSON.stringify(addr)})`)
}
const message = (data: any) => {}
</script>
