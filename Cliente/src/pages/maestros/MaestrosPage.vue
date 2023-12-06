<script setup>
import Button from '../../components/Button/Button.vue';
import { ref } from 'vue';
import Modalform from '../../components/ModalForm/ModalForm.vue';
import FormMaestro from '../../components/Forms/maestros/FormMaestro.vue';

const modalRef = ref(null);

const headerTable = ['Clave maestro', 'Nombre', 'Departamento', 'Estatus', 'Acciones'];
let numMaestros = 0;
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>MAESTROS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <Button @click="modalRef.openModal()" text="Agregar Maestro" />
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
                    <div>America Citlaly Flores Mascareño</div>
                    <div>Sistemas</div>
                    <div>Vigente</div>
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
            <label> Existen {{ numMaestros }} Maestros</label>
        </article>

        <Modalform ref="modalRef">
            <FormMaestro />
        </ModalForm>
    </section>    
</template>

<style scoped src="./MaestrosPageCSS.css"></style>