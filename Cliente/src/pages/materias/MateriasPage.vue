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
            <table class="table">
                <thead>
                    <th v-for=" header in headerTable">{{ header }}</th>
                </thead>
                <tbody>
                    <tr>
                        <th>100</th>
                        <th>Poo</th>
                        <th>6</th>
                        <th>
                            <img class="edit" src="/img/note.png" alt="editar"> | 
                            <img class="delete" src="/img/delete.png" alt="borrar">
                        </th>
                    </tr>
                </tbody>
            </table>
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