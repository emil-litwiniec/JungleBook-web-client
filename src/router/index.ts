import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Welcome from '../views/welcome/Welcome.vue';
import SignIn from '@/components/auth/SignIn.vue';
import SignUp from '@/components/auth/SignUp.vue';
import AuthBox from '@/components/auth/AuthBox.vue';
import Dashboard from '@/views/dashboard/Dashboard.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        component: Welcome,
        children: [
            {
                path: 'signIn',
                name: 'signIn',
                component: SignIn,
            },
            {
                path: 'signUp',
                name: 'signUp',
                component: SignUp,
            },
            {
                path: '',
                component: AuthBox,
            },
        ],
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;
