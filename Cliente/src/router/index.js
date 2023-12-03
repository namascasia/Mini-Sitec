import { createRouter, createWebHistory } from 'vue-router';

import{
    alumnosPage
}from '../pages'

const routes = [
    { path: '/alumnos', component: alumnosPage}
];

const PUBLIC_ROUTE = '/';

export const router = createRouter({
    history: createWebHistory(),
    routes
});