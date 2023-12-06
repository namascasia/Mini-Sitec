<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const openModal = () => {
    isOpen.value = true;
    console.log('?');
}

const closeModal = () => {
    isOpen.value = false;
}

defineExpose({
    openModal,
    closeModal
})

</script>

<template>
    <section class="modal_background" v-if="isOpen">
        <article>
            <button class="buttonClose" @click="closeModal()">
                <img src="/img/boton-x.png" alt="icono X">
            </button>
            <slot />
        </article>
    </section>
</template>


<style scoped src="./ModalForm.css"></style>