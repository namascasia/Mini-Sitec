<script setup>
import { ref } from 'vue';
import { POSITION, useToast } from 'vue-toastification';
import Form from '../../components/Form/Form.vue';
import { api } from '../../components/api';

const formRef = ref(null);
const students = ref([]);
const toast = useToast();

const headerTable = ['N. control', 'Nombre', 'Carrera', 'Estatus', 'Acciones'];

const getStudents = async() => {
    const { data, status } = await api.get('/students/get');

    if (status >= 400) {
        toast.error(data.message, { position: POSITION.BOTTOM_RIGHT });
        return;
    }

    students.value = data.data;
    toast.success(data.message, { position: POSITION.BOTTOM_RIGHT, timeout: 2000 });
}

const deleteStudent = async(studentId) => {
    const { data, status } = await api.delete(`/students/delete/${ studentId }`);
    
    if (status >= 400) {
        toast.error(data.message, { position: POSITION.BOTTOM_RIGHT });
        return;
    }

    const index = students.value.findIndex(student => student.nControl === studentId);
    students.value[index].status = 'B';

    toast.info(data.message, { position: POSITION.BOTTOM_RIGHT, timeout: 2000 });
}

getStudents()

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
                <li class="row" v-for="student in students" :key="student.nControl">
                    <p>{{ student.nControl }}</p>
                    <p>{{ student.name }}</p>
                    <p>{{ student.career }}</p>
                    <p>{{ student.status }}</p>
                    <div>
                        <img class="edit" src="/img/note.png" alt="editar">  
                        <img @click="deleteStudent(student.nControl)" class="delete" src="/img/delete.png" alt="borrar">
                    </div>
                </li>             
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