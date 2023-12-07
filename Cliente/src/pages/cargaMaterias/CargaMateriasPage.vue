<script setup>
import { ref, computed } from 'vue';
import { useStore } from '../../store/store';

const store = useStore();
const groupsSelected = ref([]);

const selectGroup = (group) => {
    const selectedGroupIndex = store.groups.findIndex(g => g.id == group.id);
    store.groups[selectedGroupIndex].inscribed = store.groups[selectedGroupIndex].inscribed + 1;

    groupsSelected.value.push(group)
}

const removeGroup = (group) => {
    const selectedGroupIndex = store.groups.findIndex(g => g.id == group.id);
    store.groups[selectedGroupIndex].inscribed = store.groups[selectedGroupIndex].inscribed + 1;

    const newGroupsSelected = groupsSelected.value.filter(groupSelected => groupSelected.id !== group.id);
    groupsSelected.value = newGroupsSelected;
}

const disableGroup = (group) => {
    const isGroupdSelected = groupsSelected.value.some(g => g.id === group.id);
    const isScheduleCollapsing = groupsSelected.value.some(g => g.scheduleMonday === group.scheduleMonday);
    const isGroupFull = group.inscribed === group.studentsLimit;
    
    return isGroupdSelected || isScheduleCollapsing || isGroupFull;
}


const getSubjectName = (groupSelected) => {
    return store.subjects.find(subject => groupSelected.subjectId === subject.id).name;
}

const getSubjectCredits = (groupSelected) => {
    return store.subjects.find(subject => groupSelected.subjectId === subject.id).credits;
}


</script>

<template>
    <section class="container">
        <section class="containerGruposTitle">
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>TOMA DE CARGA</h2>
            </ariticle>
            <article class="containerGrupos">
                <label class="title">Seleccione grupos disponibles</label>
                <button @click="selectGroup(group)" class="tarjetaGrupos" :disabled="disableGroup(group)" v-for="group in store.groups">
                    <p>{{ store.subjects.find(subject => group.subjectId == subject.id).name }}</p> 
                    <p><strong>Creditos:</strong> {{ store.subjects.find(subject => group.subjectId == subject.id).credits }}</p>
                    <p><strong>Horario:</strong> {{ group.scheduleMonday }}</p>
                    <p><strong>Maestro:</strong> {{ store.teachers.find(teacher => teacher.id === group.teacherId).name }}</p>
                    <!-- <p>Lunes, martes, miercoles...</p> -->
                    <div class="grupoLleno" v-if="group.inscribed === group.studentsLimit">
                        <h2>GRUPO LLENO</h2>
                    </div>
                </button>
            </article>
        </section>
        <section class="containerPreview">
            <article class="datosAlumno">
                <h2> Preview de carga</h2>
                <label for="nControl">N. control</label>
                <select id="nControl">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="student in store.students" :value="student.nControl">
                        {{ student.nControl }}
                    </option>
                </select>
                <button>Cargar</button>
            </article>  
            <ul class="previewHorario">
                <li v-for="groupSelected in groupsSelected" :key="groupSelected.id">
                    <div class="infos">
                        <div class="info_deco"></div>
                        <div>
                            <h4>{{ getSubjectName(groupSelected) }}</h4>
                            <p><strong>Creditos:</strong> {{ getSubjectCredits(groupSelected) }}</p>
                            <p><strong>Horario:</strong> {{ groupSelected.scheduleMonday }}</p>
                        </div>
                    </div>
                    <button @click="removeGroup(groupSelected)">
                        <img src="/img/delete.png" alt="icono eliminar">
                        Quitar grupo
                    </button>
                </li>
            </ul>

<!-- 
            <article class="previewHorario">
                <ul v-for="groupSelected in groupsSelected" :key="groupSelected.id">
                    <li> <figure /> </li>
                    <li>
                        <label>{{ store.subjects.find(subject => groupSelected.subjectId === subject.id).name }}</label> 
                        <label>Creditos: {{ store.subjects.find(subject => groupSelected.subjectId === subject.id).credits }}</label>
                        <label>{{ groupSelected.scheduleMonday }}</label>
                    </li>
                    <li>
                        <img @click="removeGroup(groupSelected)" src="/img/delete.png" alt="eliminar">
                    </li>
                </ul>
            </article> -->
        </section>
    </section>
</template>
<style scoped src="./CargaMateriasCSS.css"></style>