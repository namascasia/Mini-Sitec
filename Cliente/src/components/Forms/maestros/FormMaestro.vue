<script setup>
import { ref } from 'vue';
import Input from '../../Input/Input.vue';
import { createTeacher, updateTeacher } from '../../../utils/petitions/teachers';
import { ACTIONS } from '../../../utils/constants/actions';

const { closeModal, action, teacher } = defineProps({
    closeModal: Function,
    action: {
        type: String,
        required: false,
        default: ACTIONS.CREATE
    },
    teacher: {
        type: Object,
        required: false
    }
});

const isForUpdate = action === ACTIONS.UPDATE;

const INITIAL_STATE = {
    id: isForUpdate ? teacher.id.toString() : '',
    name: isForUpdate ? teacher.name : '',
    department: isForUpdate ? teacher.department.toString() : '',
    status: isForUpdate ? teacher.status : ''
};

const inputValues = ref(INITIAL_STATE);

const onSubmit = async() => {
    const { id, name, department, status } = inputValues.value;
    if ([id.trim(), name.trim(), department.trim(), status.trim()].includes("")) return;

    let isOk;
    if (action === ACTIONS.CREATE) {
        const { ok } = await createTeacher(inputValues.value);
        isOk = ok;
    }

    if (action === ACTIONS.UPDATE) {
        const { ok } = await updateTeacher(inputValues.value);
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
        <Input v-model="inputValues.id" label="Clave Maestro" type="number"/>
        <Input v-model="inputValues.name" label="Nombre" type="text"/>
        <Input v-model="inputValues.department" label="Departamento" type="number"/>
        <div class="info">
            <label>Estatus</label>
            <select v-model="inputValues.status">
                <option value="" disabled >Seleccione</option>
                <option value="V">Activo</option>
                <option value="B">Baja</option>
            </select>
        </div>
    </form>
    <button @click="onSubmit" class="buttonSave">Guardar</button> 
</template>


<style src="../Form.css"></style>