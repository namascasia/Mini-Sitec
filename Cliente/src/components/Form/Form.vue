<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isShowingForm = ref(false);

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

defineProps({
    labels: Array
})

defineExpose({
    toggleForm
})

</script>

<template>
    <section v-if="isShowingForm" class="modal">
        <form>
            <div class="containerButton">
                <button @click="toggleForm">
                    <img src="/img/boton-x.png" alt="icono X">
                </button>
            </div>
            <div class="containerInput">
                <div class="info" v-for="label in labels">
                    <label>{{ label }}</label>
                    <input type="text" :placeholder="label">
                </div>
            </div>
            <div class="containerButtonSave">
                <button id="buttonSave">Guardar</button>
            </div>
        </form>
    </section>    
</template>

<style scoped src="./Form.css"></style>