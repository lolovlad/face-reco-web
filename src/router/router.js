import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import RegistrateUser from "@/pages/RegistrateUser";
import RecognazeUser from "@/pages/RecognazeUser";
import HistoriList from "@/pages/HistoriList";


const routes = [
    {
        path: '/',
        component: RegistrateUser,
    },
    {
        path: '/recognize',
        component: RecognazeUser,
    },
    {
        path: '/hist/:uuid',
        component: HistoriList,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router