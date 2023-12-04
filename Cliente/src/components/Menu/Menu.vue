<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

</script>

<template>
    <header class="header">
        <h3>Menu</h3>
        <nav class="nav">
            <ul>
                <li @click="router.push('/grupos')" class="list_item">
                    <img src="/img/user-groups.png" alt="User icon">
                    Grupos
                </li>
                <li @click="router.push('/materias')" class="list_item">
                    <img src="/img/books.png" alt="User icon">
                    Materias
                </li>
                <li @click="router.push('/alumnos')" class="list_item">
                    <img src="/img/user.png" alt="User icon">
                    Alumnos
                </li>
                <li @click="router.push('/maestros')" class="list_item">
                    <img src="/img/teacher.png" alt="User icon">
                    Maestros
                </li>
                <li @click="router.push('/cargaMaterias')" class="list_item">
                    <img src="/img/subir.png" alt="cargaMateria icon">
                    Cargar materias
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped src="./MenuCSS.css"></style>