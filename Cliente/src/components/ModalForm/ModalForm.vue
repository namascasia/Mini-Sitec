<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const onSubmit = (event) => {
    const form = event.target.action.split('/')[3];
    switch(form) {
        case 'alumno': console.log('here');break;
        case 'grupos': console.log('here');break;
        case 'maestros': console.log('here');break;
        case 'materias': console.log('here');break;
    }

}

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