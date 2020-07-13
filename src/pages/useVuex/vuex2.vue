<template>
  <view class="testContent">
    <view>
      <text class="title">{{title+vxAppCode}}</text>
    </view>
  </view>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator'
  import {mapGetters, mapActions, mapMutations} from 'vuex'

  @Component<Test>({
    name: 'Test',
    // Vuex's
    methods: {
      ...mapGetters([
        'getAppCode'
      ]),
      ...mapActions([
        'saveAppCode'
      ]),
      ...mapMutations([])
    }
  })
  export default class Test extends Vue {
    // vuex
    saveAppCode!: (state: string) => void
    getAppCode!: () => void

    private title: string = 'Hello 测试Vue222！'

    get vxAppCode() {
      console.log(321, this.getAppCode())
      return this.getAppCode()
    }

    onLoad() {
      console.log('page onLoad')
      this.vxSaveAppCode()
      this.vxGetAppCode()
    }

    vxSaveAppCode() {
      this.saveAppCode('uni-app_vuex2')
    }

    vxGetAppCode() {
      console.log(123, 'vxGetAppCode', this.getAppCode())
    }
  }
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
