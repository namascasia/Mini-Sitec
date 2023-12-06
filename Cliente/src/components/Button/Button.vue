<script setup>

const { text } = defineProps({
    text: String
});

</script>

<template>
    <button>
        {{ text }}
        <img src="/img/crearuser.png" alt="Logo crear usuario">
    </button>
</template>


<style scoped src="./Button.css"></style>