<script setup>
import { ref } from 'vue';
import Button from '../../components/Button/Button.vue';
import ModalForm from '../../components/ModalForm/ModalForm.vue';
import FormMateria from '../../components/Forms/materias/FormMateria.vue';
import { useStore } from '../../store/store';

const store = useStore();
const modalRef = ref(null);
const headerTable = ['Clave materia', 'Nombre', 'Creditos', 'Acciones'];
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>MATERIAS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <Button @click="modalRef.openModal()" text="Agregar materia" />
            </ariticle>
        </header>
        <article class="containerTable">
            <div class="headerTable">
                <div class="row">
                    <div v-for="header in headerTable">{{ header }}</div>
                </div>
            </div>
            <ul class="body">
                <li class="row" v-for="subject in store.subjects" :key="subject.id">
                    <p>{{ subject.id }}</p>
                    <p>{{ subject.name }}</p>
                    <p>{{ subject.credits }}</p>
                    <div>
                        <img class="edit" src="/img/note.png" alt="editar">  
                        <img class="delete" src="/img/delete.png" alt="borrar">
                    </div>
                </li>
            </ul>
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
            <label> Existen {{ store.subjects.length }} materias</label>
        </article>

        <ModalForm ref="modalRef">
            <FormMateria />
        </ModalForm>
    </section>    
</template>

<style scoped src="./MateriasPageCSS.css"></style>