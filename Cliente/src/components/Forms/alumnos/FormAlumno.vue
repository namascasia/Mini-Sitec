<script setup>
import { ref } from 'vue';
import Input from '../../Input/Input.vue';
import { createStudent } from '../../../utils/petitions/students';

const { closeModal } = defineProps({
    closeModal: Function
});

const INITIAL_STATE = {
    nControl: '',
    name: '',
    career: '',
    status: ''
};

const inputValues = ref(INITIAL_STATE);

const onSubmit = async() => {
    const { nControl, name, career, status } = inputValues.value;
    if ([nControl.trim(), name.trim(), career.trim(), status.trim()].includes("")) return;

    const { ok } = await createStudent(inputValues.value);

    if (ok) {
        closeModal();
        inputValues.value = INITIAL_STATE;
    }
}

</script>

<template>
    <form @submit.prevent="onSubmit" class="grid">
        <Input v-model="inputValues.nControl" label="n.Control" type="number" />
        <Input v-model="inputValues.name" label="Nombre" type="text" />
        <Input v-model="inputValues.career" label="Carrera" type="text" />
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