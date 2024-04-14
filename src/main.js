import { createApp } from 'vue'
import App from '@/App'
import router from '@/router/router'
import './axios'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize'
import 'material-design-icons-iconfont/dist/material-design-icons.css'


const app = createApp(App)

app
    .use(router)
    .mount("#app")
