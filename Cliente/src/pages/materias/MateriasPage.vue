<script setup>

const headerTable = ['Clave materia', 'Nombre', 'Creditos', 'Acciones'];

let numMaterias = 0;
</script>

<template>
    <section class="container">
        <header>
            <ariticle class="infoIzq">
                <span> Bienvenido</span>
                <h2>MATERIAS</h2>
            </ariticle>
            <ariticle class="infoDer">
                <button>
                    Agregar materia
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
                    <div>Programación web</div>
                    <div>6</div>
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
            <label> Existen {{ numMaterias }} materias</label>
        </article>
    </section>    
</template>

<style scoped src="./MateriasPageCSS.css"></style>