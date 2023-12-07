<script setup>
import { ref } from 'vue';
import Input from '../../Input/Input.vue';
import { createStudent, updateStudent } from '../../../utils/petitions/students';
import { ACTIONS } from '../../../utils/constants/actions';

const { closeModal, action, student } = defineProps({
    closeModal: Function,
    action: {
        type: String,
        required: false,
        default: ACTIONS.CREATE
    },
    student: {
        type: Object,
        required: false
    }
});

const isForUpdate = action === ACTIONS.UPDATE;

const INITIAL_STATE = {
    nControl: isForUpdate ? student.nControl.toString() : '',
    name: isForUpdate ? student.name : '',
    career: isForUpdate ? student.career : '',
    status: isForUpdate ? student.status : ''
};

const inputValues = ref(INITIAL_STATE);

const onSubmit = async() => {
    const { nControl, name, career, status } = inputValues.value;
    if ([nControl.trim(), name.trim(), career.trim(), status.trim()].includes("")) return;

    let isOk;
    if (action === ACTIONS.CREATE) {
        const { ok } = await createStudent(inputValues.value);
        isOk = ok;
    }

    if (action === ACTIONS.UPDATE) {
        const { ok } = await updateStudent(inputValues.value);
        isOk = ok;        
    }

    if (isOk) {
        closeModal();
        inputValues.value = INITIAL_STATE;
    }
}

</script>

<template>
    <form @submit.prevent="onSubmit" class="grid">
        <Input v-model="inputValues.nControl" label="n.Control" type="number" place-holder="Numero de control" />
        <Input v-model="inputValues.name" label="Nombre" type="text" place-holder="Nombre" :length="150" />
        <Input v-model="inputValues.career" label="Carrera" type="text" place-holder="Carrera" :length="150" />
        <div class="info">
            <label for="Estatus">Estatus</label>
            <select v-model="inputValues.status" id="Estatus">
                <option value="" disabled >Seleccione</option>
                <option value="V">Activo</option>
                <option value="B">Baja</option>
            </select>
        </div>
    </form>
    <button @click="onSubmit" class="buttonSave">Guardar</button> 
</template>


<style src="../Form.css"></style>