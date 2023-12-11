<script setup>
import { ref } from 'vue';
import Button from '../../components/Button/Button.vue';
import ModalForm from '../../components/ModalForm/ModalForm.vue';
import FormAlumno from '../../components/Forms/alumnos/FormAlumno.vue';
import NoElementsToShow from '../../components/NoElements/NoElementsToShow.vue';
import MainLayout from '../../components/Layout/MainLayout.vue';
import { deleteStudent } from '../../utils/petitions/students';
import { useStore } from "../../store/store";
import { usePagination } from '../../composables/usePagination';
import { STATUS, ACTIONS } from '../../utils/constants';

const modalRef = ref(null);
const studentToEdit = ref(null);
const action = ref(ACTIONS.CREATE);
const layoutRef = ref(null);

const store = useStore();
const { page, offset, limit, nextPage, previousPage } = usePagination('students');

const onCreate = () => {
    action.value = ACTIONS.CREATE;
    modalRef.value.openModal();
}

const onEdit = (student) => {
    studentToEdit.value = student;
    action.value = ACTIONS.UPDATE;
    modalRef.value.openModal();
}

const headerTable = ['N. control', 'Nombre', 'Carrera', 'Estatus', 'Acciones'];
</script>

<template>
    <MainLayout ref="layoutRef" text="ALUMNOS" :headers="headerTable" :add="onCreate">
        <li class="row" v-for="student in store.students.slice(offset, limit)" :key="student.nControl">
            <p>{{ student.nControl }}</p>
            <p>{{ student.name }}</p>
            <p>{{ student.career }}</p>
            <p>{{ student.status }}</p>
            <div>
                <img @click="onEdit(student)" class="edit" src="/img/note.png" alt="editar">  
                <button class="delete_button" :disabled="student.status === STATUS.DELETED">
                    <img @click="deleteStudent(student.nControl)" class="delete" :class="student.status === STATUS.DELETED ? 'disabled' : ''" src="/img/delete.png" alt="borrar">
                </button>
            </div>
        </li>
        <NoElementsToShow v-if="store.students.length === 0" title="alumnos" />
        <template #footer>
            <article class="containerPrevNext">
                <article class="containerButtonsText">
                    <button @click="previousPage()" :disabled="store.students.length === 0">⟸ Prev</button>
                    <label class="counterPage">{{ page + 1 }}</label>
                    <button @click="nextPage()" :disabled="store.students.length === 0">Next ⟹</button>
                </article>
            </article>  
            <article class="containerNumEstudiantes">
                <img src="/img/userBlue.png" alt="user">
                <label> Existen {{ activeStudents }} alumnos</label>
            </article>
        </template>
        <template #modal>
            <ModalForm ref="modalRef">
                <FormAlumno :close-modal="modalRef.closeModal" :student="studentToEdit" />
            </ModalForm>
        </template>
    </MainLayout>
</template>

<style scoped src="./alumnosPageCSS.css"></style>