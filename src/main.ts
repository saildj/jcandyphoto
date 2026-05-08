import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from './App.vue';
import router from './router';
// 引入 FontAwesome 插件
import fontawesome from './plugins/fontawesome'
import '@/assets/styles/main.scss';

const app = createApp(App);
const pinia = createPinia();

// 使用插件
app.use(fontawesome)

app.use(pinia);
app.use(router);
app.use(ElementPlus);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
