<template>
  <view class="testContent">
    <view>
      <text class="title">{{title}}</text>
    </view>
  </view>
</template>

<script lang="ts">
  import {Vue} from 'vue-property-decorator'
  import {mapGetters, mapActions} from 'vuex'

  export default Vue.extend({
    data() {
      return {
        title: 'Hello 测试Vuex！'
      }
    },
    onLoad() {
      console.log('page onLoad')
      this.vxSaveAppCode()
      this.vxGetAppCode()
    },
    methods: {
      ...mapGetters([
        'getAppCode'
      ]),
      ...mapActions([
        'saveAppCode'
      ]),
      vxSaveAppCode() {
        this.saveAppCode('uni-app_vuex1')
      },
      vxGetAppCode() {
        console.log(123, 'vxGetAppCode', this.getAppCode())
      }
    },
  })
</script>

<style lang="less">
  .testContent {
    text-align: center;
    height: 400upx;

    .title {
      font-size: 36upx;
      color: #8f8f94;
    }
  }
</style>
