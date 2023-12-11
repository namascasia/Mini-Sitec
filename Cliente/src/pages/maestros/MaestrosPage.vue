<script setup>
import { ref } from 'vue';
import Button from '../../components/Button/Button.vue';
import Modalform from '../../components/ModalForm/ModalForm.vue';
import FormMaestro from '../../components/Forms/maestros/FormMaestro.vue';
import { useStore } from '../../store/store';
import { usePagination } from '../../composables/usePagination';
import { STATUS, ACTIONS } from '../../utils/constants';
import { deleteTeacher } from '../../utils/petitions/teachers';
import NoElementsToShow from '../../components/NoElements/NoElementsToShow.vue';

const modalRef = ref(null);
const teacherToEdit = ref(null);
const action = ref(ACTIONS.CREATE);

const { page, offset, limit, nextPage, previousPage } = usePagination('teachers');
const store = useStore();

const onEdit = (teacher) => {
    teacherToEdit.value = teacher;
    action.value = ACTIONS.UPDATE;
    modalRef.value.openModal();
}

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
                <Button @click="action = ACTIONS.CREATE, modalRef.openModal()" text="Agregar Maestro" />
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
                    <p>{{ teacher.status === STATUS.ACTIVE ? 'VIGENTE' : 'BAJA' }}</p>
                    <div>
                        <img @click="onEdit(teacher)" class="edit" src="/img/note.png" alt="editar">  
                        <button class="delete_button" :disabled="teacher.status === STATUS.DELETED">
                            <img @click="deleteTeacher(teacher.id)" class="delete" :class="teacher.status === STATUS.DELETED ? 'disabled' : ''" src="/img/delete.png" alt="borrar">
                        </button>
                    </div>
                </li>
            </ul>
            <NoElementsToShow v-if="store.teachers.length === 0" title="maestros"/>
        </article>
        <article class="containerPrevNext">
            <article class="containerButtonsText">
                <button @click="previousPage()" :disabled="store.teachers.length === 0">⟸ Prev</button>
                <label class="counterPage">{{ page + 1 }}</label>
                <button @click="nextPage()" :disabled="store.teachers.length === 0">Next ⟹</button>
            </article>
        </article>  
        <article class="containerNumEstudiantes">
            <img src="/img/userBlue.png" alt="user">
            <label> Existen {{ store.teachers.length }} Maestros</label>
        </article>
        <Modalform ref="modalRef">
            <FormMaestro :close-modal="modalRef.closeModal" :action="action" :teacher="teacherToEdit" />
        </ModalForm>
    </section>    
</template>

<style scoped src="./MaestrosPageCSS.css"></style>