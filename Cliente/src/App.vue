<script setup>
import Menu from './components/Menu/Menu.vue';
import { getGroups } from './utils/petitions/groups';
import { getStudents } from './utils/petitions/students';
import { getSubjects } from './utils/petitions/subjects';
import { getTeachers } from './utils/petitions/teachers';

// getStudents();
// getSubjects();
// getTeachers();
// getGroups();
</script>

<template>
    <main class="main">
        <Menu />
        <router-view></router-view>
    </main>
</template>


<style src="./style.css"></style>