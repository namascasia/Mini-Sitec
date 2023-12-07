<script setup>
import { ref } from 'vue';
import Input from '../../Input/Input.vue';
import { createSubject, updateSubject } from '../../../utils/petitions/subjects';
import { ACTIONS } from '../../../utils/constants/actions';

const { closeModal, action, subject } = defineProps({
    closeModal: Function,
    action: {
        type: String,
        required: false,
        default: ACTIONS.CREATE
    },
    subject: {
        type: Object,
        required: false
    }
});

const isForUpdate = action === ACTIONS.UPDATE;

const INITIAL_STATE = {
    id: isForUpdate ? subject.id.toString() : '',
    name: isForUpdate ? subject.name : '',
    credits: isForUpdate ? subject.credits.toString() : ''
};

const inputValues = ref(INITIAL_STATE);

const onSubmit = async() => {
    const { id, name, credits } = inputValues.value;
    if ([id.trim(), name.trim(), credits.trim()].includes("")) return;
    
    let isOk;

    if (action === ACTIONS.CREATE) {
        const { ok } = await createSubject(inputValues.value);
        isOk = ok;
    }

    if (action == ACTIONS.UPDATE) {
        const { ok } = await updateSubject(inputValues.value);
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
       <Input v-model="inputValues.id" label="Clave Materia" type="text" :length="8" place-holder="Clave materia" />
       <Input v-model="inputValues.name" label="Nombre" type="text" :length="150" place-holder="Nombre" />
       <Input v-model="inputValues.credits" label="Creditos" type="number" place-holder="Creditos" />
    </form>
    <button @click="onSubmit" class="buttonSave">Guardar</button> 
</template>


<style src="../Form.css"></style>