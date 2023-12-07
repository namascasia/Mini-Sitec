<script setup>
const { label, type, placeholder, modelValue } = defineProps({
    label: String,
    type: String,
    length: Number,
    modelValue: String,
    values: String
})

defineEmits(['update:modelValue']);

</script>


<template>
    <div class="info">
        <label :for="label">{{ label }}</label>
        <select :id="label">
            <option value="" selected disabled>Seleccione</option>
            <option v-for="value in values" :value="value" :key="value">
                {{ value }}
            </option>
        </select>
    </div>
</template>

<style scoped>
.info {
    display: flex;
    flex-direction: column;
    gap: 5px;


    & label {
        font-size: .9rem;
        font-family: Tahoma;
    }

    & input,
    select {
        width: 160px;
        height: 30px;
        padding: 5px;
        background-color: #f6f6f6;
        border-radius: 5px;
        border: none;
        border: 1px solid #e6e6e6;
    }
}
</style>