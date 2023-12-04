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
            <button @click="toggleForm">X</button>
            <div v-for="label in labels">
                <label>{{ label }}</label>
                <input type="text" :placeholder="label">
            </div>
        </form>
    </section>    
</template>

<style scoped src="./Form.css"></style>