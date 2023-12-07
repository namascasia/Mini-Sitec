<script setup>
import { ref } from 'vue';
import { useStore } from '../../../store/store';
import { ACTIONS } from '../../../utils/constants/actions';
import { createGroup, updateGroup } from '../../../utils/petitions/groups';
import Input from '../../Input/Input.vue';

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

console.log(action, group);

const isForUpdate = action === ACTIONS.UPDATE;
const store = useStore();

const INITIAL_STATE = {
    id: isForUpdate ? group.id.toString() : '',
    subjectId: isForUpdate ? group.subjectId.toString() : '',
    teacherId: isForUpdate ? group.teacherId.toString() : '',
    studentsLimit: isForUpdate ? group.studentsLimit.toString() : '',
    inscribed: isForUpdate ? group.inscribed.toString() : '',
    scheduleMonday: isForUpdate ? group.scheduleMonday : '',
    scheduleTuesday: isForUpdate ? group.scheduleTuesday : '',
    scheduleWednesday: isForUpdate ? group.scheduleWednesday : '',
    scheduleThursday: isForUpdate ? group.scheduleThursday : '',
    scheduleFriday: isForUpdate ? group.scheduleFriday : '',
};

const inputValues = ref(INITIAL_STATE);

const onSubmit = async() => {
    const { 
        id, subjectId, teacherId, 
        studentsLimit, inscribed, scheduleMonday,
        scheduleTuesday, scheduleWednesday, scheduleThursday,
        scheduleFriday } = inputValues.value;
    if (
        [
            id.trim(), subjectId.trim(), teacherId.trim(), studentsLimit.trim(),
            inscribed.trim(), scheduleMonday.trim(), scheduleTuesday.trim(),
            scheduleWednesday.trim(), scheduleThursday.trim(), scheduleFriday.trim()
        ].includes("")
        ) return;

    let isOk;
    if (action === ACTIONS.CREATE) {
        const { ok } = await createGroup(inputValues.value);
        isOk = ok;
    }

    if (action === ACTIONS.UPDATE) {
        const { ok } = await updateGroup(inputValues.value);
        isOk = ok;        
    }

    if (isOk) {
        closeModal();
        inputValues.value = INITIAL_STATE;
    }
}

const selects = ['Horario Lunes', 'Horario Martes', 'Horario Miercoles', 'Horario Jueves', 'Horario Viernes'];
const horas = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const horarios = ['Seleccione'];

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
                <option v-for="teacher in store.teachers" :value="teacher.id">
                    {{ teacher.name }}
                </option>
            </select>
        </div>
        <Input v-model="inputValues.id" label="Grupo" type="text" place-holder="Grupo" />
        <Input v-model="inputValues.studentsLimit" label="Limite alumnos" type="text" place-holder="Limite Alumnos" />
        <div class="info" v-for="select in selects" :key="select">
            <label :for="select">{{ select }}</label>
            <select :id="select">
                <option v-for="horario in horarios" value="horario" :disabled="horario === 'Seleccione'">
                    {{ horario }}
                </option>
            </select>
        </div>
    </form>
    <button @click="onSubmit" class="buttonSave">Guardar</button> 
</template>


<style src="../Form.css"></style>