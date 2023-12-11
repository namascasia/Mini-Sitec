<script setup>
import { ref } from 'vue';
import Button from '../../components/Button/Button.vue';
import ModalForm from '../../components/ModalForm/ModalForm.vue';
import FormGrupo from '../../components/Forms/grupos/FormGrupo.vue';
import { useStore } from '../../store/store';
import { usePagination } from '../../composables/usePagination';
import { ACTIONS } from '../../utils/constants';
import { deleteGroup } from '../../utils/petitions/groups';
import NoElementsToShow from '../../components/NoElements/NoElementsToShow.vue';

const modalRef = ref(null);
const groupToEdit = ref(null);
const action = ref(ACTIONS.CREATE);

const { page, limit, offset, nextPage, previousPage } = usePagination('groups');

const store = useStore();

const onEdit = (group) => {
    groupToEdit.value = group;
    action.value = ACTIONS.UPDATE;
    modalRef.value.openModal();
}

const getSubjectName = (group) => {
    return store.subjects.find(subject => subject.id == group.subjectId).name;
}

const getTeacherName = (group) => {
    return store.teachers.find(teacher => teacher.id == group.teacherId).name;
}

const headerTable = ['Materia', 'Grupo', 'Maestro', 'Limite alumnos', 'Inscritos', 'Horario Lunes',
'Horario Martes','Horario Miercoles','Horario Jueves','Horario Viernes', 'Acciones'];

let numGrupos = 0;
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>GRUPOS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <Button @click="action = ACTIONS.CREATE ,modalRef.openModal()" text="Agregar grupo" />
            </ariticle>
        </header>
        <article class="containerTable">
            <div class="headerTable">
                <div class="row">
                    <div v-for="header in headerTable">{{ header }}</div>
                </div>
            </div>
            <ul class="body">
                <li class="row" v-for="group in store.groups.slice(offset, limit)">
                    <p>{{ getSubjectName(group) }}</p>
                    <p>{{ group.id }}</p>
                    <p>{{ getTeacherName(group) }}</p>
                    <p>{{ group.studentsLimit }}</p>
                    <p>{{ group.inscribed }}</p>
                    <p>{{ group.scheduleMonday }}</p>
                    <p>{{ group.scheduleTuesday }}</p>
                    <p>{{ group.scheduleWednesday }}</p>
                    <p>{{ group.scheduleThursday }}</p>
                    <p>{{ group.scheduleFriday }}</p>
                    <div>
                        <img @click="onEdit(group)" class="edit" src="/img/note.png" alt="editar"> 
                        <button @click="deleteGroup(group.id)" class="delete_button" >
                            <img class="delete" src="/img/delete.png" alt="borrar">
                        </button>
                    </div>
                </li>
            </ul>
            <NoElementsToShow v-if="store.groups.length === 0" title="grupos"/>
        </article>
        <article class="containerPrevNext">
            <article class="containerButtonsText">
                <button @click="previousPage" :disabled="store.groups.length === 0">⟸ Prev</button>
                <label class="counterPage">{{ page + 1 }}</label>
                <button @click="nextPage" :disabled="store.groups.length === 0">Next ⟹</button>
            </article>
        </article>  
        <article class="containerNumEstudiantes">
            <img src="/img/userBlue.png" alt="user">
            <label> Existen {{ numGrupos }} grupos</label>
        </article>

        <ModalForm ref="modalRef">
            <FormGrupo :close-modal="modalRef.closeModal" :action="action" :group="groupToEdit"  />
        </ModalForm>
    </section>    
</template>

<style scoped src="./GruposPageCSS.css"></style>