<template>

    <view class="footer-wrapper">
      <view class="footer-block">
        <text class="footer-text">(Copyright) Shuzo Shinagawa & Yusaku Nakatani (2023)</text>
        <view class="fa-icon-block">
          <navigator url="https://github.com/ShuzoShinagawa1102?tab=repositories"  class="fa-icon">
            <text>GitHub Icon Here</text> <!-- こちらは実際のアイコンに置き換えてください -->
          </navigator>
        </view>
      </view>
    </view>

</template>

<script setup lang="ts">
    import { ref } from "vue";
</script>

<style scoped>

.footer-wrapper {
    background-color: #646565; /* フッターの背景色 */
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}


.footer-block {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.footer-text {
    font-size: 12px; /* コピーライトのフォントサイズ。適宜調整可能 */
    color: #ecf0f1; /* テキストの色 */
    margin-bottom: 10px; /* GitHubアイコンとの間隔 */
    text-align: center;
}

.fa-icon-block {
    display: flex;
    justify-content: center;
    align-items: center;
}

.fa-icon {
    font-size: 24px; /* GitHubアイコンのサイズ。適宜調整可能 */
    color: #ecf0f1; /* アイコンの色 */
    text-decoration: none; /* アイコンの下線を削除 */
    padding: 5px 10px;
    border-radius: 5px;
    transition: background-color 0.3s; /* ホバーエフェクトのトランジション */
}

.fa-icon:hover {
    background-color: #646565; /* ホバー時の背景色 */
}

</style>
  