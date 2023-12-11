<script setup>
import { ref } from 'vue';
import Button from '../../components/Button/Button.vue';
import Modalform from '../../components/ModalForm/ModalForm.vue';
import FormMaestro from '../../components/Forms/maestros/FormMaestro.vue';
import NoElementsToShow from '../../components/NoElements/NoElementsToShow.vue';
import MainLayout from '../../components/Layout/MainLayout.vue';
import { useStore } from '../../store/store';
import { usePagination } from '../../composables/usePagination';
import { STATUS, ACTIONS } from '../../utils/constants';
import { deleteTeacher } from '../../utils/petitions/teachers';

const modalRef = ref(null);
const teacherToEdit = ref(null);
const action = ref(ACTIONS.CREATE);

const { page, offset, limit, nextPage, previousPage } = usePagination('teachers');
const store = useStore();

const onCreate = () => {
    action.value = ACTIONS.CREATE;
    modalRef.value.openModal();
}

const onEdit = (teacher) => {
    teacherToEdit.value = teacher;
    action.value = ACTIONS.UPDATE;
    modalRef.value.openModal();
}

const headerTable = ['Clave maestro', 'Nombre', 'Departamento', 'Estatus', 'Acciones'];
</script>

<template>
    <MainLayout text="MAESTROS" :headers="headerTable" :add="onCreate" >
        <template #main>
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
        </template>
        <NoElementsToShow v-if="store.teachers.length === 0" title="maestros"/>
        <template #footer>
            <article class="containerPrevNext">
                <article class="containerButtonsText">
                    <button @click="previousPage()" :disabled="store.teachers.length === 0">⟸ Prev</button>
                    <label class="counterPage">{{ page + 1 }}</label>
                    <button @click="nextPage()" :disabled="store.teachers.length === 0">Next ⟹</button>
                </article>
            </article>  
            <article class="containerNumEstudiantes">
                <img src="/img/userBlue.png" alt="user">
                <label> Existen {{ store.teachers.length }} maestros</label>
            </article>
            <Modalform ref="modalRef">
                <FormMaestro :close-modal="modalRef.closeModal" :action="action" :teacher="teacherToEdit" />
            </ModalForm>
        </template>
    </MainLayout>
</template>

<style scoped src="./MaestrosPageCSS.css"></style>