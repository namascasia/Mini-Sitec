<script setup>

const inputs = ['Clave materia', 'Nombre', 'Creditos'];

</script>

<template>
    <div class="grid">
        <div class="info" v-for="input in inputs" :key="input">
            <label>{{ input }}</label>
            <input type="text" :placeholder="input">
        </div>
    </div>
</template>


<style src="../Form.css"></style>