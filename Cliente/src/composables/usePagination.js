import { ref, computed } from 'vue';
import { useStore } from '../store/store';

export const usePagination = (term) => {
    const page = ref(0);
    const store = useStore();

    const nextPage = () => {
        if (page.value == numberOfPages.value - 1) return;
        page.value++;
    }

    const previousPage = () => {
        if (page.value === 0) return;
        page.value--;
    }

    const numberOfPages = computed(() => {
        return Math.round(store[term].length / 4);
    });

    return { page, nextPage, previousPage };
} 