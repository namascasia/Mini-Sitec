<script setup>
import { ref } from 'vue';
import Button from '../../components/Button/Button.vue';
import Modalform from '../../components/ModalForm/ModalForm.vue';
import FormMaestro from '../../components/Forms/maestros/FormMaestro.vue';
import { useStore } from '../../store/store';
import { usePagination } from '../../composables/usePagination';

const modalRef = ref(null);
const { page, offset, limit, nextPage, previousPage } = usePagination('teachers');
const store = useStore();

const headerTable = ['Clave maestro', 'Nombre', 'Departamento', 'Estatus', 'Acciones'];
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>MAESTROS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <Button @click="modalRef.openModal()" text="Agregar Maestro" />
            </ariticle>
        </header>
        <article class="containerTable">
            <div class="headerTable">
                <div class="row">
                    <div v-for="header in headerTable">{{ header }}</div>
                </div>
            </div>
            <ul class="body">
                <li class="row" v-for="teacher in store.teachers.slice(offset, limit)" :key="teacher.id">
                    <p>{{ teacher.id }}</p>
                    <p>{{ teacher.name }}</p>
                    <p>{{ teacher.department }}</p>
                    <p>{{ teacher.status }}</p>
                    <div>
                        <img class="edit" src="/img/note.png" alt="editar">  
                        <img class="delete" src="/img/delete.png" alt="borrar">
                    </div>
                </li>
            </ul>
        </article>
        <article class="containerPrevNext">
            <article class="containerButtonsText">
                <button @click="previousPage()">⟸ Prev</button>
                <label class="counterPage">{{ page + 1 }}</label>
                <button @click="nextPage()">Next ⟹</button>
            </article>
        </article>  
        <article class="containerNumEstudiantes">
            <img src="/img/userBlue.png" alt="user">
            <label> Existen {{ store.teachers.length }} Maestros</label>
        </article>
        <Modalform ref="modalRef">
            <FormMaestro :close-modal="modalRef.closeModal" />
        </ModalForm>
    </section>    
</template>

<style scoped src="./MaestrosPageCSS.css"></style>