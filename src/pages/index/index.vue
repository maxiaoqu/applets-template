<template>
  <view class="content">
    <image class="logo" src="../../static/logo.png"></image>
    <view>
      <text class="title">{{title}}</text>
    </view>
  </view>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {getproductsalerate, deviceindicator, deviceTyperIndicatorRelation} from "@/api/getdata";

  export default Vue.extend({
    data() {
      return {
        title: 'Hello'
      }
    },
    onLoad() {
      console.log('page onLoad')
      getproductsalerate({})
      deviceindicator({})
      deviceTyperIndicatorRelation({})
    },
    methods: {}
  });
</script>

<style>
  .content {
    text-align: center;
    height: 400upx;
  }

  .logo {
    height: 200upx;
    width: 200upx;
    margin-top: 200upx;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
