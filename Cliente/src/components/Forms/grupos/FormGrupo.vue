<script setup>
import { ref, computed } from 'vue';
import { useStore } from '../../../store/store';
import { ACTIONS } from '../../../utils/constants/actions';
import { createGroup, updateGroup } from '../../../utils/petitions/groups';
import Input from '../../Input/Input.vue';
import Select from '../../Select/Select.vue';
import { STATUS } from '../../../utils/constants';

const { closeModal, action, group } = defineProps({
    closeModal: Function,
    action: {
        type: String,
        required: false,
        default: ACTIONS.CREATE
    },
    group: {
        type: Object,
        required: false
    }
});


const isForUpdate = action === ACTIONS.UPDATE;

const INITIAL_STATE = {
    id: isForUpdate ? group.id.toString() : '',
    subjectId: isForUpdate ? group.subjectId.toString() : '',
    teacherId: isForUpdate ? group.teacherId.toString() : '',
    studentsLimit: isForUpdate ? group.studentsLimit.toString() : '',
    inscribed: isForUpdate ? group.inscribed.toString() : '',
    schedule: isForUpdate ? group.scheduleMonday : '',
};

const store = useStore();
const inputValues = ref(INITIAL_STATE);
const activeTeachers = computed(() => store.teachers.filter(teacher => teacher.status === STATUS.ACTIVE));

const onSubmit = async() => {
    const { 
        id, subjectId, teacherId, 
        studentsLimit, schedule } = inputValues.value;
    if (
        [
            id.trim(), subjectId.trim(), teacherId.trim(), studentsLimit.trim(), schedule.trim()
        ].includes("")
        ) return;

    let isOk;
    if (action === ACTIONS.CREATE) {
        const { ok } = await createGroup(inputValues.value);
        isOk = ok;
    }

    if (action === ACTIONS.UPDATE) {
        const { ok } = await updateGroup(inputValues.value, group.id);
        isOk = ok;        
    }

    if (isOk) {
        closeModal();
        inputValues.value = INITIAL_STATE;
    }
}

const horas = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const horarios = [];

for(let i = 0; i < horas.length - 1; i++) {
    horarios.push(`${horas[i]}-${horas[i + 1]}`);
}

</script>

<template>
    <form class="grid" @submit.prevent="onSubmit">
        <div class="info">
            <label for="materia">Materia</label>
            <select v-model="inputValues.subjectId" id="materia">
                <option value="" disabled selected>Seleccione</option>
                <option v-for="subject in store.subjects" :value="subject.id">
                    {{ subject.name }}
                </option>
            </select>
        </div>
        <div class="info">
            <label for="maestro">Maestro</label>
            <select v-model="inputValues.teacherId" id="maestro">
                <option value="" disabled selected>Seleccione</option>
                <option v-for="teacher in activeTeachers" :value="teacher.id.toString()">
                    {{ teacher.name }}
                </option>
            </select>
        </div>
        <Input v-model="inputValues.id" label="Grupo" type="text" place-holder="Grupo" />
        <Input v-model="inputValues.studentsLimit" label="Limite alumnos" type="text" place-holder="Limite Alumnos" />
        <Select v-model="inputValues.schedule" label="Horario Lunes"  :values="horarios" />
        <Select v-model="inputValues.schedule" disabled label="Horario Martes"  :values="horarios" />
        <Select v-model="inputValues.schedule" disabled label="Horario Miercoles"  :values="horarios" />
        <Select v-model="inputValues.schedule" disabled label="Horario Jueves"  :values="horarios" />
        <Select v-model="inputValues.schedule" disabled label="Horario Viernes"  :values="horarios" />
    </form>
    <button @click="onSubmit" class="buttonSave">Guardar</button> 
</template>


<style src="../Form.css"></style>