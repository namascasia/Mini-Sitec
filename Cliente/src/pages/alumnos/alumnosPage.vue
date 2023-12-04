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
                <!-- <span>Agregar alumno</span>
                <button>
                    <img src="/img/crearuser.png" alt="Logo crear usuario">
                </button> -->
                <button>
                    Agregar alumno
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
                        <th>America</th>
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
            <label> Existen {{ numAlumnos }} alumnos</label>
        </article>
    </section>    
</template>

<style scoped src="./alumnosPageCSS.css"></style>