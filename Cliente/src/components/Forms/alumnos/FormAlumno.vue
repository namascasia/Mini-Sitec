<script setup>

const inputs = ['N.Control', 'Nombre', 'Carrera'];

</script>

<template>
    <div class="grid">
        <div class="info" v-for="input in inputs" :key="input">
            <label>{{ input }}</label>
            <input type="text" :placeholder="input">
        </div>
        <div class="info">
            <label>Estatus</label>
            <select>
                <option value="" disabled >Seleccione</option>
                <option value="V">Activo</option>
                <option value="B">Baja</option>
            </select>
        </div>
    </div>
</template>


<style src="../Form.css"></style>