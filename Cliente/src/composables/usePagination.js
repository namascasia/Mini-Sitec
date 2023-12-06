import { ref, computed } from 'vue';
import { useStore } from '../store/store';

export const usePagination = (term) => {
    const page = ref(0);
    const store = useStore();

    const numberOfPages = computed(() => {
        return Math.ceil(store[term].length / 4, -1);
    });

    const nextPage = () => {
        if (page.value == numberOfPages.value - 1) return;
        page.value++;
    }

    const previousPage = () => {
        if (page.value === 0) return;
        page.value--;
    }

    const offset = computed(() => page.value * 4);
    const limit = computed(() => offset.value + 4);

    return {
        page,
        offset,
        limit,
        nextPage,
        previousPage
    };
} 