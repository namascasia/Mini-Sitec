<script setup>

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
                <button>
                    Agregar maestro
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
                        <th>Lucia</th>
                        <th>Sistemas</th>
                        <th>Vigente</th>
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
            <label> Existen {{ numMaestros }} Maestros</label>
        </article>
    </section>    
</template>

<style scoped src="./MaestrosPageCSS.css"></style>