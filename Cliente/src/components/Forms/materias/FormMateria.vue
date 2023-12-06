<script setup>
import { ref } from 'vue';
import Input from '../../Input/Input.vue';
import { createSubject } from '../../../utils/petitions/subjects';

const { closeModal } = defineProps({
    closeModal: Function
});

const INITIAL_STATE = {
    id: '',
    name: '',
    credits: ''
};

const inputValues = ref(INITIAL_STATE);

const onSubmit = async() => {
    const { id, name, credits } = inputValues.value;
    if ([id.trim(), name.trim(), credits.trim()].includes("")) return;
    
    const { ok } = await createSubject(inputValues.value);

    if (ok) {
        closeModal();
        inputValues.value = INITIAL_STATE;
    }
}

const inputs = ['Clave materia', 'Nombre', 'Creditos'];

</script>

<template>
    <form @submit.prevent="onSubmit" class="grid">
       <Input v-model="inputValues.id" label="Clave Materia" type="text" :length="11" place-holder="Clave materia" />
       <Input v-model="inputValues.name" label="Nombre" type="text" place-holder="Nombre" />
       <Input v-model="inputValues.credits" label="Creditos" type="number" place-holder="Creditos" />
    </form>
    <button @click="onSubmit" class="buttonSave">Guardar</button> 
</template>


<style src="../Form.css"></style>