<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createStudent } from '../../utils/petitions/students';
const { labels, endpoint } = defineProps({
    labels: Array,
    endpoint: {
        type: String,
        required: false
    }
});

const inputs = labels.map((_) => ({
    value: ''
}));

const isShowingForm = ref(false);
const inputsValues = ref(inputs);

const onSubmit = (event) => {
    // console.log(inputsValues.value);
    switch(endpoint) {
        case 'students': createStudent(inputsValues.value); break;
    }

    isShowingForm.value = false;
    
}

const toggleForm = () => {
    isShowingForm.value = !isShowingForm.value
}

const closeOnEscape = (event) => {
    if (event.key === 'Escape') isShowingForm.value = false;
}

onMounted(() => {
    window.addEventListener('keyup', closeOnEscape);
});

onUnmounted(() => {
    window.removeEventListener('keyup', closeOnEscape);
});

defineExpose({
    toggleForm
})

</script>

<template>
    <section v-if="isShowingForm" class="modal">
        <form @submit.prevent="onSubmit">
            <button class="buttonClose" @click="toggleForm">
                <img src="/img/boton-x.png" alt="icono X">
            </button>
            <div class="containerInput">
                <div class="info" v-for="(label, index) in labels">
                    <label>{{ label }}</label>
                    <input v-model="inputsValues[index].value" type="text" :placeholder="label">
                </div>
            </div>
            <button id="buttonSave">Guardar</button>
        </form>
    </section>    
</template>

<style scoped src="./Form.css"></style>