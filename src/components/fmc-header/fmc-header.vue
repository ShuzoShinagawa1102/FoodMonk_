<template>
    <!-- header -->
    <view class="header-container">
        <view class="nav-container">
          <view class="nav-list">
            <navigator url="../index" class="nav-item nav-home">Home</navigator>
          </view>
        </view>
      </view>

</template>

<script setup lang="ts">
    import { ref } from "vue";
    
</script>


<style scoped>
/* ヘッダーCSS */
.header-container {
    background-color: var(--primaryColor); /* この色は任意で変更可能 */
    padding: 10px 0;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
    display: flex;
    justify-content: flex-start;
}

.nav-list {
    display: flex;
    align-items: center;
    padding-left: 20px; /* この部分を追加（20pxは任意で調整可能） */
}

.nav-item {
    padding: 8px 16px;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
    transition: background-color 0.3s;
}

.nav-home {
    background-color: var(--mainWhite);
    color: var(--primaryColor); /* ボタンの文字色 */
}

.nav-home:hover {
    background-color: #c7c7c7; /* ボタンのホバー時の色 */
}
</style>
  
  