<script setup>

const headerTable = ['N. control', 'Nombre', 'Carrera', 'Estatus', 'Acciones'];

let numAlumnos = 0;
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>ALUMNOS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <button>
                    Agregar alumno
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
            <label> Existen {{ numAlumnos }} alumnos</label>
        </article>
    </section>    
</template>

<style scoped src="./alumnosPageCSS.css"></style>