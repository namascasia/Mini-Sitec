<script setup>
import Form from '../../components/Form/Form.vue';
import { ref } from 'vue';

const formRef = ref(null);

const headerTable = ['Materia', 'Grupo', 'Maestro', 'Limite alumnos', 'Inscritos', 'Horario Lunes',
'Horario Martes','Horario Miercoles','Horario Jueves','Horario Viernes', 'Acciones'];

let numGrupos = 0;
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>GRUPOS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <button @click="formRef.toggleForm()">
                    Agregar grupo
                    <figure>
                        <img src="/img/crearuser.png" alt="Logo crear usuario">
                    </figure>
                </button>
            </ariticle>
        </header>
        <article class="containerTable">
            <div class="headerTable">
                <div class="row">
                    <div v-for="header in headerTable">{{ header }}</div>
                </div>
            </div>
            <div class="body">
                <div class="row">
                    <div>100</div>
                    <div>Programacion web</div>
                    <div>Martin Nevares</div>
                    <div>40</div>
                    <div>34</div>
                    <div>12:00-13:00</div>
                    <div>12:00-13:00</div>
                    <div>12:00-13:00</div>
                    <div>12:00-13:00</div>
                    <div>12:00-13:00</div>
                    <div>
                        <img class="edit" src="/img/note.png" alt="editar"> 
                        <img class="delete" src="/img/delete.png" alt="borrar">
                    </div>
                </div>
            </div>
        </article>
        <article class="containerPrevNext">
            <article class="containerButtonsText">
                <button>⟸ Prev</button>
                <label class="counterPage">1</label>
                <button>Next ⟹</button>
            </article>
        </article>  
        <article class="containerNumEstudiantes">
            <img src="/img/userBlue.png" alt="user">
            <label> Existen {{ numGrupos }} grupos</label>
        </article>

        <Form ref="formRef" :labels="headerTable.filter(header => header !== 'Acciones')" />
    </section>    
</template>

<style scoped src="./GruposPageCSS.css"></style>