<script setup>

defineProps({
    title: String
});

</script>

<template>
    <article>
        <h2>No hay {{ title }} por mostrar</h2>
    </article>
</template>

<style scoped>
    article {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    article h2 {
        text-align: center;
    }
</style>