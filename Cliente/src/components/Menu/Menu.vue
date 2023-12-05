<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();

</script>

<template>
    <header class="header">
        <h3>Menu</h3>
        <nav class="nav">
            <ul>
                <li @click="router.push('/grupos')" class="list_item" :class="route.path === '/grupos' ? 'active' : ''">
                    <img src="/img/user-groups.png" alt="User icon">
                    Grupos
                </li>
                <li @click="router.push('/materias')" class="list_item" :class="route.path === '/materias' ? 'active' : ''" >
                    <img src="/img/books.png" alt="User icon">
                    Materias
                </li>
                <li @click="router.push('/alumnos')" class="list_item" :class="route.path === '/alumnos' ? 'active' : ''">
                    <img src="/img/user.png" alt="User icon">
                    Alumnos
                </li>
                <li @click="router.push('/maestros')" class="list_item" :class="route.path === '/maestros' ? 'active' : ''">
                    <img src="/img/teacher.png" alt="User icon">
                    Maestros
                </li>
                <li @click="router.push('/cargaMaterias')" class="list_item" :class="route.path === '/cargaMaterias' ? 'active' : ''">
                    <img src="/img/subir.png" alt="cargaMateria icon">
                    Cargar
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped src="./Menu.css"></style>