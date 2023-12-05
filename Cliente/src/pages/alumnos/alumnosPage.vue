<script setup>
import { ref } from 'vue';
import { useStore } from "../../store/store";
import Form from '../../components/Form/Form.vue';
import { getStudents, deleteStudent } from '../../utils/petitions/students';

const formRef = ref(null);
const store = useStore();
const headerTable = ['N. control', 'Nombre', 'Carrera', 'Estatus', 'Acciones'];

getStudents();

</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>ALUMNOS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <button @click="formRef.toggleForm()">
                    Agregar alumno
                    <figure>
                        <img src="/img/crearuser.png" alt="Logo crear usuario">
                    </figure>
                </button>
            </ariticle>
        </header>
        <article class="containerTable">
            <div class="headerTable">
                <div class="row">
                    <div v-for="header in headerTable">{{ header }}</div>
                </div>
            </div>
            <ul class="body">
                <li class="row" v-for="student in store.students" :key="student.nControl">
                    <p>{{ student.nControl }}</p>
                    <p>{{ student.name }}</p>
                    <p>{{ student.career }}</p>
                    <p>{{ student.status }}</p>
                    <div>
                        <img class="edit" src="/img/note.png" alt="editar">  
                        <button class="delete_button" :disabled="student.status === 'B'">
                            <img @click="deleteStudent(student.nControl)" class="delete" :class="student.status === 'B' ? 'disabled' : ''" src="/img/delete.png" alt="borrar">
                        </button>
                    </div>
                </li>
                <p v-if="store.students.length === 0">No hay estudiantes por mostrar</p>             
            </ul>
        </article>
        <article class="containerPrevNext">
            <article class="containerButtonsText">
                <button>⟸ Prev</button>
                <label class="counterPage">1</label>
                <button>Next ⟹</button>
            </article>
        </article>  
        <article class="containerNumEstudiantes">
            <img src="/img/userBlue.png" alt="user">
            <label> Existen {{ 0 }} alumnos</label>
        </article>

        <Form ref="formRef" endpoint="students" :labels="headerTable.filter(headers => headers !== 'Acciones')" />
    </section>    
</template>

<style scoped src="./alumnosPageCSS.css"></style>