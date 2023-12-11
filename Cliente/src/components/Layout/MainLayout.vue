<script setup>
import Button from '../Button/Button.vue';

defineProps({
    text: String,
    headers: Array,
    add: Function
});

defineEmits(['add']);

</script>

<template>
    <section class="containers">
        <header>
            <article class="infoIzq">
                <span>Bievenido</span>
                <h2>{{ text }}</h2>
            </article>
            <article class="infoDer">
                <Button @click="add">
                    Agregar {{ text.toLowerCase().substring(0, text.length - 1) }}
                </Button>
            </article>
        </header>
        <article class="containerTable">
            <div class="headerTable">
                <div class="row">
                    <h4 v-for="header in headers" :key="header">
                        {{ header }}
                    </h4>
                </div>
            </div>
            <ul class="body">
                <slot name="main" />
            </ul>
            <slot />
        </article>
        <slot name="footer" />
    </section>
</template>

<style scoped src="./MainLayout.css"></style>