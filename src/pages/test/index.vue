<template>
  <view class="content">
    <view>
      <text class="title">{{title}}</text>
    </view>
  </view>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'

  @Component<Test>({
    name: 'Test'
  })
  export default class Test extends Vue {
    private title: string = 'Hello'

    mounted() {
      console.log('page mounted')
    }

    onLoad() {
      console.log('page onLoad')
    }
  }
</script>

<style>
  .content {
    text-align: center;
    height: 400 upx;
  }

  .logo {
    height: 200 upx;
    width: 200 upx;
    margin-top: 200 upx;
  }

  .title {
    font-size: 36 upx;
    color: #8f8f94;
  }
</style>
