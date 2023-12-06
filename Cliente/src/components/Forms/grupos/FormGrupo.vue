<script setup>
import { useStore } from '../../../store/store';

const store = useStore();

const inputs = ['Grupo', 'Limite alumnos'];
const selects = ['Horario Lunes', 'Horario Martes', 'Horario Miercoles', 'Horario Jueves', 'Horario Viernes'];
const horas = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const horarios = ['Seleccione'];

for(let i = 0; i < horas.length - 1; i++) {
    horarios.push(`${horas[i]}-${horas[i + 1]}`);
}

</script>

<template>
    <div class="grid">
        <div class="info">
            <label for="materia">Materia</label>
            <select id="materia">
                <option v-for="subject in ['Seleccione', ...store.subjects]" :value="subject.id" :disabled="subject === 'Seleccione'">
                    {{ subject.name }}
                </option>
            </select>
        </div>
        <div class="info">

        </div>
        <div class="info" v-for="input in inputs">
            <label>{{ input }}</label>
            <input type="text" :placeholder="input">
        </div>
        <div class="info" v-for="select in selects" :key="select">
            <label>{{ select }}</label>
            <select>
                <option v-for="horario in horarios" value="horario" :disabled="horario === 'Seleccione'">
                    {{ horario }}
                </option>
            </select>
        </div>
    </div>
</template>


<style src="../Form.css"></style>