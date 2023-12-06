<script setup>
import Menu from './components/Menu/Menu.vue';
import { getStudents } from './utils/petitions/students';
import { getSubjects } from './utils/petitions/subjects';

getStudents();
getSubjects();
</script>

<template>
    <main class="main">
        <Menu />
        <router-view></router-view>
    </main>
</template>


<style src="./style.css"></style>