import { createRouter, createWebHistory } from 'vue-router';

import {
    HomePage,
    AlumnosPage,
    GruposPage,
    MateriasPage,
    MaestrosPage,
    CargaMateriasPage
} from '../pages'

const routes = [
    { path: '/alumnos', name: 'alumnos', component: AlumnosPage },
    { path: '/inicio', name: 'inicio', component: HomePage },
    { path: '/grupos', name: 'grupos', component: GruposPage },
    { path: '/materias', name: 'materias', component: MateriasPage },
    { path: '/maestros', name: 'maestros', component: MaestrosPage },
    { path: '/cargaMaterias', name: 'cargaMaterias', component: CargaMateriasPage }
];

const ALL_ROUTES = [
    '/alumnos',
    '/inicio',
    '/grupos',
    '/materias',
    '/maestros',
    '/cargaMaterias'
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {

    if (!ALL_ROUTES.includes(to.fullPath)) {
        return { path: '/inicio' };
    }

    return true;
});