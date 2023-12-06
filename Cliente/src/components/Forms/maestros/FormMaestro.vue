<script setup>
import { ref } from 'vue';
import Input from '../../Input/Input.vue';
import { createTeacher } from '../../../utils/petitions/teachers';

const { closeModal } = defineProps({
    closeModal: Function
});

const INITIAL_STATE = {
    id: '',
    name: '',
    department: '',
    status: ''
};

const inputValues = ref(INITIAL_STATE);

const onSubmit = async() => {
    const { id, name, department, status } = inputValues.value;
    if ([id.trim(), name.trim(), department.trim(), status.trim()].includes("")) return;

    const { ok } = await createTeacher(inputValues.value);
    if (ok) {
        closeModal();
        inputValues.value = INITIAL_STATE;
    } 

}



const inputs = ['Clave maestro', 'Nombre', 'Departamento'];

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