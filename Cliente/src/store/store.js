import { reactive } from 'vue';

const store = reactive({
    students: [],
    subjects: [],
    groups: [],
    teachers: []
});

export const useStore = () => store;