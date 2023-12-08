<script setup>
import { ref } from 'vue';
import { useStore } from '../../store/store';
import { inscribe, dismissInscribe } from '../../utils/petitions/groups';
import { MESSAGES_TYPES, notify } from '../../utils/helpers';
import { api } from '../../api';
import { HttpStatusCode } from 'axios';

const store = useStore();
const groupsSelected = ref([]);
const loadDone = ref(false);
const student = ref('');
const studentIsNotSelected = ref(false);

const initAcademicLoad = async() => {
    if (student.value.length === 0) {
        studentIsNotSelected.value = true;
        notify('Necesita elegir un estudiante para hacer la carga', MESSAGES_TYPES.INFO);
        return;
    }

    if (groupsSelected.value.length === 0) {
        notify('No ha seleccionado ningun grupo', MESSAGES_TYPES.INFO);
        return;
    }

    

    const subjectsSelected = groupsSelected.value.map(groupsSelected => (groupsSelected.subjectId));

    const creditsOfSelectedSubjects = store.subjects.filter(subject => (
        subjectsSelected.includes(subject.id)
    ))
    .map(subject => (
        subject.credits
    ));

    const credits = creditsOfSelectedSubjects.reduce((prev, current) => prev + current, 0);

    if (credits < 10) {
        notify('Debe de acumular minimamente 10 creditos en materias', MESSAGES_TYPES.INFO);
        return;
    }

    const loads = groupsSelected.value.map(groupSelected => ({
        subjectId: groupSelected.subjectId,
        groupId: groupSelected.id,
        studentId: student.value
    }));

    const { data, status } = await api.post('/inscribe/create', {
        loads
    });

    if (status >= HttpStatusCode.BadRequest) {
        notify(data.message, MESSAGES_TYPES.ERROR);
        return;
    }

    loadDone.value = true;
    notify(data.message);
}

const selectGroup = async(group) => {

    const { ok } = await inscribe(group.id);

    if (!ok) return;

    const selectedGroupIndex = store.groups.findIndex(g => g.id == group.id);
    store.groups[selectedGroupIndex].inscribed = store.groups[selectedGroupIndex].inscribed + 1;
    groupsSelected.value.push(group)
    
}

const removeGroup = async(group) => {

    const { ok } = await dismissInscribe(group.id);
    if (!ok) return;

    const selectedGroupIndex = store.groups.findIndex(g => g.id == group.id);
    store.groups[selectedGroupIndex].inscribed = store.groups[selectedGroupIndex].inscribed - 1;

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

const getTeacherName = (groupSelected) => {
    return store.teachers.find(teacher => teacher.id == groupSelected.teacherId).name;
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
                    <p>{{ getSubjectName(group) }}</p> 
                    <p><strong>Creditos:</strong> {{ getSubjectCredits(group) }}</p>
                    <p><strong>Horario:</strong> {{ group.scheduleMonday }}</p>
                    <p><strong>Maestro:</strong> {{ getTeacherName(group) }}</p>
                    <!-- <p>Lunes, martes, miercoles...</p> -->
                    <div class="grupoLleno" v-if="group.inscribed === group.studentsLimit">
                        <h2>GRUPO LLENO</h2>
                    </div>
                </button>
            </article>
        </section>
        <section class="containerPreview">
            <form @submit.prevent="initAcademicLoad" class="datosAlumno">
                <h2> Preview de carga</h2>
                <label for="nControl">N. control</label>
                <select v-model="student" id="nControl" :class="studentIsNotSelected && 'error'" @click="studentIsNotSelected = false">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="student in store.students" :value="student.nControl">
                        {{ student.nControl }}
                    </option>
                </select>
                <button :disabled="loadDone" :class="loadDone && 'disabled'">Cargar</button>
            </form>  
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
                    <button @click="removeGroup(groupSelected)" :disabled="loadDone" :class="loadDone && 'disabled'">
                        <img src="/img/delete.png" alt="icono eliminar">
                        Quitar grupo
                    </button>
                </li>
            </ul>
        </section>
    </section>
</template>
<style scoped src="./CargaMateriasCSS.css"></style>