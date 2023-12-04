<script setup>

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
                <button>
                    Agregar grupo
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
                        <th>Programación web</th>
                        <th>Martin Nevares Montes</th>
                        <th>40</th>
                        <th>23</th>
                        <th>12:00-13:00</th>
                        <th>12:00-13:00</th>
                        <th>12:00-13:00</th>
                        <th>12:00-13:00</th>
                        <th>12:00-13:00</th>
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
            <label> Existen {{ numGrupos }} grupos</label>
        </article>
    </section>    
</template>

<style scoped src="./GruposPageCSS.css"></style>