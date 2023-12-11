<script setup>
import { ref } from 'vue';
import Button from '../../components/Button/Button.vue';
import ModalForm from '../../components/ModalForm/ModalForm.vue';
import FormMateria from '../../components/Forms/materias/FormMateria.vue';
import NoElementsToShow from '../../components/NoElements/NoElementsToShow.vue';
import MainLayout from '../../components/Layout/MainLayout.vue';
import { useStore } from '../../store/store';
import { usePagination } from '../../composables/usePagination';
import { deleteSubject } from '../../utils/petitions/subjects';
import { ACTIONS, STATUS } from '../../utils/constants';

const modalRef = ref(null);
const subjectToEdit = ref(null);
const action = ref(ACTIONS.CREATE);

const onCreate = () => {
    action.value = ACTIONS.CREATE;
    modalRef.value.openModal();
}

const onEdit = (subject) => {
    subjectToEdit.value = subject;
    action.value = ACTIONS.UPDATE;
    modalRef.value.openModal(); 
}

const store = useStore();
const { page, limit, offset, nextPage, previousPage } = usePagination('subjects');

const headerTable = ['Clave materia', 'Nombre', 'Creditos', 'Acciones'];
</script>

<template>
    <MainLayout text="MATERIAS" :headers="headerTable" :add="onCreate">        
        <template #main>
            <li class="row" v-for="subject in store.subjects.slice(offset, limit)" :key="subject.id">
                <p>{{ subject.id }}</p>
                <p>{{ subject.name }}</p>
                <p>{{ subject.credits }}</p>
                <div>
                    <img @click="onEdit(subject)" class="edit" src="/img/note.png" alt="editar">  
                    <button class="delete_button" :disabled="subject.status === STATUS.DELETED">
                        <img @click="deleteSubject(subject.id)" class="delete" :class="subject.status === STATUS.DELETED ? 'disabled' : ''" src="/img/delete.png" alt="borrar">
                    </button>
                </div>
            </li>
        </template>
        <NoElementsToShow v-if="store.subjects.length === 0" title="materias" />
        <template #footer>
            <article class="containerPrevNext">
                <article class="containerButtonsText">
                    <button @click="previousPage">⟸ Prev</button>
                    <label class="counterPage">{{ page + 1 }}</label>
                    <button @click="nextPage">Next ⟹</button>
                </article>
            </article>  
            <article class="containerNumEstudiantes">
                <img src="/img/userBlue.png" alt="user">
                <label> Existen {{ store.subjects.length }} materias</label>
            </article>
        
            <ModalForm ref="modalRef">
                <FormMateria :close-modal="modalRef.closeModal" :action="action" :subject="subjectToEdit" />
            </ModalForm>            
        </template>
    </MainLayout>
</template>

<style scoped src="./MateriasPageCSS.css"></style>