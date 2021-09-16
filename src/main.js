import Vue from 'vue';
import App from './App.vue';
import router from './router';
// Bootstrap4
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
// lodash
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';

Vue.config.productionTip = false;

// 全局註冊Component
const requireComponent = require.context(
  // 其組件目錄的相對路徑
  '@/components/Base',
  // 是否查詢子目錄
  false,
  // 匹配基礎组件文件名的正則表達式
  /Base[A-Z]\w+\.(vue|js)$/
);
requireComponent.keys().forEach(fileName => {
  // 獲取组件配置
  const componentConfig = requireComponent(fileName);
  // 獲取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 獲取和目錄深度無關的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  );

  // 全局註冊组件
  Vue.component(
    componentName,
    // 如果這個组件選項是透過 `export default` 導出的，
    // 那麼就會優先使用 `.default`，
    // 否則退回到使用模組的根。
    componentConfig.default || componentConfig
  );
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
