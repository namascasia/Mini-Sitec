<script setup>
import { useStore } from '../../store/store';

const store = useStore();

</script>

<template>
    <section class="container">
        <section class="containerGruposTitle">
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>TOMA DE CARGA</h2>
            </ariticle>
            <article class="containerGrupos">
                <label class="title">Seleccione grupos disponibles</label>
                <div class="tarjetaGrupos" v-for="group in store.groups">
                    <label>{{ store.subjects.find(subject => group.subjectId === subject.id).name }}</label> 
                    <label>Creditos: {{ store.subjects.find(subject => group.subjectId === subject.id).credits }}</label>
                    <label>Hora: {{ group.scheduleMonday }}</label>
                    <label>Lunes, martes, miercoles...</label>
                </div>
            </article>
        </section>
        <section class="containerPreview">
            <article class="datosAlumno">
                <span> Preview de carga</span>
                <label for="nControl">N. control</label>
                <select id="nControl">
                    <option value="" disabled selected>Seleccione</option>
                    <option v-for="student in store.students" :value="student.nControl">
                        {{ student.nControl }}
                    </option>
                </select>
                <button>Cargar</button>
            </article>  
            <article class="previewHorario">
                <ul>
                    <li> <figure /> </li>
                    <li>
                        <label>Programación orientada a objetos</label> 
                        <label>Creditos: 5</label>
                        <label>Hora: 12:00 / 13:00</label>
                    </li>
                    <li class="diasClase">
                        <label> Dias de clase</label>
                        <ul id="row">
                            <li>Lunes</li>
                            <li>Martes</li>
                            <li>Miercoles</li>
                            <li>Jueves</li>
                            <li>Viernes</li>
                        </ul>
                    </li>
                    <li>
                        <img src="/img/delete.png" alt="eliminar">
                    </li>
                </ul>
            </article>
        </section>
    </section>
</template>
<style scoped src="./CargaMateriasCSS.css"></style>