<script setup>
import { ref, computed } from 'vue';
import { deleteStudent } from '../../utils/petitions/students';
import { useStore } from "../../store/store";
import { usePagination } from '../../composables/usePagination';
import Button from '../../components/Button/Button.vue';
import ModalForm from '../../components/ModalForm/ModalForm.vue';
import FormAlumno from '../../components/Forms/alumnos/FormAlumno.vue';
import { STATUS } from '../../utils/constants/status.contants';
import { ACTIONS } from '../../utils/constants/actions';

const modalRef = ref(null);
const studentToEdit = ref(null);
const action = ref(ACTIONS.CREATE);

const store = useStore();
const { page, offset, limit, nextPage, previousPage } = usePagination('students');

const onEdit = (student) => {
    studentToEdit.value = student;
    action.value = ACTIONS.UPDATE;
    modalRef.value.openModal();
}

const activeStudents = computed(() => {
    return store.students.filter(student => student.status !== STATUS.DELETED ).length;
});

const headerTable = ['N. control', 'Nombre', 'Carrera', 'Estatus', 'Acciones'];
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>ALUMNOS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <Button @click="onEdit" text="Agregar alumno" />
            </ariticle>
        </header>
        <article class="containerTable">
            <div class="headerTable">
                <div class="row">
                    <div v-for="header in headerTable">{{ header }}</div>
                </div>
            </div>
            <ul class="body">
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
                <p v-if="store.students.length === 0">No hay estudiantes por mostrar</p>             
            </ul>
        </article>
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
        <ModalForm ref="modalRef">
            <FormAlumno :close-modal="modalRef.closeModal" :action="action" :student="studentToEdit" />
        </ModalForm>
    </section>    
</template>

<style scoped src="./alumnosPageCSS.css"></style>