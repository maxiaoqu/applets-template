import Vue from 'vue'
import App from './App.vue'

// 全局组件、方法注册
import installPrototype from '@/utils/install/installPrototype'

Vue.use(installPrototype)

Vue.config.productionTip = false

new App().$mount()
